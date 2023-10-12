import pkg from "lodash";
import { GraphQLError } from "graphql";
import { dirname } from "path";
import { fileURLToPath } from "url";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import nodemailer from "nodemailer";
import { PubSub } from "graphql-subscriptions";
// internally crafted imports of resources
import { IUser } from "../../typings/Con_Register.ts";
import GenerateToken from "../../Utils/GenerateToken.ts";
import RegisterSchema from "../../Validators/Registeration.ts";
import UploadFile from "../../Service/ImageUpload.ts";
import MongoId from "../../Service/MongoIdScalar.ts";
import dateScalar from "../../Service/DataScalar.ts";
import {
  LoginSchemaWithEmail,
  LoginSchemaWithUsername,
} from "../../Validators/Login.ts";
import { hashPassCode, Compare_hash } from "../../Utils/hash_Passcode.ts";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Config/index.ts";
import { Resolvers } from "../../__generate__/types.ts";
import { serializeUser } from "../../Service/User.ts";
import { ImageType } from "../../typings/upload.ts";
import { friendModel, postModel, userModel } from "../../Models/index.ts";
import { REDIS_CLIENT } from "../../Constants/Redis.ts";
import { EMAIL_PASS, EMAIL_USER } from "../../Config/index.ts";
import { IPost } from "../../typings/posts.ts";

const { isNil, isUndefined, nth, isError } = pkg;

const pubSub = new PubSub();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const UserResolver: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  MongoId,
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    userData: async (__, { _id }) => {
      try {
        const data = await userModel.findOne({ _id });

        const Get_User_Data = serializeUser({
          _id: `${data?._id}`,
          Firstname: `${data?.Firstname}`,
          Lastname: `${data?.Lastname}`,
          Password: `${data?.Password}`,
          Email: `${data?.Email}`,
          Image: `${data?.Image}`,
          DOB: `${data?.DOB}`,
          Sex: `${data?.Sex}`,
          Bio: `${data?.Bio}`,
        });

        return Get_User_Data;
      } catch (error) {
        throw new GraphQLError(`${error}`, {
          extensions: {
            code: "SCHEMA_ERROR",
            statusCode: 400,
          },
        });
      }
    },
    userStatics: async (__, { userID }) => {
      try {
        // grab all friends following the online user
        const user = await userModel
          .findOne({ _id: userID })
          .populate("Friends")
          .select("Friends _id Firstname Lastname Image Email Bio updatedAt");

        // grab all friends whose online user is followed
        const friends = await friendModel
          .find()
          .where({ RequestId: userID, AcceptedId: { $ne: undefined || null } });

        // grab all posts made by the online user
        const posts = await postModel
          .find<IPost>()
          .where({ User: userID })
          .populate({
            path: "User",
            select: "_id Firstname Lastname Image",
          })
          .populate({
            path: "RetweetedPost",
            select: "_id PostId PostImage Title User createdAt",
            populate: {
              path: "User",
              select: "_id Firstname Lastname Image",
            },
          })
          .sort({ _id: -1 });

        return {
          follower: user?.Friends?.length,
          following: friends.length,
          posts: posts,
          UserInfo: user,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    allUsers: async (__, { _id }) => {
      try {
        const users = await userModel
          .find({ _id: { $ne: `${_id}` } })
          .populate({
            path: "Friends",
            populate: ["User", "Receiver"],
          });

        return users;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    Connection: async (_, args) => {
      try {
        const { Username, Password, Email } = await args.connectionInfo;

        const userDbEmail = await userModel
          .findOne({ Email })
          .select("-Groups -Chats -Friends -Posts");
        // if user connection preference is Username
        if (
          !isUndefined(Username) &&
          !isError(
            await LoginSchemaWithUsername.parse({
              Username,
              Password,
            })
          )
        ) {
          // split the username to grab Firstname and Lastname
          const username: string[] | undefined = Username?.split(" ");

          // check out user authentication
          const userDb = await userModel
            .findOne({
              Firstname: `${nth(username, 0)}`,
              Lastname: `${nth(username, 1)}`,
            })
            .select("-Groups -Chats -Friends -Posts");

          if (
            !isNil(userDb) &&
            (await Compare_hash({
              passCode: Password,
              newPassCode: userDb.Password,
            }))
          ) {
            const token: string = await GenerateToken(
              {
                Data: userDb.toObject(),
                issuer: `${userDb.Firstname}`,
              },
              `${ACCESS_TOKEN}`
            );
            const refreshToken: Promise<string> = GenerateToken(
              {
                Data: userDb.toObject(),
                issuer: `${userDb.Firstname}`,
              },
              `${REFRESH_TOKEN}`
            );
            // store refresh token in Redis Server after successfully connected
            await REDIS_CLIENT.SETEX(
              "REFRESH_TOKEN",
              60 * 60 * 24 * 2, // expires in two months
              JSON.stringify(`${refreshToken}`)
            );
            return {
              message: "successfully connected",
              token,
              success: true,
            };
          }

          return {
            message: "wrong username or password",
            success: false,
          };
        }

        if (
          !isNil(userDbEmail) &&
          (await Compare_hash({
            passCode: Password,
            newPassCode: `${userDbEmail?.Password}`,
          })) &&
          !isError(
            await LoginSchemaWithEmail.parse({
              Email,
              Password,
            })
          )
        ) {
          const token: string = await GenerateToken(
            {
              Data: userDbEmail?.toObject(),
              issuer: `${userDbEmail?.Firstname}`,
            },
            `${ACCESS_TOKEN}`
          );

          const refreshToken: Promise<string> = GenerateToken(
            {
              Data: userDbEmail.toObject(),
              issuer: `${userDbEmail.Firstname}`,
            },
            `${REFRESH_TOKEN}`
          );
          // store refreshToken in Redis Server after successfully connected
          await REDIS_CLIENT.SET("REFRESH_TOKEN", JSON.stringify(refreshToken));
          return {
            message: "successfully connected",
            token,
            success: true,
          };
        }

        return {
          message: "wrong email or password",
          success: false,
        };
      } catch (error) {
        throw new GraphQLError(`${error}`, {
          extensions: {
            code: "SERVER_ERROR",
          },
        });
      }
    },
  },
  Mutation: {
    Registeration: async (_: any, args) => {
      try {
        const result: IUser<string> = await RegisterSchema.parse(
          args.registerInfo
        );

        // if there's no error in the form validation performs server operations
        if (!isError(result) && !isNil(result)) {
          const { Firstname, Lastname, Password, Email, DOB, Image, Bio, Sex } =
            await args.registerInfo;

          const userDb = await userModel
            .findOne({
              Firstname,
              Lastname,
            })
            .select("-Groups -Chats -Friends -Posts");

          const isAuthenticated = await Compare_hash({
            passCode: `${Password}`,
            newPassCode: `${userDb?.Password}`,
          });

          if (!isNil(userDb) && isAuthenticated) {
            return {
              message: "already authenticated",
              success: false,
            };
          } else {
            const hashPassword = await hashPassCode({
              passCode: `${Password}`,
            });

            const userCreation = await userModel.create({
              Firstname,
              Lastname,
              Password: `${hashPassword}`,
              Email,
              DOB,
              Image,
              Sex,
            });

            // generating the token from the user information
            const token = await GenerateToken(
              {
                Data: userCreation.toObject(),
                issuer: Firstname,
              },
              `${ACCESS_TOKEN}`
            );

            const refreshToken = await GenerateToken(
              {
                Data: userCreation.toObject(),
                issuer: Firstname,
              },
              `${REFRESH_TOKEN}`
            );
            // store refreshToken in Redis Server for a controlled time period for retrieval facility
            await REDIS_CLIENT.SET(
              "REFRESH_TOKEN",
              JSON.stringify(`${refreshToken}`)
            );

            return {
              message: "successfully registered",
              token: `${token}`,
              success: true,
            };
          }
        }

        return {
          message: "validation fail",
          success: false,
        };
      } catch (error) {
        throw new GraphQLError(`${error}`, {
          extensions: {
            code: "SERVER_ERROR",
          },
        });
      }
    },
    ChangeUserProfile: async (__, { file, _id }) => {
      try {
        const { secureUrl, success, public_id }: ImageType<string> =
          await UploadFile(file, true, __dirname, "Thirdy_social");
        // update user model with cloudinary secure image and public_id
        await userModel
          .findOneAndUpdate({
            Image: secureUrl,
            PublicId: public_id,
          })
          .where({ _id });

        return {
          message: "profile successfully change",
          success,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    ChangeCover: async (__, { file, _id }) => {
      try {
        const { secureUrl, public_id }: ImageType<string> = await UploadFile(
          file,
          true,
          __dirname,
          "Thirdy_social"
        );

        // update user model with cloudinary secure image and public_id
        await userModel
          .findOneAndUpdate({
            CoverImage: {
              Image: secureUrl,
              PublicId: public_id,
            },
          })
          .where({ _id: _id });

        return {
          message: "cover image successfully uploaded",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    OnlineOfflineStatus: async (__, { userId, online }) => {
      try {
        const isOnline = await userModel
          .findOneAndUpdate({ IsOnline: Boolean(online) })
          .where({ _id: userId });

        if (!isOnline) {
          return {
            message: "user is offline",
            success: true,
          };
        }

        return {
          message: "user is online",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    SendMail: async (
      __,
      { mail: { HTMLBODY, DESTINATION, SUBJECT, MESSAGE }, code }
    ) => {
      try {
        // Testing mail
        let testAccount = await nodemailer.createTestAccount();
        //etheral SMTP
        let Transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        //  sending real mail using gmail account account
        let transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${EMAIL_USER}`, // real gmail user's full name
            pass: `${EMAIL_PASS}`, // real gmail user's password
          },
        });
        // sending the mail
        await transporter.sendMail({
          from: { name: "TechAdmin", address: `${EMAIL_USER}` },
          to: `${DESTINATION}`,
          subject: `${SUBJECT}`,
          text: `${MESSAGE}`,
          html: `${HTMLBODY}`,
        });

        return {
          message: code,
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    ChangePassword: async (__, { userEmail, newPassword }) => {
      try {
        // hashing the new password coming from the client
        const passHashing = await hashPassCode({ passCode: newPassword });
        // pass the hashing to the related user for the password change
        await userModel
          .findOneAndUpdate({ Password: passHashing })
          .where({ Email: userEmail });

        return {
          message: "password successfully changed",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    RefreshToken: async (__, {}) => {
      try {
        const isTokenExist = await REDIS_CLIENT.EXISTS("REFRESH_TOKEN");
        if (isTokenExist && !isNil(isTokenExist)) {
          // if token exist get it and send it to the client
          const refreshToken: string | null = await REDIS_CLIENT.GET(
            "REFRESH_TOKEN"
          );

          return {
            message: "token is successfully sent",
            success: true,
            refreshToken,
          };
        }

        return {
          message: "no token is refreshed because there's none",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    LogOut: async () => {
      try {
        // when user is logged out delete all possible user data caches like token etc..
        // so that user cache data can be new on the server when user logged in back
        await REDIS_CLIENT.DEL(["USER_AUTH", "REFRESH_TOKEN"]);

        return {
          message: "successfully logged out",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};

export default UserResolver;

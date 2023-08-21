import * as z from "zod";
import pkg from "lodash";
import { ReturnModelType } from "@typegoose/typegoose";
import { GraphQLError } from "graphql";
// externally crafted imports of ressources
import { IUserContext, IUser } from "../../typings/Con_Register.ts";
import GenerateToken from "../../Utils/GenerateToken.ts";
import RegisterSchema from "../../Validators/Registeration.ts";
import {
  LoginSchemaWithEmail,
  LoginSchemaWithUsername,
} from "../../Validators/Login.ts";
import { hashPassCode, Compare_hash } from "../../Utils/hash_Passcode.ts";
import { REDIS_CLIENT } from "../../Constants/Redis.ts";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Config/index.ts";
import { Resolvers } from "../../__generate__/types.ts";
import { serializeUser } from "../../Service/User.ts";

const { isNil, isUndefined, nth, isError } = pkg;

const UserResolver: Resolvers = {
  Query: {
    userData: async (
      __,
      args,
      { user, isAuth, userModel }: IUserContext,
      info
    ) => {
      try {
        const { _id } = user;
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
    hello: (__, args, context) => {
      return "let us go ";
    },
    Connection: async (_: any, args, { userModel }: IUserContext) => {
      try {
        const { Username, Password, Email } = await args.connectionInfo;

        const userDbEmail = await userModel.findOne({ Email });
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
          // split the username to grab firstname and lastname
          const username: string[] | undefined = Username?.split(" ");

          // check out user authentication
          const userDb = await userModel.findOne({
            Firstname: `${nth(username, 0)}`,
            Lastname: `${nth(username, 1)}`,
          });

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
            // store refreshtoken in Redis Server after successfully connected
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
    Registeration: async (_: any, args, { userModel }: IUserContext) => {
      try {
        const result: IUser<string> = await RegisterSchema.parse(
          args.registerInfo
        );

        // if there's no error in the form validation performs server operations
        if (!isError(result) && !isNil(result)) {
          const { Firstname, Lastname, Password, Email, DOB, Image, Bio, Sex } =
            await args.registerInfo;

          const userDb = await userModel.findOne({
            Firstname,
            Lastname,
          });

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
            const token = GenerateToken(
              {
                Data: userCreation.toObject(),
                issuer: Firstname,
              },
              `${ACCESS_TOKEN}`
            );

            const refreshToken: Promise<string> = GenerateToken(
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
  },
};

export default UserResolver;

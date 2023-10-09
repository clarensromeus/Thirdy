import { fileURLToPath } from "url";
import { dirname } from "path";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import pkg from "lodash";
import { nanoid } from "nanoid";
// internally crafted imports of resources
import { friendModel, statusModel, userModel } from "../../Models";
import { Resolvers } from "../../__generate__/types";
import UploadFile from "../../Service/ImageUpload";
import { ImageType } from "../../typings/upload";
import MongoId from "../../Service/MongoIdScalar";
import { Istatus } from "../../typings/Status";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const { isNil, map, property } = pkg;

const UserStatus: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Query: {
    GetUserStatus: async (__, { userId }) => {
      try {
        const statuses = await userModel
          .findOne<Istatus>()
          .select("UserStatus")
          .populate("UserStatus")
          .where({ _id: userId });

        if (isNil(statuses)) {
          return [];
        }

        return statuses.userStatus;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    FriendsStatus: async (__, { userId }) => {
      try {
        const userStatus = await userModel
          .findOne()
          .select("Friends")
          .populate({ path: "Friends", select: "RequestId" })
          .where({ _id: userId });

        // grab all friends ids of the user
        const friendsId = map(userStatus?.Friends, property("RequestId"));

        // get all friends statuses of the user
        const allFriendsStatus = await statusModel
          .find()
          .where({ userId: { $in: friendsId } });

        return allFriendsStatus;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    AddStatus: async (__, { _id, picture, userId }) => {
      try {
        const { secureUrl, public_id }: ImageType<string> = await UploadFile(
          picture,
          true,
          __dirname,
          "Thirdy_social"
        );

        // create user status images if not already created
        const addNewStatus = await statusModel.create({
          userID: userId,
          StatusId: `status_${nanoid()}`,
          public_id: public_id ?? "",
          Image: secureUrl,
        });

        await userModel
          .findOneAndUpdate({ $pull: { UserStatus: addNewStatus._id } })
          .where({ _id: userId });

        return {
          message: "status created with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    DeleteStatus: async (__, { StatusId, userId }) => {
      try {
        const isDeleted = await statusModel
          .findOneAndDelete({ $pull: { StatusImages: { StatusId } } })
          .where({ userId });
        // delete specific user image from list of status images
        if (isDeleted) {
          return {
            message: "status deleted with success",
            success: true,
          };
        }
        return {
          message: "status not deleted",
          success: false,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};

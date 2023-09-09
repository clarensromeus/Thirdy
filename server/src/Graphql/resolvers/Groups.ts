import { groupModel } from "../../Models/index.ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ObjectId } from "mongoose";
// internally crafted imports of ressources
import { Resolvers } from "../../__generate__/types";
import MongoId from "../../Service/Scalar.ts";
import UploadFile from "../../Service/ImageUpload.ts";
import { ImageType } from "../../typings/upload.ts";
import { IGroup } from "../../typings/Groups.ts";
import { userModel } from "../../Models/User.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const Group: Resolvers = {
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Query: {
    GetAllGroups: async () => {
      try {
        const groups = await groupModel.find<IGroup>();

        return groups;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    GroupInfo: async (__, { groupId, groupName }) => {
      try {
        const group = await groupModel.findOne({
          GroupName: groupName,
          _id: groupId,
        });

        return group;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    createGroup: async (__, { createData, file }) => {
      try {
        const { GroupName, Users, Privacy, Administrators } = await createData;
        console.log(file);

        if (typeof file !== "undefined") {
          const { secureUrl, public_id }: ImageType<string> = await UploadFile(
            file,
            true,
            __dirname,
            "Thirdy_social"
          );

          const createGroup = await groupModel.create({
            GroupName,
            GroupUsers: Users,
            Privacy,
            public_id,
            Administrators,
            GroupCoverImage: secureUrl,
          });

          return {
            message: "group is created with success",
            success: true,
          };
        }

        const createGroup = await groupModel.create({
          GroupName,
          GroupUsers: Users,
          Administrators,
          Privacy,
        });

        return {
          message: "Group is created with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    JoinGroup: async (__, { _id, GroupId }) => {
      try {
        const joined = await groupModel
          .findOneAndUpdate({ $pull: { GroupUsers: _id } })
          .where({ _id: GroupId });
        // if user joined do next
        if (joined) {
          return {
            message: "joined with success",
            success: true,
          };
        }
        return {
          message: "user not joined",
          success: false,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    LeaveGroup: async (__, { _id, GroupId }) => {
      try {
        const Leave = await groupModel
          .findOneAndUpdate({ $pull: { GroupUsers: _id } })
          .where({ _id: GroupId });
        // if user is leaving do next
        if (Leave) {
          return {
            message: "Leave with success",
            success: true,
          };
        }

        return {
          message: "user not leaving",
          success: false,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    AddUser: async (__, { adminId, guestId, groupId }) => {
      try {
        const isAdmin = await groupModel.findOne({
          Administrators: { $in: adminId },
        });
        // if user not an admin, no right to add a user in the group
        if (!isAdmin) return {};
        // if an administrator then he has access to add users in the group
        await groupModel
          .findOneAndUpdate({ $push: { GroupUsers: guestId } })
          .where({ _id: groupId });

        return {
          message: "added with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    ExcludeUser: async (__, { adminId, groupId, guestId }) => {
      try {
        const isAdmin = await groupModel.findOne({
          Administrators: { $in: adminId },
        });
        // if user not an admin, no right to exclude a user in the group
        if (!isAdmin) return {};

        // if an administrator then he has access to exclude users in the group
        await groupModel
          .findOneAndUpdate({ $pull: { GroupUsers: guestId } })
          .where({ _id: groupId });

        return {
          message: "user is excluded from the group",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Subscription: {},
};

export default Group;

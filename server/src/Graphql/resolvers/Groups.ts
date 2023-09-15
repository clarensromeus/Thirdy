import { groupChatModel, groupModel } from "../../Models/index.ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { PubSub } from "graphql-subscriptions";
import lodash from "lodash";
// internally crafted imports of resources
import { Resolvers } from "../../__generate__/types";
import MongoId from "../../Service/MongoIdScalar.ts";
import UploadFile from "../../Service/ImageUpload.ts";
import { ImageType } from "../../typings/upload.ts";
import { IGroup } from "../../typings/Groups.ts";
import dateScalar from "../../Service/DataScalar.ts";
import { GROUP_CHAT_CHANNEL } from "../../Constants/GroupChat.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const pubSub: PubSub = new PubSub();
const { isNil } = lodash;

const Group: Resolvers = {
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Date: dateScalar,
  Query: {
    GetAllGroups: async () => {
      try {
        const groups = await groupModel.find<IGroup>().populate({
          path: "GroupUsers",
          select: "_id Firstname Lastname Image",
        });

        return groups;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    GroupUsers: async (__, { groupId, groupName }) => {
      try {
        const db = await groupModel
          .findOne({ _id: groupId, GroupName: groupName })
          .populate({
            path: "GroupUsers",
            select: "_id Firstname Lastname Image",
          });

        const groupUsers = db?.GroupUsers;

        if (!groupUsers) return [];

        return groupUsers;
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
    ChatWithFriendsInGroups: async (__, { groupId }, context) => {
      try {
        console.log(context);
        const chats = await groupChatModel
          .find()
          .populate({ path: "From", select: "_id Firstname Lastname Image" })
          .populate({ path: "To", select: "_id GroupName" })
          .where({ To: groupId });

        return chats;
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
    ChatWithFriendsInGroups: async (__, { dataFeed, picture }) => {
      try {
        const { Chat, GroupId, ChatPlacement, To, From } = await dataFeed;

        // if picture is provided when user sends a chat
        if (!isNil(picture)) {
          const { public_id, serverUrl } = await UploadFile(
            picture,
            true,
            __dirname,
            "Thirdy_app"
          );

          const createChat = await groupChatModel.create({
            ChatPlacement,
            Chat: "",
            To,
            From,
            public_id,
            PicturedMessage: serverUrl,
          });

          await groupModel
            .findOneAndUpdate({ $push: { Chat: createChat._id } })
            .where({ _id: GroupId });

          const chats = await groupChatModel
            .findOne({ _id: createChat._id })
            .populate({ path: "To", select: "_id GroupName" })
            .populate({ path: "From", select: "_id Firstname Lastname Image" })
            .select("-__v");

          // publish data to the group chat channel event for real time data performance
          // on the client side
          pubSub.publish(GROUP_CHAT_CHANNEL, { ChatsInGroup: chats });

          return {
            message: "message successfully sent",
            success: true,
          };
        }

        const createChat = await groupChatModel.create({
          ChatPlacement,
          Chat,
          To,
          From,
          public_id: "",
          PicturedMessage: "",
        });

        await groupModel
          .findOneAndUpdate({ $push: { Chat: createChat._id } })
          .where({ _id: GroupId });

        const chats = await groupChatModel
          .findOne({ _id: createChat._id })
          .populate({ path: "To", select: "_id GroupName" })
          .populate({ path: "From", select: "_id Firstname Lastname Image" })
          .select("-__v");

        // publish data to the group chat channel event for real time data performance
        // on the client side
        pubSub.publish("TEST", { ChatWithFriendsInGroups: chats });

        return {
          message: "message successfully sent",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    JoinGroup: async (__, { _id, GroupId }) => {
      try {
        const joined = await groupModel
          .findOneAndUpdate({ $push: { GroupUsers: _id } })
          .where({ _id: GroupId });
        // if user joined return a successful response
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
        // if user is leaving return a successful response
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
    RemoveAdminRole: async (__, { adminId, userId, groupId }) => {
      try {
        // first check if user is an administrator in the group
        const isAdmin = await groupModel
          .findOneAndUpdate({
            _id: groupId,
            Administrators: { $in: [adminId] },
          })
          .select("User");

        if (!isAdmin) {
          return {
            message: "sorry you are not an administrator",
            success: false,
          };
        }

        // remove admin role from the group user
        await groupModel
          .findOneAndUpdate({
            $pull: { Administrators: userId },
          })
          .where({ _id: groupId });

        return {
          message: "user successfully out of admin role",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    AddAdminRole: async (__, { adminId, userId, groupId }) => {
      try {
        // first check if user is an administrator in the group
        const isAdmin = await groupModel
          .findOneAndUpdate({
            _id: groupId,
            Administrators: { $in: [adminId] },
          })
          .select("User");

        if (!isAdmin) {
          return {
            message: "sorry, you're not an administrator",
            success: false,
          };
        }
        // add group user as administrator
        await groupModel
          .findOneAndUpdate({ $push: { Administrators: userId } })
          .where({ _id: groupId });

        return {
          message: "user added as admin successfully",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },

  Subscription: {
    ChatWithFriendsInGroups: {
      subscribe: () => {
        return {
          [Symbol.asyncIterator]: () => pubSub.asyncIterator(["TEST"]),
        };
      },
    },
  },
};

export default Group;

import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { PubSub } from "graphql-subscriptions";
import lodash from "lodash";
import { ObjectId, PopulatedDoc } from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
// intenally crafted imports of ressources
import { Resolvers } from "../../__generate__/types";
import { chatModel, friendModel } from "../../Models/index.ts";
import MongoId from "../../Service/MongoIdScalar.ts";
import { CHAT_CHANNEL } from "../../Constants/index.ts";
import { userModel } from "../../Models/User.ts";
import UploadFile from "../../Service/ImageUpload.ts";
import dateScalar from "../../Service/DataScalar.ts";

const { merge, concat, isNil } = lodash;

const pubSub: PubSub = new PubSub();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const Chat: Resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Query: {
    GetChatFriends: async (__, { userId }) => {
      try {
        // recover all the user friends
        const friendList = await friendModel
          .find()
          .where({ AcceptedId: userId });

        return friendList;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    Chat: async (__, { chatUserInfo: { friendId, activeUserId } }) => {
      try {
        // retrieve all relatively friend messages sent by the active user
        const friendsChat = await userModel
          .findById({ _id: activeUserId })
          .populate({
            path: "Chats",
            match: { From: { $eq: friendId } },
            // populate: { path: "From", select: "_id Firstname Lastname Image" },
            populate: ["From", "To"],
          })
          .select("Chats");

        // grab active user chats sent by a friend id relatively
        const activeUserChat = await userModel
          .findById({ _id: friendId })
          .populate({
            path: "Chats",
            match: {
              From: { $eq: activeUserId },
            },
            populate: ["From", "To"],
          })
          .select("Chats");

        if (!activeUserChat) return null;
        if (!friendsChat) return null;

        // concat active and friend user chats together
        const chatRoom = concat(friendsChat.Chats, activeUserChat.Chats).sort(
          (a, b) =>
            /* @ts-ignore */
            new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );

        return chatRoom;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    ChatWithFriends: async (__, { chatInfo, picture }) => {
      try {
        const { Chat, To, From } = chatInfo;

        if (!isNil(picture)) {
          const { public_id, serverUrl } = await UploadFile(
            picture,
            true,
            __dirname,
            "Thirdy_app"
          );

          const createChat = await chatModel.create({
            Chat,
            To,
            From,
            PicturedMessage: serverUrl,
            public_id,
          });

          await userModel
            .findOneAndUpdate({
              $push: { Chats: createChat._id },
            })
            .where({ _id: To });

          const chats = await chatModel
            .findOne({ _id: createChat._id })
            .populate({ path: "To", select: "_id Firstname Lastname Image" })
            .populate({ path: "From", select: "_id Firstname Lastname Image" })
            .select("-__v");

          // publish message data to CHAT_CHANNEL event
          pubSub.publish(CHAT_CHANNEL, { chatRoom: chats });

          return {
            message: "message successfully sent",
            success: true,
          };
        }

        const createChat = await chatModel.create({
          Chat,
          To,
          From,
          public_id: "",
          PicturedMessage: "",
        });

        await userModel
          .findOneAndUpdate({
            $push: { Chats: createChat._id },
          })
          .where({ _id: To });

        const chats = await chatModel
          .findById({ _id: createChat._id })
          .populate({ path: "To", select: "_id Firstname Lastname Image" })
          .populate({ path: "From", select: "_id Firstname Lastname Image" })
          .select("-__v -updatedAt");

        // publish data message to CHAT_CHANNEL event
        pubSub.publish(CHAT_CHANNEL, {
          Chat: chats,
        });

        return {
          message: "message successfully sent",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Subscription: {
    Chat: {
      subscribe: () => {
        return {
          // listening to the chat channel event
          [Symbol.asyncIterator]: () => pubSub.asyncIterator([CHAT_CHANNEL]),
        };
      },
    },
  },
};

export default Chat;

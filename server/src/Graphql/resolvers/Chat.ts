import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { PubSub } from "graphql-subscriptions";
import lodash, { merge, concat } from "lodash";
// intenally crafted imports of ressources
import { Resolvers } from "../../__generate__/types";
import { chatModel, friendModel } from "../../Models/index.ts";
import MongoId from "../../Service/Scalar.ts";
import { CHAT_CHANNEL } from "../../Constants/index.ts";
import { userModel } from "../../Models/User.ts";

interface Ichat {
  _id: string;
  ChatId: string;
  Chat: string;
  User: {
    _id: string;
    Firstname: string;
    Lastname: string;
    Image: string;
  };
}

const pubSub: PubSub = new PubSub();

const Chat: Resolvers = {
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
    /*  ChatRoom: async (__, { chatFilter: { friendId, activeUserId } }) => {
      try {
        // retrieve all relatively friend messages sent by the active user
        const friendsChat = await userModel
          .findById({ _id: activeUserId })
          .populate({ path: "Chats", match: { From: { $eq: friendId } } })
          .select("Chats");

        // grab active user chats sent by a friend id relatively
        const activeUserChat = await userModel
          .findById({ _id: friendId })
          .populate({ path: "Chats", match: { From: { $eq: activeUserId } } })
          .select("Chats");

        // concat active and friend user chats together
        const chatRoom = concat(friendsChat?.Chats, activeUserChat?.Chats);

        return chatRoom;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }, */
  },
  Mutation: {
    ChatWithFriends: async (__, { chatData, picture, chatFilter }) => {
      try {
        const { friendId, activeUserId } = chatFilter;
        const { ChatId, Chat, To, From } = chatData;
        // retrieve all relatively friend messages sent by the active user
        const friendsChat = await userModel
          .findById({ _id: "" })
          .populate({ path: "Chats", match: { From: { $eq: "" } } })
          .select("Chats");

        // grab active user chats sent by a friend id relatively
        const activeUserChat = await userModel
          .findById({ _id: "" })
          .populate({ path: "Chats", match: { From: { $eq: "" } } })
          .select("Chats");

        // concat active and friend user chats together
        const chatRoom = concat(friendsChat?.Chats, activeUserChat?.Chats);
        // publish data data to CHAT_CHANNEL event
        pubSub.publish(CHAT_CHANNEL, { chatRoom: chatRoom });

        return { message: "", success: true };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Subscription: {
    ChatRoom: {
      subscribe: () => {
        return {
          // listening to the channel event
          [Symbol.asyncIterator]: () => pubSub.asyncIterator([CHAT_CHANNEL]),
        };
      },
    },
  },
};

export default Chat;

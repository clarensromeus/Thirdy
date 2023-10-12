// external imports of resources
import { PubSub } from "graphql-subscriptions";
// internally crafted imports of resources
import { notificationModel, userModel } from "../../Models/index.ts";
import dateScalar from "../../Service/DataScalar.ts";
import MongoId from "../../Service/MongoIdScalar.ts";
import { Resolvers } from "../../__generate__/types";
import { NOTIFICATION_CHANNEL } from "../../Constants/Notifications.ts";
import { UNAUTHORIZED } from "../../Constants/User.ts";
import { GraphQLError } from "graphql";

const pubSub: PubSub = new PubSub();

const Notifications: Resolvers = {
  Date: dateScalar,
  MongoId,
  Query: {
    GetNotifications: async (__, {}) => {
      try {
        const notifications = await notificationModel
          .find()
          .populate({
            path: "SenderInfo",
            select: "_id Firstname Lastname Image",
          })
          .where({ isSeen: false });

        return notifications;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    SendNotification: async (__, { NotiData }) => {
      try {
        const createNotification = await notificationModel.create(NotiData);

        if (!createNotification) {
          return { message: "notification not sent", success: false };
        }

        // grab the fresh notification pushed to the user
        const freshNotification = await notificationModel
          .findOne()
          .populate({
            path: "SenderInfo",
            select: "_id Firstname Lastname Image",
          })
          .where({ _id: createNotification._id });

        pubSub.publish(NOTIFICATION_CHANNEL, {
          SendNotification: freshNotification,
        });

        return {
          message: "notifications sent with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    ViewedNotifications: async (__, { NotiId }) => {
      try {
        await notificationModel
          .find({ isSeen: Boolean(true) })
          .where({ _id: { $in: NotiId } });
        return {
          message: "noti(s) viewed",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    DeleteNotification: async (__, { NotiId, userId }) => {
      try {
        const notification = await notificationModel
          .deleteOne()
          .where({ _id: NotiId });

        if (!notification) {
          return {
            message: "sorry notification is not deleted",
            success: false,
          };
        }

        await userModel
          .findOneAndUpdate({ $pull: { Notifications: NotiId } })
          .where({ _id: userId });

        return {
          message: "notification is successfully deleted",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Subscription: {
    SendNotification: {
      subscribe: (__, args, { user, isAuth }) => {
        if (!user && !isAuth) {
          throw new GraphQLError("sorry, you're not an authorized user", {
            extensions: {
              code: UNAUTHORIZED,
              warning: "retry with an authorized account",
            },
          });
        }
        return {
          // listening to the Notification channel event
          [Symbol.asyncIterator]: () =>
            pubSub.asyncIterator([NOTIFICATION_CHANNEL]),
        };
      },
    },
  },
};

export default Notifications;

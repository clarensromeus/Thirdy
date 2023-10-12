import lodash from "lodash";
import { userModel, friendModel } from "../../Models/index.ts";
import { Resolvers } from "../../__generate__/types.ts";

const { isNil, pick, merge, property, map, sample, filter, propertyOf } =
  lodash;

const Friends: Resolvers = {
  Query: {
    randomFriendRequest: async (__, { AcceptedId }) => {
      try {
        // make a quest of all friends from friend collection
        const allFriends = await friendModel.countDocuments();

        const userRelatedRequest = await friendModel
          .find()
          .populate({ path: "User", select: "_id Firstname Lastname Image" })
          .where({
            UserReceiverId: AcceptedId,
            AcceptedId: { $ne: AcceptedId },
          });

        // grab a random friend request
        const randomization = sample(userRelatedRequest);
        if (
          typeof randomization === "undefined" ||
          typeof randomization === null
        )
          return {};

        return randomization;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    AllFriends: async (__, { _id }) => {
      try {
        const friends = await friendModel
          .find()
          .populate({ path: "User", select: "_id Firstname Lastname Image" })
          .populate({
            path: "Receiver",
            select: "_id Firstname Lastname Image",
          })
          .where({
            $or: [{ UserReceiverId: _id }, { RequestId: _id }],
          })
          .and([{ AcceptedId: { $ne: undefined || null } }]);

        return friends;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    FriendSuggestions: async (__, { _id }) => {
      try {
        const allRequestSent = await friendModel
          .find()
          .select("UserReceiverId -_id")
          .where({ RequestId: _id });

        const allRequestReceived = await friendModel
          .find()
          .select("RequestId -_id")
          .where({ UserReceiverId: _id });

        const Request_ids = map(allRequestSent, property("UserReceiverId"));
        const Sent_ids = map(allRequestReceived, property("RequestId"));

        const friendSuggestions = await userModel
          .find({
            _id: { $not: { $in: Request_ids.concat(Sent_ids) } },
          })
          .select("_id Firstname Lastname Image");

        return friendSuggestions;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    MutualFriends: async (__, { friendId, userId }) => {
      try {
        // suggested user friends
        const requestFriends = await friendModel
          .find()
          .populate({ path: "User", select: "_id Image" })
          .where({ AcceptedId: friendId, User: { _id: userId } });

        // active user friends
        const activeUserFriends = await friendModel
          .find()
          .populate({ path: "User", select: "_id Image" })
          .where({ AcceptedId: userId, User: { _id: friendId } });

        // merge suggested and active user friends for easily finding out related friends
        const relativeFriends = merge(requestFriends, activeUserFriends);

        return relativeFriends;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    FriendRequest: async (__, { userId }) => {
      try {
        const friend = await friendModel
          .findOne({
            $neq: { AcceptedId: userId },
          })
          .populate({
            path: "User",
            select: "_id Firstname Lastname Email Image",
          });

        // grab friend info
        const friendData = pick(
          friend,
          "_id",
          "RequestId",
          "AcceptedId",
          "User"
        );

        return friendData;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    allFriendRequests: async (__, { _id }) => {
      try {
        const allFriends = await friendModel
          .find()
          .where({ UserReceiverId: _id, AcceptedId: { $ne: _id } })
          .populate({ path: "User", select: "_id Firstname Lastname Image" });

        return allFriends;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    follow: async (__, { requestData }) => {
      try {
        const { _id, RequestId, User } = requestData;
        // send the friend request
        const friendRequest = await friendModel.create({
          RequestId,
          User,
          UserReceiverId: _id,
        });

        if (isNil(friendRequest)) {
          return {
            message: "oops request not sent",
            success: false,
          };
        }

        return {
          message: `${friendRequest._id}`,
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    followBack: async (__, { AcceptedId, friendId, userRequestId }) => {
      try {
        const isAccepted = await friendModel
          .findOneAndUpdate({ AcceptedId, Receiver: AcceptedId })
          .where({ _id: friendId });

        if (!isAccepted) {
          return {
            message: "not accepted",
            success: false,
          };
        }

        // push the friend id reference to the active user array of friends
        await userModel
          .findOneAndUpdate({ $push: { Friends: friendId } })
          .where({ _id: { $in: [AcceptedId, userRequestId] } });

        return {
          message: "request accepted",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    unFollow: async (__, { userId, friendId, _id }) => {
      try {
        const unfollow = await friendModel
          .findOneAndDelete()
          .where({ AcceptedId: userId, RequestId: friendId });

        await userModel
          .find({ $pull: { Friends: _id } })
          .where({ _id: { $in: [userId, friendId] } });

        if (!unfollow) {
          return {
            message: "you're still friend with this user",
            success: false,
          };
        }

        return {
          message: "you unfollow that user",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    rejectRequest: async (__, { friendId }) => {
      try {
        // if friend request is rejected delete it from the user friend request
        const isRejected = await friendModel.findOneAndDelete({
          _id: friendId,
        });

        if (!isRejected) {
          return {
            message: "friend not rejected",
            success: false,
          };
        }

        await userModel
          .findOneAndUpdate({ $pull: { Friends: isRejected._id } })
          .where({ _id: isRejected.User._id });

        return {
          message: "rejected with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};

export default Friends;

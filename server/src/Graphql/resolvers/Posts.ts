import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { dirname } from "path";
import { GraphQLError } from "graphql";
import lodash from "lodash";
import { PubSub } from "graphql-subscriptions";
// internally crafted imports of ressources
import { Resolvers } from "../../__generate__/types.ts";
import UploadFile from "../../Service/ImageUpload.ts";
import { fileURLToPath } from "url";
import { ImageType } from "../../typings/upload.ts";
import MongoId from "../../Service/MongoIdScalar.ts";
import { cloudinary } from "../../Utils/Cloudinary.ts";
import { IContext } from "../../typings/Auth.ts";
import { RandomUser } from "../../Seed/User.ts";
import {
  likeModel,
  postModel,
  commentModel,
  retweetedModel,
  chatModel,
  userModel,
  groupModel,
  groupChatModel,
} from "../../Models/index.ts";
import { IPost } from "../../typings/posts.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const { isNil, isEqual } = lodash;

const pubSub: PubSub = new PubSub();

const Post: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Query: {
    GetAllPosts: async (__, args) => {
      try {
        const Get_Post_data = await postModel
          .find<IPost>()
          .populate({
            path: "User",
            select: "_id Firstname Lastname Image",
          })
          .populate({
            path: "Likes",
            select: "_id PostId",
            populate: { path: "User", select: "_id Firstname Lastname Image" },
          })
          .populate({
            path: "Comments",
            select: "_id PostId",
            populate: { path: "User", select: "_id Firstname Lastname Image" },
          });

        return Get_Post_data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    DeletePost: async (__, { PostId }) => {
      try {
        const Post = await postModel.findOneAndDelete({ PostId });

        if (!PostId) {
          new GraphQLError("", {
            extensions: {
              code: "DELETION_ERROR",
              message: "database not responding",
            },
          });
        }

        // delete the post image hosted on cloudinary platform
        await cloudinary.uploader.destroy(`${Post?.PublicId}`);

        return {
          message: "",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
  Mutation: {
    CreatePost: async (__, { postData, picture }) => {
      if (!isNil(picture)) {
        const { secureUrl, serverUrl, success, public_id }: ImageType<string> =
          await UploadFile(picture, true, __dirname, "Thirdy_social");
        // merge postdata user with image info
        // coming from cloudinary
        const data = Object.assign({}, postData, {
          PostImage: secureUrl,
          PublicId: public_id,
        });

        const Post = await postModel.create(data);
        if (Post) {
          return {
            message: "post is created successfully",
            success,
          };
        }
      }

      // if no picture field is provided by the post creator without image
      await postModel.create(postData);

      return { message: "post is successfully created", success: false };
    },
    PostLikes: async (__, { likesData }, context: IContext) => {
      try {
        const db = await likeModel
          .findOne({ PostId: likesData.PostId })
          .populate("User");

        if (db) {
          // delete relatively like data from likes document
          await likeModel.deleteOne({ _id: db._id });
          // and remove the like id reference from like document
          await postModel.findOneAndUpdate({
            PostId: likesData.PostId,
            $pull: { Likes: db._id },
          });

          return db;
        }
        // when user likes the post
        const createLikes = await likeModel.create(likesData);

        await postModel.findOneAndUpdate({
          PostId: likesData.PostId,
          $push: { Likes: createLikes._id },
        });

        const likes = await likeModel
          .findOne({ PostId: likesData.PostId })
          .populate("User");

        return likes;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    PostComments: async (__, { commentsData }) => {
      try {
        const createComments = await commentModel.create(commentsData);

        await postModel.findOneAndUpdate({
          PostId: commentsData.PostId,
          $pull: { Comments: createComments._id },
        });

        return {
          message: "commented",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    Retweet: async (__, { retweetData }) => {
      try {
        const retweet = await retweetedModel.create(retweetData);
        if (retweet) {
          await postModel.findOneAndUpdate(
            { PostId: retweetData.PostId },
            { $push: { RetweetedRating: retweet._id } }
          );

          return {
            message: "post retweeted successfully",
            success: true,
          };
        }
        return {
          message: "post is not retweeted",
          success: false,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    Share: async (__, { shareData, picture }) => {
      try {
        const { PostId, To, From, Title, _id, ShareDestination } = shareData;

        const { secureUrl, public_id }: ImageType<string> = await UploadFile(
          picture,
          true,
          __dirname,
          "Thirdy_social"
        );

        if (isEqual(ShareDestination, "GROUPS")) {
          const groupShare = await groupChatModel.create({
            ChatId: PostId,
            Chat: Title,
            PicturedMessage: secureUrl ?? "", // no image uploaded save an empty image
            To,
            From,
            public_id: public_id ?? "", // no image save an empty public_id
          });

          if (groupShare) {
            await groupModel.updateMany(
              { _id: { $in: _id } },
              { $push: { Chat: groupShare._id } }
            );
          }
        }

        const chatDb = await chatModel.create({
          ChatId: PostId,
          Chat: Title,
          PicturedMessage: secureUrl ?? "", // no image uploaded save an empty image
          To,
          From,
          public_id: public_id ?? "", // no image save an empty public_id
        });

        if (chatDb) {
          // share the post with all related users
          await userModel.updateMany(
            { _id: { $in: _id } },
            { $push: { Chat: chatDb._id } }
          );

          return {
            message: "shared with success",
            success: true,
          };
        }

        return {
          message: "post not shared",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};

export default Post;

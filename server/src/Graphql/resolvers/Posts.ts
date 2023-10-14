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
} from "../../Models/index.ts";
import { IPost } from "../../typings/posts.ts";
import dateScalar from "../../Service/DataScalar.ts";
import DeleteFile from "../../Service/Cloudinary.ts";
import { IPagination } from "../../typings/post.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const { isNil, isEqual, isUndefined, lt, size, pick } = lodash;

const pubSub: PubSub = new PubSub();

const Post: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  Upload: GraphQLUpload,
  MongoId: MongoId,
  Date: dateScalar,
  Query: {
    AllPosts: async (__, { cursor, limit }) => {
      try {
        // in case no cursor at the first request is provided
        // catch the most recent _id of the post to initially add it to the cursor
        const FresherPost = await postModel
          .findOne()
          .sort({ _id: -1 })
          .select("_id");

        // if cursor is no cursor is provided using the last one
        if (isUndefined(cursor) || lt(size(cursor), 1)) {
          cursor = `${FresherPost?._id}`;
        }

        // grab data for all posts
        const Get_Post_data = await postModel
          .find<IPost>({ _id: { $lt: cursor } })
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
          .populate({path: "RetweetedRating", select: "_id"})
          .sort({ _id: -1 })
          .limit(limit);

        if (Get_Post_data.length) {
          let PaginateData: IPagination[] = [
            {
              hasNext: false,
              lastPost: `${Get_Post_data[Get_Post_data.length - 1]._id}`, // first get the last id of the post on which the cursor is
              nextCursor: undefined,
            },
          ];

          let [{ hasNext, lastPost, nextCursor }] = PaginateData;
          // If there is an item with id less than last item (remember, sort is in desc _id), there is a next page
          const result = await postModel.findOne({
            _id: { $lt: lastPost },
          });

          if (result) {
            hasNext = true;
          }

          if (hasNext) {
            // if there's next data use it as cursor to fetch next page
            nextCursor = `${Get_Post_data[Get_Post_data.length - 1]._id}`;
          }
          return {
            cursor: `${nextCursor}`,
            Posts: Get_Post_data,
            hasNextPage: hasNext,
          };
        }

        return {};
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    SinglePost: async (__, { PostId }) => {
      try {
        // data for a single post
        const postInfo = await postModel
          .findOne()
          .populate({ path: "User", select: "_id Firstname Lastname Image" })
          .where({ PostId });


        return postInfo;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    PostLikes: async (__, {}) => {
      try {
        const likes = await likeModel
          .find()
          .populate({ path: "User", select: "_id Firstname Lastname Image" });

        return likes;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    PostComments: async () => {
      try {
        const comments = await commentModel
          .find()
          .populate({ path: "User", select: "_id Firstname Lastname Image" });

        return comments;
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
        // merge post data user with image info
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
    DeletePost: async (__, { PostId }) => {
      try {
        const Post = await postModel.findOneAndDelete({ PostId });

        if (!PostId) {
          new GraphQLError("cannot be deleted because of an error", {
            extensions: {
              code: "DELETION_ERROR",
              message: "database not responding",
            },
          });
        }

        await DeleteFile({ public_id: `${Post?.PublicId}`, imagePath: "" });

        return {
          message: "",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    EditPost: async (__, { editData }) => {
      try {
        const { Title, PostId, Picture } = await editData;

        if (typeof Picture !== undefined) {
          const { serverUrl, public_id }: ImageType<string> = await UploadFile(
            Picture,
            true,
            __dirname,
            "Thirdy_social"
          );

          await postModel
            .findOneAndUpdate({
              PostImage: serverUrl,
              PublicId: public_id,
              Title,
            })
            .where({ PostId });

          return {
            message: "post updated successfully",
            success: true,
          };
        }

        await postModel
          .findOneAndUpdate({
            Title: Title,
          })
          .where({ PostId });

        return {
          message: "post updated successfully",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    PostLikes: async (__, { likesData }, context: IContext) => {
      try {
        const db = await likeModel
          .findOne({ PostId: likesData.PostId, User: likesData.User })
          .populate("User");

        if (db) {
          // delete relatively like data from likes document
          await likeModel.deleteOne({ _id: db._id });

          return db;
        }
        // when user likes the post
        const createLike = await likeModel.create(likesData);

        const likes = await likeModel
          .findOne({ _id: createLike._id })
          .populate("User");

        return likes;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    PostComments: async (__, { commentsData }) => {
      try {
        const createComments = await commentModel.create(commentsData);

        const comments = await commentModel
          .findOne({
            _id: createComments._id,
          })
          .populate({ path: "User", select: "_id Firstname Lastname Image" });

        if (isNil(comments)) return {};

        return comments;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    Retweet: async (__, { retweetData }) => {
      try {
        const retweet = await retweetedModel.create(retweetData);
        if (retweet) {
          await postModel.findOneAndUpdate(
            { PostId: retweetData?.PostId },
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
    Share: async (__, { shareData }) => {
      try {
        const { PostId, To, From, Title, _id, Image } = shareData;

        const chatDb = await chatModel.create({
          ChatId: PostId,
          Chat: Title,
          PicturedMessage: Image,
          To,
          From,
        });

        if (chatDb) {
          // share the post with all related users
          await userModel
            .updateMany({ $push: { Chats: chatDb._id } })
            .where({ _id: { $in: _id } });

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
    SharePostWithGroup: async (__, { retweetData, GroupInfo }) => {
      try {
        const retweet = await retweetedModel.create(retweetData);
        if (retweet) {
          await postModel.findOneAndUpdate(
            { PostId: retweetData?.PostId },
            { $push: { RetweetedRating: retweet._id } }
          );

          const retweetedPost = await postModel
            .findOne()
            .where({ PostId: GroupInfo?.sharedPostId })
            .select("_id");

          await groupModel.updateMany({
            _id: { $in: GroupInfo?.GroupId },
            $push: { Posts: retweetedPost?._id },
          });
        }

        return {
          message: "post shared with success",
          success: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
};

export default Post;

import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./User.ts";
import { Post } from "./Post.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "retweets", timestamps: true } })
export class Retweeted {
  @prop({ type: () => String, trim: true, required: true })
  public PostId!: string; // ID of the retweeted post

  @prop({ ref: () => User, required: true })
  public RetweetedUser!: Ref<User>; // post retweeted user reference

  @prop({ ref: () => Post, required: true })
  public Post!: Ref<Post>; // retweeted post reference
}

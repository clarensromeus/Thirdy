import { prop, modelOptions, Ref } from "@typegoose/typegoose";
// externally crafted imports of ressources
import { User } from "./User.ts";
import { Post } from "./Post.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "Comments", timestamps: true } })
export class Comments {
  @prop({ type: () => String, required: true, unique: false })
  public PostId!: string; // comment post id

  @prop({ type: () => String, required: true })
  public Body!: string; // comment body

  @prop({ type: () => String, required: true })
  public CommentReference!: string; // a reference which creates randomly on each comment

  @prop({ ref: () => User, required: true })
  public User!: Ref<User>; // comment-written user
}

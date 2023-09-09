import { prop, modelOptions, Ref } from "@typegoose/typegoose";
// externally crafted imports of ressources
import { User } from "./User.ts";
import { Post } from "./Post.ts";

export class Comments {
  @prop({ type: () => String, required: true })
  public PostId!: string; // comment post id

  @prop({ type: () => String, required: true })
  public Body!: string; // comment body

  @prop({ type: () => String, required: true })
  public CommentReference!: string; // a reference which creates randomly on each comment

  @prop({ ref: () => Post, required: false })
  public Post?: Ref<Post>;

  @prop({ ref: () => User, required: true })
  public User!: Ref<User>; // comment-written user
}

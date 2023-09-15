import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./User.ts";
import { GroupChat } from "./GroupChat.ts";
import { Post } from "./Post.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "groups", timestamps: true } })
export class Group {
  @prop({ type: () => String, required: true, trim: true })
  public GroupName!: string;

  @prop({ type: () => String, required: false })
  public GroupCoverImage?: string;

  @prop({ type: () => String, required: false })
  public public_id?: string;

  @prop({ ref: () => User, required: true, default: [] })
  public Administrators!: Ref<User>[];

  @prop({ type: () => String, required: true })
  public Privacy!: string;

  @prop({ ref: () => User, required: false })
  public GroupUsers?: Ref<User>[];

  @prop({ ref: () => Post })
  public Posts?: Ref<Post>[];

  @prop({ ref: () => GroupChat, required: false })
  public Chat?: Ref<GroupChat>[];
}

import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
// internally crafted imports of resources
import { Post } from "./Post.ts";
import { Chat } from "./Chat.ts";
import { Friend } from "./Friends.ts";
import { Group } from "./Groups.ts";
import { CoverPicture } from "./CoverPicture.ts";
import { Status } from "./Status.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class User {
  @prop({ type: () => String, required: true, lowercase: true, trim: true })
  public Firstname!: string;

  @prop({ type: () => String, required: true, lowercase: true, trim: true })
  public Lastname!: string;

  @prop({ type: () => String, required: false })
  public Email?: string;

  @prop({ type: () => String, required: true, maxlength: 60, minlength: 8 })
  public Password!: string;

  @prop({ type: () => String, required: true, lowercase: true })
  public Sex!: string;

  @prop({ type: () => String, required: false, trim: true })
  public Image?: string;

  @prop({ type: () => String, required: false })
  public PublicId?: string;

  @prop({ type: () => Boolean, required: true, default: false })
  public IsOnline!: string;

  @prop({ type: () => CoverPicture, required: false })
  public CoverImage?: CoverPicture;

  @prop({ type: () => String, required: false })
  public Bio?: string;

  @prop({ type: () => String, required: true, lowercase: true })
  public DOB!: string;

  @prop({ ref: () => Friend, required: true, default: [] })
  public Friends?: Ref<Friend>[];

  @prop({ ref: () => Chat, required: true, default: [] })
  public Chats!: Ref<Chat>[];

  @prop({ ref: () => Group, required: true, default: [] })
  public Groups!: Ref<Group>[];

  @prop({ ref: () => Post, required: false })
  public Posts?: Ref<Post>[];

  @prop({ ref: () => Status, required: false })
  public userStatus?: Ref<Status>[];
}

const userModel = getModelForClass(User);

export { userModel, User };

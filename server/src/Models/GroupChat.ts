import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "groupchat", timestamps: true } })
export class GroupChat {
  @prop({ type: () => String, required: true, trim: true })
  private ChatId!: string;

  @prop({ type: () => String, required: false })
  public Message?: string;

  @prop({ type: () => String, required: false, trim: true })
  public PicturedMessage?: string;

  @prop({ type: () => String, required: true })
  public GroupId!: string;

  @prop({ ref: () => User, required: true })
  public From!: Ref<User>;
}

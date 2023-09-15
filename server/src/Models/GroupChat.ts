import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./User.ts";
import { Group } from "./Groups.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "groupchat", timestamps: true } })
export class GroupChat {
  @prop({ type: () => String, required: false })
  public Chat?: string;

  @prop({ type: () => String, required: false })
  public public_id?: string;

  @prop({ type: () => Number, required: true })
  public ChatPlacement!: number;

  @prop({ type: () => String, required: false, trim: true })
  public PicturedMessage?: string;

  @prop({ ref: () => User, required: true })
  public From!: Ref<User>;

  @prop({ ref: () => Group, required: true })
  public To!: Ref<Group>;
}

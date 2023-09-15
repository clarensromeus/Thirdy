import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "chat", timestamps: true } })
export class Chat {
  @prop({ type: () => String, required: false })
  public Chat?: string;

  @prop({ type: () => String, required: false })
  public public_id?: string;

  @prop({ type: () => String, required: false, trim: true })
  public PicturedMessage?: string;

  @prop({ ref: () => User, required: true })
  public To!: Ref<User>;

  @prop({ ref: () => User, required: true })
  public From!: Ref<User>;
}

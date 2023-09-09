import { prop, modelOptions, Ref } from "@typegoose/typegoose";
//internally crafted imports of ressources
import { NotiReference } from "../typings/Enum";
import { NotiEngine } from "./NotiEngine";
import { User } from "./User";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "groups", timestamps: true } })
export class Notifications {
  @prop({ type: () => String, required: true })
  public ReceiverId!: string;

  @prop({ type: () => String, required: true, unique: true })
  public NotiId!: string;

  @prop({ type: () => User, required: true })
  public SenderInfo!: Ref<User>;

  @prop({ type: () => NotiEngine, required: true })
  public NotiEngine!: NotiEngine;

  @prop({ enum: NotiReference, required: true })
  public NotiReference!: NotiReference;
}

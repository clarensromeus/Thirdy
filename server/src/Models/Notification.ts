import { prop, modelOptions, Ref } from "@typegoose/typegoose";
//internally crafted imports of resources
import { NotiReference } from "../Enum/index.ts";
import { NotiEngine } from "./NotiEngine.ts";
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({
  schemaOptions: { collection: "Notifications", timestamps: true },
})
export class Notifications {
  @prop({ type: () => String, required: false })
  public ReceiverId?: string; // user id reference that receives  the notification

  @prop({ type: () => Boolean, required: false })
  public isGroup!: boolean; // group id reference that receives the notification

  @prop({ type: () => Boolean, required: true, default: false })
  public isSeen!: boolean; // justify whether or not the notification is seen

  @prop({ ref: () => User, required: true })
  public SenderInfo!: Ref<User>; // sender id reference, meaning a reference of the user who sends the notification

  @prop({ type: () => NotiEngine, required: true })
  public NotiEngine!: NotiEngine;

  @prop({ enum: NotiReference, required: true })
  public NotiReference!: NotiReference; // an enum which represents the notification type
}

import { prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { _id: false } })
export class NotiEngine {
  @prop({ type: () => String, required: false })
  public GroupName?: string;

  @prop({ type: () => String, required: false })
  public FriendRequestID?: string;

  @prop({ type: () => String, required: false })
  public NotiText?: string;

  @prop({ type: () => String, required: false, trm: true })
  public NotiImage?: string;
}

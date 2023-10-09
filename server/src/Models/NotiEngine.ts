import { prop } from "@typegoose/typegoose";

export class NotiEngine {
  @prop({ type: () => String, required: false })
  public GroupName?: string;

  @prop({ type: () => String, required: false })
  public NotiText?: string;

  @prop({ type: () => String, required: false, trm: true })
  public NotiImage?: string;
}

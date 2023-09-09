import { prop } from "@typegoose/typegoose";

export class NotiEngine {
  @prop({ type: () => String, required: true })
  public reference!: string;

  @prop({ type: () => String, required: false })
  public groupName?: string;

  @prop({ type: () => String, required: false })
  public NotiText?: string;

  @prop({ type: () => String, required: false })
  public NotiImage?: string;
}

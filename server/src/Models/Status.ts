import { prop } from "@typegoose/typegoose";

export class Status {
  @prop({ type: () => String, required: true })
  public StatusId!: string;

  @prop({ type: () => String, required: false, unique: true })
  public public_id?: string;

  @prop({ type: () => String, required: false })
  public Image?: string;
}

import { prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "Status", timestamps: true } })
export class Status {
  @prop({ type: () => String, required: true })
  public StatusId!: string;

  @prop({ type: () => String, required: true })
  public userID!: string;

  @prop({ type: () => String, required: false, unique: true })
  public public_id?: string;

  @prop({ type: () => String, required: false })
  public Image?: string;
}

import { prop } from "@typegoose/typegoose";

export class CoverPicture {
  @prop({ type: () => String, required: true })
  public Image!: string;

  @prop({ type: () => String, required: true, unique: true })
  public PublicId!: string;
}

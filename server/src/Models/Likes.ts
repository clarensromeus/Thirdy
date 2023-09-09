import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "likes", timestamps: true } })
export class Like {
  @prop({ type: () => String, required: true, trim: true })
  public PostId!: string;

  @prop({ type: () => String, required: true, trim: true })
  public Preference!: string;

  @prop({ ref: () => User, required: false })
  public User?: Ref<User>;
}

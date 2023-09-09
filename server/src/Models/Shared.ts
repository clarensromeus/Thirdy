// external imports of ressources
import { prop, Ref, modelOptions } from "@typegoose/typegoose";
// internally crafted imports of ressources
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "share", timestamps: true } })
export class Share {
  @prop({ type: () => String, required: true, trim: true })
  PostId!: string; // ID of the shared post

  @prop({ ref: () => User, required: true })
  SharedUser!: Ref<User>; // post shared user reference
}
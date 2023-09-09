import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { Status } from "./Status";

export class UserStatus {
  @prop({ ref: () => User, required: true })
  public User!: Ref<User>;

  @prop({ type: () => [Status], required: true })
  public StatusImages!: [Status];
}

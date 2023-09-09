import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./User.ts";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
@modelOptions({ schemaOptions: { collection: "friends", timestamps: true } })
export class Friend {
  @prop({ type: () => String, required: true })
  public RequestId!: string; // user friend Request id

  @prop({ type: () => String, required: false })
  public AcceptedId?: string; // user friend acceptation id

  @prop({ type: () => String, required: true })
  public UserReceiverId!: string; // user id whose friend request is sent

  @prop({ ref: () => User, required: true })
  public User!: Ref<User>; // friend id reference who makes the request
}

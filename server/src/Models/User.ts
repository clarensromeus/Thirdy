import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

// parse the collection name and timestamp to generate createdAt and updateAt field in the db
modelOptions({ schemaOptions: { collection: "users", timestamps: true } });
class User {
  @prop({ required: true, lowercase: true, trim: true })
  Firstname!: string;

  @prop({ required: true, lowercase: true, trim: true })
  Lastname!: string;

  @prop({ required: false })
  Email?: string;

  @prop({ required: true, maxlength: 60, minlength: 8 })
  Password!: string;

  @prop({ required: true, lowercase: true })
  Sex!: String;

  @prop({ required: false, trim: true })
  Image?: string;

  @prop({ required: false })
  Bio?: string;

  @prop({ required: true, lowercase: true })
  DOB!: string;
}

const userModel = getModelForClass(User);

export { userModel, User };

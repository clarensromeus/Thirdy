import { ReturnModelType } from "@typegoose/typegoose";
// intenally crafted imports of ressources
import { IGetInfo } from "./Auth";
import { Post } from "../Models/Post";

interface IpostContext {
  user: IGetInfo<string>;
  isAuth: boolean;
  postModel: ReturnModelType<typeof Post>;
}

interface IPost {
  _id: string;
  PostId: string;
  PostImage: String;
  PublicId: String;
  Title: String;
  user?: Pick<
    IGetInfo<string>,
    "_id" | "DOB" | "Firstname" | "Lastname" | "Email" | "Image"
  >;
  createdAt?: String;
  updateAt?: String;
}
export { IpostContext };

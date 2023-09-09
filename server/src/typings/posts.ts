import { ObjectId } from "mongoose";

interface User {
  _id: ObjectId;
  Firstname: string;
  Lastname: string;
  Image: string;
}

interface Ilike {
  _id: ObjectId;
  PostId: string;
  User: User;
}

interface Icomment {
  _id: ObjectId;
  PostId: string;
  User: User;
}

interface IPost {
  _id: ObjectId;
  PostId: string;
  PostImage: string;
  PublicId: string;
  Title: string;
  Likes: Ilike[];
  Comments: Icomment[];
  User: User;
  createdAt: string;
  updatedAt: string;
}

export { IPost };

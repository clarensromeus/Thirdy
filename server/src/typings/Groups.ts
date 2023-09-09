import { ObjectId } from "mongoose";

type User = {
  _id: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Image: string;
};

interface IGroup {
  _id: ObjectId;
  PostId: string;
  GroupName: string;
  Public_Id: string;
  GroupCoverImage: string;
  Privacy: string;
  GroupUsers: User[];
  createdAt: string;
  updatedAt: string;
}

export { IGroup };

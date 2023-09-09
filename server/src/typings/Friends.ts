import { IUser } from "./Con_Register";

interface User extends IUser<string> {
  _id: string;
}

type IFriend = {
  _id: string;
  RequestId: string;
  AcceptedId: string;
  User: User;
};

export { IFriend };

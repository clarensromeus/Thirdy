import { ReturnModelType } from "@typegoose/typegoose";
import { User } from "../Models/User.ts";
import { IGetInfo } from "./Auth.ts";

interface IUser<T> {
  Firstname: T;
  Lastname: T;
  Email: T;
  Image?: T;
  Sex: T;
  Password: T;
  DOB: T;
  Bio?: T;
}

type IRegisteration<T extends string> = {
  registerInfo: IUser<T>;
};

type IConnection<T> = {
  connectionInfo: {
    Username?: T;
    Email?: T;
    Password: T;
  };
};

type IUserContext = {
  isAuth?: boolean;
  user: IGetInfo<string>;
  userModel: ReturnModelType<typeof User>;
};

export { IRegisteration, IConnection, IUserContext, IUser };

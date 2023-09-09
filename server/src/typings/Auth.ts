import { Request } from "express";

interface ITokenInfo<S> {
  issuer: S;
  Data: object;
}

import { PubSub } from "graphql-subscriptions";

interface IGetInfo<S> {
  _id: S;
  Firstname: S;
  Lastname: S;
  Email?: S;
  Password: S;
  Sex: S;
  DOB: S;
  Image?: S;
  Bio?: S;
  createdAt?: S;
  updatedAt?: S;
}

interface RequestWithUserRole extends Request {
  user?: IGetInfo<string>;
  isAuth?: boolean;
}

type Iauth = {
  user?: IGetInfo<string>;
  isAuth?: boolean;
};

type IContext = {
  user: IGetInfo<string>;
  pubSub: PubSub;
};

export { ITokenInfo, RequestWithUserRole, Iauth, IGetInfo, IContext };

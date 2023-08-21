import pkg from "lodash";
import { IGetInfo } from "../typings/Auth";

const { pick } = pkg;

const serializeUser = (data: IGetInfo<string>) => {
  const userdata = pick(data, [
    "_id",
    "Firstname",
    "Lastname",
    "Password",
    "Email",
    "Image",
    "DOB",
    "Sex",
    "Bio",
  ]);

  return userdata;
};

export { serializeUser };

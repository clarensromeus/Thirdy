import pick from "lodash/pick";
import { IinfoState } from "../typings/GlobalState";
const serializeUserData = (info: IinfoState<string>) => {
  // retrieve all data from the query data response
  const userData = pick(
    info,
    "_id",
    "Firstname",
    "Lastname",
    "Email",
    "Password",
    "Sex",
    "Bio",
    "Image",
    "DOB"
  );

  return userData;
};

export { serializeUserData };

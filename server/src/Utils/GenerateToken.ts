// external imports of ressources
import jwt from "jsonwebtoken";
import { promisify } from "util";
// internally crafted imports of ressources
import { ITokenInfo } from "../typings/Auth.ts";

const JWT_WEB_TOKEN = promisify(jwt.sign).bind(jwt);
const JWT_VERIFY_TOKEN = promisify(jwt.verify).bind(jwt);

const GenerateToken = async (
  data: ITokenInfo<string>,
  ACCESS_TOKEN: string
): Promise<string> => {
  // @ts-ignore
  const token: string = await JWT_WEB_TOKEN(data.Data, `${ACCESS_TOKEN}`, {
    algorithm: "HS384", // token encoded algorithm
    issuer: data.issuer, // a unique key for user authenticity
    subject: "personal token",
    expiresIn: "62d", // token will be expired in 2 months
  });

  return token;
};

export default GenerateToken;

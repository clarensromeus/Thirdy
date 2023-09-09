import jwt from "jsonwebtoken";
// internally crafted imports of ressources
import { userModel } from "../Models/User.ts";
import { Iauth } from "../typings/Auth.ts";
import { ACCESS_TOKEN } from "../Config/index.ts";

const ReadToken = async (tokenHeader: string): Promise<Iauth> => {
  try {
    let decodeToken: any = "";

    const AuthHeader: string | undefined = await tokenHeader;
    // return nothing if no header is specified
    if (!AuthHeader) {
      return {
        isAuth: false,
      };
    }
    /**
     * Todo ! what to note about the token
     * check if there's a header provided then cast the string containing the Bearer
     * and the token into an array then get the token at index 1 of the array
     */
    const token = AuthHeader && AuthHeader.split(" ")[1];

    // return nothing if no token is specified and fire up an error using graphql Error
    if (!token) {
      return {
        isAuth: false,
      };
    }

    // decode the token if exists
    decodeToken = await jwt.verify(token, `${ACCESS_TOKEN}`);

    if (!decodeToken) {
      return {
        isAuth: false,
      };
    }

    // seek out user from the database
    const userAuth = userModel.findById({ _id: decodeToken._id });

    if (!userAuth) {
      return {
        isAuth: false,
      };
    }

    return {
      isAuth: true,
      user: decodeToken,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default ReadToken;

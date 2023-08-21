import { GraphQLError } from "graphql";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
// internally crafted imports of ressources
import { RequestWithUserRole } from "../typings/Auth.ts";
import { userModel } from "../Models/User.ts";
import { ACCESS_TOKEN } from "../Config/index.ts";

const ReadToken = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let decodeToken: any = "";

    const AuthHeader: string | undefined = await req.headers["authorization"];
    // return nothing if no header is specified
    if (!AuthHeader) {
      req.isAuth = false;
      return next();
    }
    /**
     * Todo ! what to note about the token
     * check if there's a header provided then cast the string containing the Bearer
     * and the token into an array then get the token at index 1 of the array
     */
    const token = AuthHeader && AuthHeader.split(" ")[1];

    // return nothing if no token is specified and fire up an error using graphql Error
    if (!token) {
      req.isAuth = false;
      new GraphQLError("no token is provided", {
        extensions: {
          code: "UNAUTHENTICATED",
          statusCode: 500,
          statusMessage: "provide a token first before the operation completes",
        },
      });
      return next();
    }

    // decode the token if exists
    decodeToken = await jwt.verify(token, `${ACCESS_TOKEN}`);

    if (!decodeToken) {
      req.isAuth = false;
      return next();
    }

    // seek out user from the database
    const userAuth = userModel.findById({ _id: decodeToken._id });

    if (!userAuth) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    // add the token data decoded to the user created on request to anywhere through app
    req.user = decodeToken;
    return next();
  } catch (error) {
    // throw new Error(`${error}`);
    console.log(error);
    next();
  }
};

export default ReadToken;

import { makeVar } from "@apollo/client";
// internally crated imports of resources
import { isAuthenticated } from "../typings/Authentication";

export const Authentication = makeVar<isAuthenticated>({ isLoggedIn: false });

import { atom } from "recoil";
import { IAuthState } from "../typings/GlobalState";

const AuthState = atom<Partial<IAuthState>>({
  key: "Authentication",
  default: {},
});

export { AuthState };

import { atom } from "recoil";
import { IAuthState } from "../typings/GlobalState";
import { IMode } from "../typings/GlobalState";

// atom that that store
const AuthState = atom<Partial<IAuthState>>({
  key: "Authentication",
  default: {},
});

// atom that stores mode context data like light or dark for the whole application
const AppMode = atom<IMode>({
  key: "Mode",
  default: { mode: "light" },
});

export { AuthState, AppMode };

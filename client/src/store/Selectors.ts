import { selector } from "recoil";
import { IAuthState } from "../typings/GlobalState";
import { IMode } from "../typings/GlobalState";
import { AuthState, AppMode } from "./Data";

const GetAuthInfo = selector<Partial<IAuthState>>({
  key: "GetAuthInfo",
  get: async ({ get }) => {
    const AuthInfo = await get(AuthState);
    return {
      ...AuthInfo,
    };
  },
  // this feature is for caching already got data not to perform a re-render on each state update
  // if data is already taken a flight
  cachePolicy_UNSTABLE: {
    // caching all data
    eviction: "keep-all",
  },
});

const GetMode = selector<IMode>({
  key: "LightOrDark",
  get: ({ get }) => {
    const appMode = get(AppMode);
    return {
      ...appMode,
    };
  },

  // this feature is for caching already got data not to perform a re-render on each state update
  // if data is already taken a flight
  cachePolicy_UNSTABLE: {
    // caching all data
    eviction: "keep-all",
  },
});

export { GetAuthInfo, GetMode };

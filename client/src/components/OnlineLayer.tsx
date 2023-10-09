import * as React from "react";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

interface IOnlineLayerProps {
  children: (userId: string) => any;
}

const OnlineLayer = ({ children }: IOnlineLayerProps): JSX.Element => {
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  return <React.Fragment>{children(`${AuthInfo.Data?._id}`)}</React.Fragment>;
};

export default OnlineLayer;

/* OnlineLayer component is a wrapper around OnlineOffline Status */

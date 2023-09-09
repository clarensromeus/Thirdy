import lodash from "lodash";
import { IFriend } from "../typings/Friends";

const { pick } = lodash;

const FriendInfo = (friendInfo: Object) => {
  const friendData = pick(friendInfo, "_id", "RequestId", "AcceptedId", "User");
  return friendData;
};

export { FriendInfo };

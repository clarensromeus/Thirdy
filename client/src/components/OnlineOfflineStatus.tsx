import { useEffect, useState, useMemo } from "react";
import { useMutation } from "@apollo/client";
// external imports of resources
import { ONLINE_OFFLINE_STATUS } from "../graphql/User.graphql";
import {
  OnlineOfflineStatusMutation,
  OnlineOfflineStatusMutationVariables,
} from "../__generated__/graphql";

const IsOnline = ({ userId }: { userId: string }) => {
  const [isOnline, setisOnline] = useState<boolean>(navigator.onLine);

  const [OnlineStatus] = useMutation<
    OnlineOfflineStatusMutation,
    OnlineOfflineStatusMutationVariables
  >(ONLINE_OFFLINE_STATUS);

  const onlineStatus = useMemo(
    () => ({
      online: isOnline,
    }),
    [isOnline]
  );

  useEffect(() => {
    // update network status
    const handleOnlineStatus = async () => {
      try {
        setisOnline(navigator.onLine);

        await OnlineStatus({
          variables: {
            onlineOfflineStatusUserId: `${userId}`,
            online: isOnline,
          },
          onCompleted: () => {
            console.log(userId);
            console.log(isOnline);
          },
        });
      } catch (error) {
        throw new Error();
      }
    };

    // listen to the online event
    document.addEventListener("scroll", handleOnlineStatus);
    // listen to the offline event
    document.addEventListener("offline", handleOnlineStatus);

    // clean up for re-rendering prevention
    return () => {
      document.removeEventListener("online", handleOnlineStatus);
      document.removeEventListener("offline", handleOnlineStatus);
    };
  }, [onlineStatus.online]);
};

export default IsOnline;

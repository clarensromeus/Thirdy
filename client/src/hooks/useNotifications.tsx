import { useContext } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useReactiveVar } from "@apollo/client";
// internally crafted imports of resources
import {
  GetUserNotificationsQuery,
  GetUserNotificationsQueryVariables,
  SendNotificationMutation,
  SendNotificationMutationVariables,
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables,
  Viewed_NotificationsMutation,
  Viewed_NotificationsMutationVariables,
  PushNotificationSubscription,
  PushNotificationSubscriptionVariables,
} from "../__generated__/graphql";
import {
  GET_NOTIFICATIONS,
  SEND_NOTIFICATION,
  DELETE_NOTIFICATION,
  VIEWED_NOTIFICATION,
  PUSH_NOTIFICATION,
} from "../graphql/Notifications.graphql";
import { INotiData } from "../typings/Notifications";
import { defaultNotiProp } from "../typings/Notifications";
import { AllNotifications } from "../Global/GlobalNotifications";

const useNotification = (_id?: string) => {
  // making use of apollo client globally local state
  const reactiveNotifications = useReactiveVar(AllNotifications);

  // Send Notification mutation
  const [SendNotification] = useMutation<
    SendNotificationMutation,
    SendNotificationMutationVariables
  >(SEND_NOTIFICATION);

  // Delete Notification mutation
  const [DeleteNoti, { loading: delNotiLoading }] = useMutation<
    DeleteNotificationMutation,
    DeleteNotificationMutationVariables
  >(DELETE_NOTIFICATION);

  // viewed notification mutation
  const [Viewed_Notification] = useMutation<
    Viewed_NotificationsMutation,
    Viewed_NotificationsMutationVariables
  >(VIEWED_NOTIFICATION);

  // all notifications data
  const { data, loading } = useQuery<
    GetUserNotificationsQuery,
    GetUserNotificationsQueryVariables
  >(GET_NOTIFICATIONS);

  // Send Notification function helper
  const CreateNotification = async (Data: INotiData<string>) => {
    try {
      await SendNotification({
        variables: {
          notiData: Data,
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // Delete Notification function helper
  const DeleteNotification = async ({
    notiId,
    userId,
  }: {
    notiId: string;
    userId: string;
  }) => {
    try {
      await DeleteNoti({
        variables: { notiId, deleteNotificationUserId: userId },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // Read Notifications function helper
  const ReadNotification = ({ userId = _id }: defaultNotiProp) => {
    return data;
  };

  // Viewed Notifications function helper
  const ViewedNotifications = async (notiId: string[]) => {
    try {
      await Viewed_Notification({ variables: { notiId } });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const PushNotification = ({ isAuth }: { isAuth: boolean }) => {
    useSubscription<
      PushNotificationSubscription,
      PushNotificationSubscriptionVariables
    >(PUSH_NOTIFICATION, {
      onSubscriptionData: (data) => {
        // if there's a new notification coming in push it at once to the
        // concerned user
        if (data.subscriptionData.data?.SendNotification && isAuth) {
          AllNotifications({
            Notifications: [
              ...reactiveNotifications.Notifications,
              data.subscriptionData.data.SendNotification,
            ],
          });
        }
      },
    });
  };

  return {
    CreateNotification,
    DeleteNotification,
    ViewedNotifications,
    ReadNotification,
    PushNotification,
    delNotiLoading,
    loading,
  };
};

export default useNotification;

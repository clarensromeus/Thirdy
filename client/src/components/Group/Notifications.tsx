import { gql } from "@apollo/client";

/*--------------------->Queries<--------------------*/
const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotification($getNotificationsUserId: ID!) {
    GetNotifications(userId: $getNotificationsUserId) {
      _id
      ReceiverId
      isGroup
      isSeen
      NotiReference
      SenderInfo {
        _id
        Firstname
        Lastname
        Image
      }
      NotiEngine {
        GroupName
        NotiImage
        NotiText
      }
    }
  }
`;

/*---------------------->Mutations<----------------*/
const PUSH_NOTIFICATION = gql`
  mutation SendNotification($notiData: NotiData!) {
    SendNotification(NotiData: $notiData) {
      message
      success
    }
  }
`;

const DELETE_NOTIFIFICATION = gql`
  mutation DeleteNotification($notiId: ID!, $deleteNotificationUserId: ID!) {
    DeleteNotification(NotiId: $notiId, userId: $deleteNotificationUserId) {
      message
      success
    }
  }
`;

export { GET_USER_NOTIFICATIONS, DELETE_NOTIFIFICATION, PUSH_NOTIFICATION };

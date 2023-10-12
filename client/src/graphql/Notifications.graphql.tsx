import { gql } from "@apollo/client";

/*------------------>Queries<------------------------*/
const GET_NOTIFICATIONS = gql`
  query GetUserNotifications {
    GetNotifications {
      _id
      ReceiverId
      isGroup
      isSeen
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
        FriendRequestID
      }
      NotiReference
      createdAt
    }
  }
`;

/*---------------------->Mutations<-------------------*/
const SEND_NOTIFICATION = gql`
  mutation SendNotification($notiData: NotiData!) {
    SendNotification(NotiData: $notiData) {
      message
      success
    }
  }
`;

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notiId: ID!, $deleteNotificationUserId: ID!) {
    DeleteNotification(NotiId: $notiId, userId: $deleteNotificationUserId) {
      message
      success
    }
  }
`;

const VIEWED_NOTIFICATION = gql`
  mutation Viewed_Notifications($notiId: [ID]) {
    ViewedNotifications(NotiId: $notiId) {
      message
      success
    }
  }
`;

const PUSH_NOTIFICATION = gql`
  subscription PushNotification {
    SendNotification {
      _id
      isSeen
      isGroup
      ReceiverId
      NotiReference
      SenderInfo {
        _id
        Firstname
        Lastname
        Image
      }
      NotiEngine {
        GroupName
        NotiText
        NotiImage
      }
      createdAt
    }
  }
`;

export {
  GET_NOTIFICATIONS,
  SEND_NOTIFICATION,
  DELETE_NOTIFICATION,
  VIEWED_NOTIFICATION,
  PUSH_NOTIFICATION,
};

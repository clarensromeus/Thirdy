import { gql } from "@apollo/client";

const USER_CHATS = gql`
  query userChats($chatUserInfo: chatUserInfo!) {
    Chat(chatUserInfo: $chatUserInfo) {
      _id
      public_id
      PicturedMessage
      Chat
      createdAt
      To {
        _id
        Firstname
        Lastname
        Image
      }
      From {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const INSTANT_USER_CHATS = gql`
  subscription InstantUserChats {
    Chat {
      _id
      Chat
      PicturedMessage
      public_id
      createdAt
      To {
        _id
        Firstname
        Lastname
        Image
      }
      From {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const CHAT_WITH_FRIENDS = gql`
  mutation ChatWithFriends($chatInfo: chatInfo!) {
    ChatWithFriends(chatInfo: $chatInfo) {
      message
      success
    }
  }
`;

export { USER_CHATS, INSTANT_USER_CHATS, CHAT_WITH_FRIENDS };

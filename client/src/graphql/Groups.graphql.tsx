import { gql } from "@apollo/client";

/*------------------------Queries-------------------------  */
const GET_ALL_GROUPS = gql`
  query GetAllGroups {
    GetAllGroups {
      _id
      GroupCoverImage
      GroupName
      Privacy
      GroupUsers {
        _id
        Firstname
        Lastname
        Image
      }
      createdAt
    }
  }
`;

const GROUP_INFO = gql`
  query GroupInfo($groupName: String!, $groupId: ID!) {
    GroupInfo(groupName: $groupName, groupId: $groupId) {
      _id
      GroupName
      GroupCoverImage
      Privacy
      GroupUsers {
        _id
        Firstname
        Lastname
        Image
      }
      createdAt
    }
  }
`;

const GET_CHAT_IN_GROUP = gql`
  query ChatInGroups($chatWithFriendsInGroupsGroupId: ID!) {
    ChatWithFriendsInGroups(groupId: $chatWithFriendsInGroupsGroupId) {
      _id
      Chat
      public_id
      PicturedMessage
      ChatPlacement
      createdAt
      From {
        _id
        Firstname
        Lastname
        Image
      }
      To {
        _id
        GroupName
      }
    }
  }
`;

const GROUP_USERS = gql`
  query GroupUsers($groupUsersGroupName: String!, $groupUsersGroupId: ID!) {
    GroupUsers(groupName: $groupUsersGroupName, groupId: $groupUsersGroupId) {
      _id
      Firstname
      Lastname
      Image
    }
  }
`;

/*-------------------------Mutations------------------------ */
const JOIN_GROUPS = gql`
  mutation JoinGroup($id: ID!, $groupId: ID!) {
    JoinGroup(_id: $id, GroupId: $groupId) {
      message
      success
    }
  }
`;

const LEAVE_GROUPS = gql`
  mutation LeaveGroup($leaveGroupId: ID!, $Id: ID!) {
    LeaveGroup(_id: $Id, GroupId: $leaveGroupId) {
      message
      success
    }
  }
`;

const CHAT_IN_GROUP = gql`
  mutation SendChatInGroup($dataFeed: dataFeed!) {
    ChatWithFriendsInGroups(dataFeed: $dataFeed) {
      message
      success
    }
  }
`;

/*----------------------Subscriptions--------------------- */
const REAL_TIME_CHAT_IN_GROUP = gql`
  subscription RealTimeChatInGroup {
    ChatWithFriendsInGroups {
      _id
      Chat
      public_id
      PicturedMessage
      ChatPlacement
      createdAt
      From {
        _id
        Firstname
        Lastname
        Image
      }
      To {
        _id
        GroupName
      }
    }
  }
`;

export {
  GET_ALL_GROUPS,
  GROUP_INFO,
  GET_CHAT_IN_GROUP,
  CHAT_IN_GROUP,
  REAL_TIME_CHAT_IN_GROUP,
  GROUP_USERS,
  LEAVE_GROUPS,
  JOIN_GROUPS,
};

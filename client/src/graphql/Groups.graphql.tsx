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
      Public_Id
      GroupCoverImage
      GroupName
      Administrators {
        _id
        Firstname
        Lastname
        Image
      }
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

const GROUP_USER_SUGGESTION = gql`
  query GroupUserSuggestion($groupUserSuggestionsGroupId: ID!) {
    GroupUserSuggestions(groupId: $groupUserSuggestionsGroupId) {
      _id
      Firstname
      Lastname
      Image
    }
  }
`;

const EXCLUDE_ADMIN_FROM_GROUP = gql`
  mutation ExcludeAdmin(
    $excludeAdminAdminId: ID!
    $adminRoleId: ID!
    $excludeAdminGroupId: ID!
  ) {
    ExcludeAdmin(
      adminId: $excludeAdminAdminId
      adminRoleId: $adminRoleId
      groupId: $excludeAdminGroupId
    ) {
      message
      success
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

const CREATE_GROUP = gql`
  mutation CreateGroup($createData: createData!, $file: Upload) {
    createGroup(createData: $createData, file: $file) {
      message
      success
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($adminId: ID!, $guestId: ID!, $addUserGroupId: ID!) {
    AddUser(adminId: $adminId, guestId: $guestId, groupId: $addUserGroupId) {
      message
      success
    }
  }
`;

const REMOVE_ADMIN_ROLE = gql`
  mutation RemoveAdminRole(
    $removeAdminRoleAdminId: ID!
    $removeAdminRoleUserId: ID!
    $removeAdminRoleGroupId: ID!
  ) {
    RemoveAdminRole(
      adminId: $removeAdminRoleAdminId
      userId: $removeAdminRoleUserId
      groupId: $removeAdminRoleGroupId
    ) {
      message
      success
    }
  }
`;

const Add_ADMIN_ROLE = gql`
  mutation AddAdminRole(
    $addAdminRoleAdminId: ID!
    $userId: ID!
    $addAdminRoleGroupId: ID!
  ) {
    AddAdminRole(
      adminId: $addAdminRoleAdminId
      userId: $userId
      groupId: $addAdminRoleGroupId
    ) {
      message
      success
    }
  }
`;

const EXCLUDE_USER_FROM_GROUP = gql`
  mutation ExcludeUser(
    $excludeUserAdminId: ID!
    $excludeUserGuestId: ID!
    $excludeUserGroupId: ID!
  ) {
    ExcludeUser(
      adminId: $excludeUserAdminId
      guestId: $excludeUserGuestId
      groupId: $excludeUserGroupId
    ) {
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
  CREATE_GROUP,
  ADD_USER,
  REMOVE_ADMIN_ROLE,
  Add_ADMIN_ROLE,
  EXCLUDE_USER_FROM_GROUP,
  GROUP_USER_SUGGESTION,
  EXCLUDE_ADMIN_FROM_GROUP,
};

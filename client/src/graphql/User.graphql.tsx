import { gql } from "@apollo/client";

/*-------------------->Queries<----------------------*/
const USER_CONNECTION = gql`
  query connection($connectionInfo: connectionInfo!) {
    Connection(connectionInfo: $connectionInfo) {
      message
      success
      token
    }
  }
`;

const USER_REGISTERATION = gql`
  mutation Registeration($registerInfo: registerInfo!) {
    Registeration(registerInfo: $registerInfo) {
      message
      success
      token
    }
  }
`;

const Get_UserData = gql`
  query userData($_id: ID!) {
    userData(_id: $_id) {
      _id
      Firstname
      Lastname
      Email
      Password
      Image
      DOB
      Sex
      Bio
    }
  }
`;

const ALL_USERS = gql`
  query AllUser($allUsersId: ID!) {
    allUsers(_id: $allUsersId) {
      _id
      Email
      Firstname
      Lastname
      Image
      Friends {
        _id
        RequestId
        AcceptedId
        User {
          _id
          Firstname
          Lastname
          Image
        }
        Receiver {
          _id
          Firstname
          Lastname
          Image
        }
      }
    }
  }
`;

const USER_STATISTICS = gql`
  query UserStatistics($userStaticsUserId: ID!) {
    userStatics(userID: $userStaticsUserId) {
      follower
      following
      posts {
        _id
        isGroup
        isSeen
        Title
        isRetweeted
        createdAt
        RetweetedPost {
          _id
          PostImage
          Title
          User {
            _id
            Firstname
            Lastname
            Image
          }
          createdAt
        }
        PostId
        PostImage
        PublicId
        User {
          _id
          Firstname
          Lastname
          Image
        }
      }
    }
  }
`;

/*-------------------->MUTATIONS<-----------------------*/
const CHANGE_USER_PROFILE = gql`
  mutation Change_User_Profile(
    $changeUserProfileFile: Upload!
    $changeUserProfileId: String!
  ) {
    ChangeUserProfile(file: $changeUserProfileFile, _id: $changeUserProfileId) {
      message
      success
    }
  }
`;

const CHANGE_COVER_IMAGE = gql`
  mutation Change_Cover($file: Upload!, $changeCoverId2: String!) {
    ChangeCover(file: $file, _id: $changeCoverId2) {
      message
      success
    }
  }
`;

const LOG_OUT = gql`
  mutation LogOut {
    LogOut {
      message
      success
    }
  }
`;

const ONLINE_OFFLINE_STATUS = gql`
  mutation OnlineOfflineStatus(
    $onlineOfflineStatusUserId: ID!
    $online: Boolean!
  ) {
    OnlineOfflineStatus(userId: $onlineOfflineStatusUserId, online: $online) {
      message
      success
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($userEmail: String!, $newPassword: String!) {
    ChangePassword(userEmail: $userEmail, newPassword: $newPassword) {
      message
      success
    }
  }
`;

const SEND_MAIL = gql`
  mutation SendMail($mail: Mail!, $code: String!) {
    SendMail(mail: $mail, code: $code) {
      message
      success
    }
  }
`;

export {
  USER_CONNECTION,
  USER_REGISTERATION,
  Get_UserData,
  CHANGE_USER_PROFILE,
  ALL_USERS,
  CHANGE_COVER_IMAGE,
  LOG_OUT,
  ONLINE_OFFLINE_STATUS,
  CHANGE_PASSWORD,
  SEND_MAIL,
  USER_STATISTICS,
};

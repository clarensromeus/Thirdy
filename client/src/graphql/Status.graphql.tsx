import { gql } from "@apollo/client";

/*--------------------->Queries<-------------------*/
const GET_USER_STATUS = gql`
  query GetUserStatus($getUserStatusUserId: ID!) {
    GetUserStatus(userId: $getUserStatusUserId) {
      UserId
      StatusId
      public_id
      Image
    }
  }
`;

const GET_FRIENDS_STATUS = gql`
  query GetFriendsStatus($friendsStatusUserId: ID!) {
    FriendsStatus(userId: $friendsStatusUserId) {
      UserId
      StatusId
      public_id
      Image
    }
  }
`;

/*------------------->Mutations<-------------------*/
const ADD_STATUS = gql`
  mutation AddStatus(
    $addStatusId: ID!
    $addStatusPicture: Upload!
    $addStatusUserId: ID!
  ) {
    AddStatus(
      _id: $addStatusId
      picture: $addStatusPicture
      userId: $addStatusUserId
    ) {
      message
      success
    }
  }
`;

const DELETE_STATUS = gql`
  mutation DELETE_STATUS($statusId: ID!, $deleteStatusUserId2: ID!) {
    DeleteStatus(StatusId: $statusId, userId: $deleteStatusUserId2) {
      message
      success
    }
  }
`;

export { ADD_STATUS, DELETE_STATUS, GET_FRIENDS_STATUS, GET_USER_STATUS };

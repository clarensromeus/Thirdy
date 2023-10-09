import { gql } from "@apollo/client";

const ALL_FRIEND_REQUESTS = gql`
  query allFriendsRequests($allFriendRequestsId: ID!) {
    allFriendRequests(_id: $allFriendRequestsId) {
      _id
      RequestId
      AcceptedId
      User {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const ALL_FRIENDS = gql`
  query AllFriends($FriendId: ID!) {
    AllFriends(_id: $FriendId) {
      _id
      RequestId
      AcceptedId
      Receiver {
        _id
        Firstname
        Lastname
        Image
      }
      User {
        _id
        Lastname
        Firstname
        Image
      }
    }
  }
`;

const RANDOM_FRIEND_REQUEST = gql`
  query RandomFriendRequest($acceptedId: ID!) {
    randomFriendRequest(AcceptedId: $acceptedId) {
      _id
      RequestId
      AcceptedId
      User {
        _id
        Image
        Firstname
        Lastname
      }
      createdAt
    }
  }
`;

const FRIEND_SUGGESTIONS = gql`
  query friendSuggestions($friendSuggestionsId: ID!) {
    FriendSuggestions(_id: $friendSuggestionsId) {
      _id
      Firstname
      Lastname
      Image
    }
  }
`;

const FOLLOW_FRIENDS = gql`
  mutation Follow($followRequestData: request!) {
    follow(requestData: $followRequestData) {
      message
      success
    }
  }
`;

const FOLLOW_FRIENDS_BACK = gql`
  mutation FollowBack(
    $AcceptedId: String!
    $FriendId: String!
    $userRequestId: ID!
  ) {
    followBack(
      AcceptedId: $AcceptedId
      friendId: $FriendId
      userRequestId: $userRequestId
    ) {
      message
      success
    }
  }
`;

const UNFOLLOW_FRIENDS = gql`
  mutation unFollow($unFollowUserId: ID!, $friendId: ID!, $unFollowId: ID) {
    unFollow(userId: $unFollowUserId, friendId: $friendId, _id: $unFollowId) {
      message
      success
    }
  }
`;

const REJECT_REQUEST = gql`
  mutation rejectRequest($rejectRequestFriendId: String!) {
    rejectRequest(friendId: $rejectRequestFriendId) {
      message
      success
    }
  }
`;

export {
  ALL_FRIEND_REQUESTS,
  FRIEND_SUGGESTIONS,
  FOLLOW_FRIENDS,
  FOLLOW_FRIENDS_BACK,
  ALL_FRIENDS,
  UNFOLLOW_FRIENDS,
  REJECT_REQUEST,
  RANDOM_FRIEND_REQUEST,
};

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
      createdAt
      User {
        _id
        Firstname
        Lastname
        Image
      }
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
  mutation unFollow($userId: ID!, $unFollowFriendId: ID!) {
    unFollow(userId: $userId, friendId: $unFollowFriendId) {
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
};

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.AllFriendsRequestsDocument,
    "\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.AllFriendsDocument,
    "\n  query friendSuggestions($friendSuggestionsId: ID!) {\n    FriendSuggestions(_id: $friendSuggestionsId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.FriendSuggestionsDocument,
    "\n  mutation Follow($followRequestData: request!) {\n    follow(requestData: $followRequestData) {\n      message\n      success\n    }\n  }\n": types.FollowDocument,
    "\n  mutation FollowBack($acceptedId: String!, $friendId: String!) {\n    followBack(AcceptedId: $acceptedId, friendId: $friendId) {\n      message\n      success\n    }\n  }\n": types.FollowBackDocument,
    "\n  mutation unFollow($userId: ID!, $unFollowFriendId: ID!) {\n    unFollow(userId: $userId, friendId: $unFollowFriendId) {\n      message\n      success\n    }\n  }\n": types.UnFollowDocument,
    "\n  mutation rejectRequest($rejectRequestFriendId: String!) {\n    rejectRequest(friendId: $rejectRequestFriendId) {\n      message\n      success\n    }\n  }\n": types.RejectRequestDocument,
    "\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      createdAt\n    }\n  }\n": types.GetAllGroupsDocument,
    "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.GroupInfoDocument,
    "\n  query GetAllPosts {\n    GetAllPosts {\n      _id\n      PostId\n      Title\n      PostImage\n      Comments {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      Likes {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  mutation Create_Post($postData: postEntries, $picture: Upload) {\n    CreatePost(postData: $postData, picture: $picture) {\n      message\n      success\n    }\n  }\n": types.Create_PostDocument,
    "\n  mutation Create_Likes($likesData: likesData!) {\n    PostLikes(likesData: $likesData) {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Create_LikesDocument,
    "\n  mutation Create_Comment($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      message\n      success\n    }\n  }\n": types.Create_CommentDocument,
    "\n  query connection($connectionInfo: connectionInfo!) {\n    Connection(connectionInfo: $connectionInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.ConnectionDocument,
    "\n  mutation Registeration($registerInfo: registerInfo!) {\n    Registeration(registerInfo: $registerInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.RegisterationDocument,
    "\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n": types.UserDataDocument,
    "\n  mutation Change_User_Profile($file: Upload!, $id: String!) {\n    ChangeProfile(file: $file, _id: $id) {\n      message\n      success\n    }\n  }\n": types.Change_User_ProfileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query friendSuggestions($friendSuggestionsId: ID!) {\n    FriendSuggestions(_id: $friendSuggestionsId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"): (typeof documents)["\n  query friendSuggestions($friendSuggestionsId: ID!) {\n    FriendSuggestions(_id: $friendSuggestionsId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Follow($followRequestData: request!) {\n    follow(requestData: $followRequestData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Follow($followRequestData: request!) {\n    follow(requestData: $followRequestData) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation FollowBack($acceptedId: String!, $friendId: String!) {\n    followBack(AcceptedId: $acceptedId, friendId: $friendId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation FollowBack($acceptedId: String!, $friendId: String!) {\n    followBack(AcceptedId: $acceptedId, friendId: $friendId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unFollow($userId: ID!, $unFollowFriendId: ID!) {\n    unFollow(userId: $userId, friendId: $unFollowFriendId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation unFollow($userId: ID!, $unFollowFriendId: ID!) {\n    unFollow(userId: $userId, friendId: $unFollowFriendId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation rejectRequest($rejectRequestFriendId: String!) {\n    rejectRequest(friendId: $rejectRequestFriendId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation rejectRequest($rejectRequestFriendId: String!) {\n    rejectRequest(friendId: $rejectRequestFriendId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPosts {\n    GetAllPosts {\n      _id\n      PostId\n      Title\n      PostImage\n      Comments {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      Likes {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllPosts {\n    GetAllPosts {\n      _id\n      PostId\n      Title\n      PostImage\n      Comments {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      Likes {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Create_Post($postData: postEntries, $picture: Upload) {\n    CreatePost(postData: $postData, picture: $picture) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Create_Post($postData: postEntries, $picture: Upload) {\n    CreatePost(postData: $postData, picture: $picture) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Create_Likes($likesData: likesData!) {\n    PostLikes(likesData: $likesData) {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Create_Likes($likesData: likesData!) {\n    PostLikes(likesData: $likesData) {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Create_Comment($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Create_Comment($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query connection($connectionInfo: connectionInfo!) {\n    Connection(connectionInfo: $connectionInfo) {\n      message\n      success\n      token\n    }\n  }\n"): (typeof documents)["\n  query connection($connectionInfo: connectionInfo!) {\n    Connection(connectionInfo: $connectionInfo) {\n      message\n      success\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Registeration($registerInfo: registerInfo!) {\n    Registeration(registerInfo: $registerInfo) {\n      message\n      success\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Registeration($registerInfo: registerInfo!) {\n    Registeration(registerInfo: $registerInfo) {\n      message\n      success\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n"): (typeof documents)["\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Change_User_Profile($file: Upload!, $id: String!) {\n    ChangeProfile(file: $file, _id: $id) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Change_User_Profile($file: Upload!, $id: String!) {\n    ChangeProfile(file: $file, _id: $id) {\n      message\n      success\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
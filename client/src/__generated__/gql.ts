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
    "\n  query userChats($chatUserInfo: chatUserInfo!) {\n    Chat(chatUserInfo: $chatUserInfo) {\n      _id\n      public_id\n      PicturedMessage\n      Chat\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.UserChatsDocument,
    "\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.InstantUserChatsDocument,
    "\n  mutation ChatWithFriends($chatInfo: chatInfo!) {\n    ChatWithFriends(chatInfo: $chatInfo) {\n      message\n      success\n    }\n  }\n": types.ChatWithFriendsDocument,
    "\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.AllFriendsRequestsDocument,
    "\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.AllFriendsDocument,
    "\n  query friendSuggestions($friendSuggestionsId: ID!) {\n    FriendSuggestions(_id: $friendSuggestionsId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.FriendSuggestionsDocument,
    "\n  mutation Follow($followRequestData: request!) {\n    follow(requestData: $followRequestData) {\n      message\n      success\n    }\n  }\n": types.FollowDocument,
    "\n  mutation FollowBack(\n    $AcceptedId: String!\n    $FriendId: String!\n    $userRequestId: ID!\n  ) {\n    followBack(\n      AcceptedId: $AcceptedId\n      friendId: $FriendId\n      userRequestId: $userRequestId\n    ) {\n      message\n      success\n    }\n  }\n": types.FollowBackDocument,
    "\n  mutation unFollow($userId: ID!, $unFollowFriendId: ID!) {\n    unFollow(userId: $userId, friendId: $unFollowFriendId) {\n      message\n      success\n    }\n  }\n": types.UnFollowDocument,
    "\n  mutation rejectRequest($rejectRequestFriendId: String!) {\n    rejectRequest(friendId: $rejectRequestFriendId) {\n      message\n      success\n    }\n  }\n": types.RejectRequestDocument,
    "\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n": types.GetAllGroupsDocument,
    "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n": types.GroupInfoDocument,
    "\n  query ChatInGroups($chatWithFriendsInGroupsGroupId: ID!) {\n    ChatWithFriendsInGroups(groupId: $chatWithFriendsInGroupsGroupId) {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n": types.ChatInGroupsDocument,
    "\n  query GroupUsers($groupUsersGroupName: String!, $groupUsersGroupId: ID!) {\n    GroupUsers(groupName: $groupUsersGroupName, groupId: $groupUsersGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.GroupUsersDocument,
    "\n  mutation JoinGroup($id: ID!, $groupId: ID!) {\n    JoinGroup(_id: $id, GroupId: $groupId) {\n      message\n      success\n    }\n  }\n": types.JoinGroupDocument,
    "\n  mutation LeaveGroup($leaveGroupId: ID!, $Id: ID!) {\n    LeaveGroup(_id: $Id, GroupId: $leaveGroupId) {\n      message\n      success\n    }\n  }\n": types.LeaveGroupDocument,
    "\n  mutation SendChatInGroup($dataFeed: dataFeed!) {\n    ChatWithFriendsInGroups(dataFeed: $dataFeed) {\n      message\n      success\n    }\n  }\n": types.SendChatInGroupDocument,
    "\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n": types.RealTimeChatInGroupDocument,
    "\n  query GetAllPosts {\n    GetAllPosts {\n      _id\n      PostId\n      Title\n      PostImage\n      Comments {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      Likes {\n        _id\n        PostId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  mutation Create_Post($postData: postEntries, $picture: Upload) {\n    CreatePost(postData: $postData, picture: $picture) {\n      message\n      success\n    }\n  }\n": types.Create_PostDocument,
    "\n  mutation Create_Likes($likesData: likesData!) {\n    PostLikes(likesData: $likesData) {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Create_LikesDocument,
    "\n  mutation Create_Comment($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      message\n      success\n    }\n  }\n": types.Create_CommentDocument,
    "\n  query connection($connectionInfo: connectionInfo!) {\n    Connection(connectionInfo: $connectionInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.ConnectionDocument,
    "\n  mutation Registeration($registerInfo: registerInfo!) {\n    Registeration(registerInfo: $registerInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.RegisterationDocument,
    "\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n": types.UserDataDocument,
    "\n  mutation Change_User_Profile($file: Upload!, $id: String!) {\n    ChangeProfile(file: $file, _id: $id) {\n      message\n      success\n    }\n  }\n": types.Change_User_ProfileDocument,
    "\n  query AllUser {\n    allUsers {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n": types.AllUserDocument,
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
export function gql(source: "\n  query userChats($chatUserInfo: chatUserInfo!) {\n    Chat(chatUserInfo: $chatUserInfo) {\n      _id\n      public_id\n      PicturedMessage\n      Chat\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query userChats($chatUserInfo: chatUserInfo!) {\n    Chat(chatUserInfo: $chatUserInfo) {\n      _id\n      public_id\n      PicturedMessage\n      Chat\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChatWithFriends($chatInfo: chatInfo!) {\n    ChatWithFriends(chatInfo: $chatInfo) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ChatWithFriends($chatInfo: chatInfo!) {\n    ChatWithFriends(chatInfo: $chatInfo) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  mutation FollowBack(\n    $AcceptedId: String!\n    $FriendId: String!\n    $userRequestId: ID!\n  ) {\n    followBack(\n      AcceptedId: $AcceptedId\n      friendId: $FriendId\n      userRequestId: $userRequestId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation FollowBack(\n    $AcceptedId: String!\n    $FriendId: String!\n    $userRequestId: ID!\n  ) {\n    followBack(\n      AcceptedId: $AcceptedId\n      friendId: $FriendId\n      userRequestId: $userRequestId\n    ) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      GroupName\n      GroupCoverImage\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ChatInGroups($chatWithFriendsInGroupsGroupId: ID!) {\n    ChatWithFriendsInGroups(groupId: $chatWithFriendsInGroupsGroupId) {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChatInGroups($chatWithFriendsInGroupsGroupId: ID!) {\n    ChatWithFriendsInGroups(groupId: $chatWithFriendsInGroupsGroupId) {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GroupUsers($groupUsersGroupName: String!, $groupUsersGroupId: ID!) {\n    GroupUsers(groupName: $groupUsersGroupName, groupId: $groupUsersGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"): (typeof documents)["\n  query GroupUsers($groupUsersGroupName: String!, $groupUsersGroupId: ID!) {\n    GroupUsers(groupName: $groupUsersGroupName, groupId: $groupUsersGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation JoinGroup($id: ID!, $groupId: ID!) {\n    JoinGroup(_id: $id, GroupId: $groupId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation JoinGroup($id: ID!, $groupId: ID!) {\n    JoinGroup(_id: $id, GroupId: $groupId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LeaveGroup($leaveGroupId: ID!, $Id: ID!) {\n    LeaveGroup(_id: $Id, GroupId: $leaveGroupId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation LeaveGroup($leaveGroupId: ID!, $Id: ID!) {\n    LeaveGroup(_id: $Id, GroupId: $leaveGroupId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendChatInGroup($dataFeed: dataFeed!) {\n    ChatWithFriendsInGroups(dataFeed: $dataFeed) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SendChatInGroup($dataFeed: dataFeed!) {\n    ChatWithFriendsInGroups(dataFeed: $dataFeed) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"];
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
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllUser {\n    allUsers {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllUser {\n    allUsers {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
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
    "\n  query UserFriendChat($userFriendChatUserId: ID!) {\n    UserFriendChat(userId: $userFriendChatUserId) {\n      _id\n      From {\n        _id\n      }\n      Chat\n      PicturedMessage\n      createdAt\n    }\n  }\n": types.UserFriendChatDocument,
    "\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.InstantUserChatsDocument,
    "\n  mutation ChatWithFriends(\n    $chatInfo: chatInfo!\n    $chatWithFriendsPicture: Upload\n  ) {\n    ChatWithFriends(chatInfo: $chatInfo, picture: $chatWithFriendsPicture) {\n      message\n      success\n    }\n  }\n": types.ChatWithFriendsDocument,
    "\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.AllFriendsRequestsDocument,
    "\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      Receiver {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      User {\n        _id\n        Lastname\n        Firstname\n        Image\n      }\n    }\n  }\n": types.AllFriendsDocument,
    "\n  query RandomFriendRequest($acceptedId: ID!) {\n    randomFriendRequest(AcceptedId: $acceptedId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Image\n        Firstname\n        Lastname\n      }\n      createdAt\n    }\n  }\n": types.RandomFriendRequestDocument,
    "\n  query friendSuggestions($friendSuggestionsId: ID!) {\n    FriendSuggestions(_id: $friendSuggestionsId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.FriendSuggestionsDocument,
    "\n  mutation Follow($followRequestData: request!) {\n    follow(requestData: $followRequestData) {\n      message\n      success\n    }\n  }\n": types.FollowDocument,
    "\n  mutation FollowBack(\n    $AcceptedId: String!\n    $FriendId: String!\n    $userRequestId: ID!\n  ) {\n    followBack(\n      AcceptedId: $AcceptedId\n      friendId: $FriendId\n      userRequestId: $userRequestId\n    ) {\n      message\n      success\n    }\n  }\n": types.FollowBackDocument,
    "\n  mutation unFollow($unFollowUserId: ID!, $friendId: ID!, $unFollowId: ID) {\n    unFollow(userId: $unFollowUserId, friendId: $friendId, _id: $unFollowId) {\n      message\n      success\n    }\n  }\n": types.UnFollowDocument,
    "\n  mutation rejectRequest($rejectRequestFriendId: String!) {\n    rejectRequest(friendId: $rejectRequestFriendId) {\n      message\n      success\n    }\n  }\n": types.RejectRequestDocument,
    "\n  query GetAllGroups {\n    GetAllGroups {\n      _id\n      GroupCoverImage\n      GroupName\n      Privacy\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n": types.GetAllGroupsDocument,
    "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      Public_Id\n      GroupCoverImage\n      GroupName\n      Administrators {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n\n      createdAt\n    }\n  }\n": types.GroupInfoDocument,
    "\n  query ChatInGroups($chatWithFriendsInGroupsGroupId: ID!) {\n    ChatWithFriendsInGroups(groupId: $chatWithFriendsInGroupsGroupId) {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n": types.ChatInGroupsDocument,
    "\n  query GroupUsers($groupUsersGroupName: String!, $groupUsersGroupId: ID!) {\n    GroupUsers(groupName: $groupUsersGroupName, groupId: $groupUsersGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.GroupUsersDocument,
    "\n  query GroupUserSuggestion($groupUserSuggestionsGroupId: ID!) {\n    GroupUserSuggestions(groupId: $groupUserSuggestionsGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n": types.GroupUserSuggestionDocument,
    "\n  mutation ExcludeAdmin(\n    $excludeAdminAdminId: ID!\n    $adminRoleId: ID!\n    $excludeAdminGroupId: ID!\n  ) {\n    ExcludeAdmin(\n      adminId: $excludeAdminAdminId\n      adminRoleId: $adminRoleId\n      groupId: $excludeAdminGroupId\n    ) {\n      message\n      success\n    }\n  }\n": types.ExcludeAdminDocument,
    "\n  mutation JoinGroup($id: ID!, $groupId: ID!) {\n    JoinGroup(_id: $id, GroupId: $groupId) {\n      message\n      success\n    }\n  }\n": types.JoinGroupDocument,
    "\n  mutation LeaveGroup($leaveGroupId: ID!, $Id: ID!) {\n    LeaveGroup(_id: $Id, GroupId: $leaveGroupId) {\n      message\n      success\n    }\n  }\n": types.LeaveGroupDocument,
    "\n  mutation SendChatInGroup($dataFeed: dataFeed!) {\n    ChatWithFriendsInGroups(dataFeed: $dataFeed) {\n      message\n      success\n    }\n  }\n": types.SendChatInGroupDocument,
    "\n  mutation CreateGroup($createData: createData!, $file: Upload) {\n    createGroup(createData: $createData, file: $file) {\n      message\n      success\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation AddUser($adminId: ID!, $guestId: ID!, $addUserGroupId: ID!) {\n    AddUser(adminId: $adminId, guestId: $guestId, groupId: $addUserGroupId) {\n      message\n      success\n    }\n  }\n": types.AddUserDocument,
    "\n  mutation RemoveAdminRole(\n    $removeAdminRoleAdminId: ID!\n    $removeAdminRoleUserId: ID!\n    $removeAdminRoleGroupId: ID!\n  ) {\n    RemoveAdminRole(\n      adminId: $removeAdminRoleAdminId\n      userId: $removeAdminRoleUserId\n      groupId: $removeAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n": types.RemoveAdminRoleDocument,
    "\n  mutation AddAdminRole(\n    $addAdminRoleAdminId: ID!\n    $userId: ID!\n    $addAdminRoleGroupId: ID!\n  ) {\n    AddAdminRole(\n      adminId: $addAdminRoleAdminId\n      userId: $userId\n      groupId: $addAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n": types.AddAdminRoleDocument,
    "\n  mutation ExcludeUser(\n    $excludeUserAdminId: ID!\n    $excludeUserGuestId: ID!\n    $excludeUserGroupId: ID!\n  ) {\n    ExcludeUser(\n      adminId: $excludeUserAdminId\n      guestId: $excludeUserGuestId\n      groupId: $excludeUserGroupId\n    ) {\n      message\n      success\n    }\n  }\n": types.ExcludeUserDocument,
    "\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n": types.RealTimeChatInGroupDocument,
    "\n  query GetUserNotifications {\n    GetNotifications {\n      _id\n      ReceiverId\n      isGroup\n      isSeen\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiImage\n        NotiText\n        FriendRequestID\n      }\n      NotiReference\n      createdAt\n    }\n  }\n": types.GetUserNotificationsDocument,
    "\n  mutation SendNotification($notiData: NotiData!) {\n    SendNotification(NotiData: $notiData) {\n      message\n      success\n    }\n  }\n": types.SendNotificationDocument,
    "\n  mutation DeleteNotification($notiId: ID!, $deleteNotificationUserId: ID!) {\n    DeleteNotification(NotiId: $notiId, userId: $deleteNotificationUserId) {\n      message\n      success\n    }\n  }\n": types.DeleteNotificationDocument,
    "\n  mutation Viewed_Notifications($notiId: [ID]) {\n    ViewedNotifications(NotiId: $notiId) {\n      message\n      success\n    }\n  }\n": types.Viewed_NotificationsDocument,
    "\n  subscription PushNotification {\n    SendNotification {\n      _id\n      isSeen\n      isGroup\n      ReceiverId\n      NotiReference\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiText\n        NotiImage\n      }\n      createdAt\n    }\n  }\n": types.PushNotificationDocument,
    "\n  query GetAllPosts($limit: Int!, $cursor: String) {\n    AllPosts(limit: $limit, cursor: $cursor) {\n      cursor\n      hasNextPage\n      Posts {\n        _id\n        PostId\n        Title\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        isGroup\n        isRetweeted\n        RetweetedRating {\n          _id\n        }\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          createdAt\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n        }\n        createdAt\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  query Post_Likes {\n    PostLikes {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Post_LikesDocument,
    "\n  query Single_Post($postId: ID!) {\n    SinglePost(PostId: $postId) {\n      _id\n      PostId\n      Title\n      PostImage\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n": types.Single_PostDocument,
    "\n  query Post_Comments {\n    PostComments {\n      _id\n      Body\n      PostId\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Post_CommentsDocument,
    "\n  mutation SharePostWith($shareData: shareData!) {\n    Share(shareData: $shareData) {\n      message\n      success\n    }\n  }\n": types.SharePostWithDocument,
    "\n  mutation SharePostWithGroup(\n    $retweetData: retweetData!\n    $groupInfo: GroupInfo\n  ) {\n    SharePostWithGroup(retweetData: $retweetData, GroupInfo: $groupInfo) {\n      message\n      success\n    }\n  }\n": types.SharePostWithGroupDocument,
    "\n  mutation RetweetPost($retweetData: retweetData!) {\n    Retweet(retweetData: $retweetData) {\n      message\n      success\n    }\n  }\n": types.RetweetPostDocument,
    "\n  mutation Create_Post($postData: postEntries, $picture: Upload) {\n    CreatePost(postData: $postData, picture: $picture) {\n      message\n      success\n    }\n  }\n": types.Create_PostDocument,
    "\n  mutation Create_Likes($likesData: likesData!) {\n    PostLikes(likesData: $likesData) {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Create_LikesDocument,
    "\n  mutation Create_Comments($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      _id\n      PostId\n      Body\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n": types.Create_CommentsDocument,
    "\n  mutation EditPost($editData: editPost!) {\n    EditPost(editData: $editData) {\n      message\n      success\n    }\n  }\n": types.EditPostDocument,
    "\n  mutation DeletePost($deletePostPostId: String!) {\n    DeletePost(PostId: $deletePostPostId) {\n      message\n      success\n    }\n  }\n": types.DeletePostDocument,
    "\n  query GetUserStatus($getUserStatusUserId: ID!) {\n    GetUserStatus(userId: $getUserStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n": types.GetUserStatusDocument,
    "\n  query GetFriendsStatus($friendsStatusUserId: ID!) {\n    FriendsStatus(userId: $friendsStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n": types.GetFriendsStatusDocument,
    "\n  mutation AddStatus(\n    $addStatusId: ID!\n    $addStatusPicture: Upload!\n    $addStatusUserId: ID!\n  ) {\n    AddStatus(\n      _id: $addStatusId\n      picture: $addStatusPicture\n      userId: $addStatusUserId\n    ) {\n      message\n      success\n    }\n  }\n": types.AddStatusDocument,
    "\n  mutation DELETE_STATUS($statusId: ID!, $deleteStatusUserId2: ID!) {\n    DeleteStatus(StatusId: $statusId, userId: $deleteStatusUserId2) {\n      message\n      success\n    }\n  }\n": types.Delete_StatusDocument,
    "\n  query connection($connectionInfo: connectionInfo!) {\n    Connection(connectionInfo: $connectionInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.ConnectionDocument,
    "\n  mutation Registeration($registerInfo: registerInfo!) {\n    Registeration(registerInfo: $registerInfo) {\n      message\n      success\n      token\n    }\n  }\n": types.RegisterationDocument,
    "\n  mutation RefreshToken {\n    RefreshToken {\n      message\n      success\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n": types.UserDataDocument,
    "\n  query AllUser($allUsersId: ID!) {\n    allUsers(_id: $allUsersId) {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n": types.AllUserDocument,
    "\n  query UserStatistics($userStaticsUserId: ID!) {\n    userStatics(userID: $userStaticsUserId) {\n      follower\n      following\n      UserInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n        Bio\n        Email\n        updatedAt\n      }\n      posts {\n        _id\n        isGroup\n        isSeen\n        Title\n        isRetweeted\n        createdAt\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n          createdAt\n        }\n        PostId\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n": types.UserStatisticsDocument,
    "\n  mutation Change_User_Profile(\n    $changeUserProfileFile: Upload!\n    $changeUserProfileId: String!\n  ) {\n    ChangeUserProfile(file: $changeUserProfileFile, _id: $changeUserProfileId) {\n      message\n      success\n    }\n  }\n": types.Change_User_ProfileDocument,
    "\n  mutation Change_Cover($file: Upload!, $changeCoverId2: String!) {\n    ChangeCover(file: $file, _id: $changeCoverId2) {\n      message\n      success\n    }\n  }\n": types.Change_CoverDocument,
    "\n  mutation LogOut {\n    LogOut {\n      message\n      success\n    }\n  }\n": types.LogOutDocument,
    "\n  mutation OnlineOfflineStatus(\n    $onlineOfflineStatusUserId: ID!\n    $online: Boolean!\n  ) {\n    OnlineOfflineStatus(userId: $onlineOfflineStatusUserId, online: $online) {\n      message\n      success\n    }\n  }\n": types.OnlineOfflineStatusDocument,
    "\n  mutation ChangePassword($userEmail: String!, $newPassword: String!) {\n    ChangePassword(userEmail: $userEmail, newPassword: $newPassword) {\n      message\n      success\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation SendMail($mail: Mail!, $code: String!) {\n    SendMail(mail: $mail, code: $code) {\n      message\n      success\n    }\n  }\n": types.SendMailDocument,
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
export function gql(source: "\n  query UserFriendChat($userFriendChatUserId: ID!) {\n    UserFriendChat(userId: $userFriendChatUserId) {\n      _id\n      From {\n        _id\n      }\n      Chat\n      PicturedMessage\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query UserFriendChat($userFriendChatUserId: ID!) {\n    UserFriendChat(userId: $userFriendChatUserId) {\n      _id\n      From {\n        _id\n      }\n      Chat\n      PicturedMessage\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription InstantUserChats {\n    Chat {\n      _id\n      Chat\n      PicturedMessage\n      public_id\n      createdAt\n      To {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChatWithFriends(\n    $chatInfo: chatInfo!\n    $chatWithFriendsPicture: Upload\n  ) {\n    ChatWithFriends(chatInfo: $chatInfo, picture: $chatWithFriendsPicture) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ChatWithFriends(\n    $chatInfo: chatInfo!\n    $chatWithFriendsPicture: Upload\n  ) {\n    ChatWithFriends(chatInfo: $chatInfo, picture: $chatWithFriendsPicture) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query allFriendsRequests($allFriendRequestsId: ID!) {\n    allFriendRequests(_id: $allFriendRequestsId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      Receiver {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      User {\n        _id\n        Lastname\n        Firstname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllFriends($FriendId: ID!) {\n    AllFriends(_id: $FriendId) {\n      _id\n      RequestId\n      AcceptedId\n      Receiver {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      User {\n        _id\n        Lastname\n        Firstname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RandomFriendRequest($acceptedId: ID!) {\n    randomFriendRequest(AcceptedId: $acceptedId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Image\n        Firstname\n        Lastname\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query RandomFriendRequest($acceptedId: ID!) {\n    randomFriendRequest(AcceptedId: $acceptedId) {\n      _id\n      RequestId\n      AcceptedId\n      User {\n        _id\n        Image\n        Firstname\n        Lastname\n      }\n      createdAt\n    }\n  }\n"];
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
export function gql(source: "\n  mutation unFollow($unFollowUserId: ID!, $friendId: ID!, $unFollowId: ID) {\n    unFollow(userId: $unFollowUserId, friendId: $friendId, _id: $unFollowId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation unFollow($unFollowUserId: ID!, $friendId: ID!, $unFollowId: ID) {\n    unFollow(userId: $unFollowUserId, friendId: $friendId, _id: $unFollowId) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      Public_Id\n      GroupCoverImage\n      GroupName\n      Administrators {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GroupInfo($groupName: String!, $groupId: ID!) {\n    GroupInfo(groupName: $groupName, groupId: $groupId) {\n      _id\n      Public_Id\n      GroupCoverImage\n      GroupName\n      Administrators {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      GroupUsers {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n\n      createdAt\n    }\n  }\n"];
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
export function gql(source: "\n  query GroupUserSuggestion($groupUserSuggestionsGroupId: ID!) {\n    GroupUserSuggestions(groupId: $groupUserSuggestionsGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"): (typeof documents)["\n  query GroupUserSuggestion($groupUserSuggestionsGroupId: ID!) {\n    GroupUserSuggestions(groupId: $groupUserSuggestionsGroupId) {\n      _id\n      Firstname\n      Lastname\n      Image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ExcludeAdmin(\n    $excludeAdminAdminId: ID!\n    $adminRoleId: ID!\n    $excludeAdminGroupId: ID!\n  ) {\n    ExcludeAdmin(\n      adminId: $excludeAdminAdminId\n      adminRoleId: $adminRoleId\n      groupId: $excludeAdminGroupId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ExcludeAdmin(\n    $excludeAdminAdminId: ID!\n    $adminRoleId: ID!\n    $excludeAdminGroupId: ID!\n  ) {\n    ExcludeAdmin(\n      adminId: $excludeAdminAdminId\n      adminRoleId: $adminRoleId\n      groupId: $excludeAdminGroupId\n    ) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  mutation CreateGroup($createData: createData!, $file: Upload) {\n    createGroup(createData: $createData, file: $file) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGroup($createData: createData!, $file: Upload) {\n    createGroup(createData: $createData, file: $file) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUser($adminId: ID!, $guestId: ID!, $addUserGroupId: ID!) {\n    AddUser(adminId: $adminId, guestId: $guestId, groupId: $addUserGroupId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($adminId: ID!, $guestId: ID!, $addUserGroupId: ID!) {\n    AddUser(adminId: $adminId, guestId: $guestId, groupId: $addUserGroupId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveAdminRole(\n    $removeAdminRoleAdminId: ID!\n    $removeAdminRoleUserId: ID!\n    $removeAdminRoleGroupId: ID!\n  ) {\n    RemoveAdminRole(\n      adminId: $removeAdminRoleAdminId\n      userId: $removeAdminRoleUserId\n      groupId: $removeAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveAdminRole(\n    $removeAdminRoleAdminId: ID!\n    $removeAdminRoleUserId: ID!\n    $removeAdminRoleGroupId: ID!\n  ) {\n    RemoveAdminRole(\n      adminId: $removeAdminRoleAdminId\n      userId: $removeAdminRoleUserId\n      groupId: $removeAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddAdminRole(\n    $addAdminRoleAdminId: ID!\n    $userId: ID!\n    $addAdminRoleGroupId: ID!\n  ) {\n    AddAdminRole(\n      adminId: $addAdminRoleAdminId\n      userId: $userId\n      groupId: $addAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation AddAdminRole(\n    $addAdminRoleAdminId: ID!\n    $userId: ID!\n    $addAdminRoleGroupId: ID!\n  ) {\n    AddAdminRole(\n      adminId: $addAdminRoleAdminId\n      userId: $userId\n      groupId: $addAdminRoleGroupId\n    ) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ExcludeUser(\n    $excludeUserAdminId: ID!\n    $excludeUserGuestId: ID!\n    $excludeUserGroupId: ID!\n  ) {\n    ExcludeUser(\n      adminId: $excludeUserAdminId\n      guestId: $excludeUserGuestId\n      groupId: $excludeUserGroupId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ExcludeUser(\n    $excludeUserAdminId: ID!\n    $excludeUserGuestId: ID!\n    $excludeUserGroupId: ID!\n  ) {\n    ExcludeUser(\n      adminId: $excludeUserAdminId\n      guestId: $excludeUserGuestId\n      groupId: $excludeUserGroupId\n    ) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription RealTimeChatInGroup {\n    ChatWithFriendsInGroups {\n      _id\n      Chat\n      public_id\n      PicturedMessage\n      ChatPlacement\n      createdAt\n      From {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      To {\n        _id\n        GroupName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserNotifications {\n    GetNotifications {\n      _id\n      ReceiverId\n      isGroup\n      isSeen\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiImage\n        NotiText\n        FriendRequestID\n      }\n      NotiReference\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetUserNotifications {\n    GetNotifications {\n      _id\n      ReceiverId\n      isGroup\n      isSeen\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiImage\n        NotiText\n        FriendRequestID\n      }\n      NotiReference\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendNotification($notiData: NotiData!) {\n    SendNotification(NotiData: $notiData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SendNotification($notiData: NotiData!) {\n    SendNotification(NotiData: $notiData) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteNotification($notiId: ID!, $deleteNotificationUserId: ID!) {\n    DeleteNotification(NotiId: $notiId, userId: $deleteNotificationUserId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteNotification($notiId: ID!, $deleteNotificationUserId: ID!) {\n    DeleteNotification(NotiId: $notiId, userId: $deleteNotificationUserId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Viewed_Notifications($notiId: [ID]) {\n    ViewedNotifications(NotiId: $notiId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Viewed_Notifications($notiId: [ID]) {\n    ViewedNotifications(NotiId: $notiId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription PushNotification {\n    SendNotification {\n      _id\n      isSeen\n      isGroup\n      ReceiverId\n      NotiReference\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiText\n        NotiImage\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription PushNotification {\n    SendNotification {\n      _id\n      isSeen\n      isGroup\n      ReceiverId\n      NotiReference\n      SenderInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      NotiEngine {\n        GroupName\n        NotiText\n        NotiImage\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPosts($limit: Int!, $cursor: String) {\n    AllPosts(limit: $limit, cursor: $cursor) {\n      cursor\n      hasNextPage\n      Posts {\n        _id\n        PostId\n        Title\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        isGroup\n        isRetweeted\n        RetweetedRating {\n          _id\n        }\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          createdAt\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPosts($limit: Int!, $cursor: String) {\n    AllPosts(limit: $limit, cursor: $cursor) {\n      cursor\n      hasNextPage\n      Posts {\n        _id\n        PostId\n        Title\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        isGroup\n        isRetweeted\n        RetweetedRating {\n          _id\n        }\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          createdAt\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Post_Likes {\n    PostLikes {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query Post_Likes {\n    PostLikes {\n      _id\n      PostId\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Single_Post($postId: ID!) {\n    SinglePost(PostId: $postId) {\n      _id\n      PostId\n      Title\n      PostImage\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Single_Post($postId: ID!) {\n    SinglePost(PostId: $postId) {\n      _id\n      PostId\n      Title\n      PostImage\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Post_Comments {\n    PostComments {\n      _id\n      Body\n      PostId\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  query Post_Comments {\n    PostComments {\n      _id\n      Body\n      PostId\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SharePostWith($shareData: shareData!) {\n    Share(shareData: $shareData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SharePostWith($shareData: shareData!) {\n    Share(shareData: $shareData) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SharePostWithGroup(\n    $retweetData: retweetData!\n    $groupInfo: GroupInfo\n  ) {\n    SharePostWithGroup(retweetData: $retweetData, GroupInfo: $groupInfo) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SharePostWithGroup(\n    $retweetData: retweetData!\n    $groupInfo: GroupInfo\n  ) {\n    SharePostWithGroup(retweetData: $retweetData, GroupInfo: $groupInfo) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RetweetPost($retweetData: retweetData!) {\n    Retweet(retweetData: $retweetData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RetweetPost($retweetData: retweetData!) {\n    Retweet(retweetData: $retweetData) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  mutation Create_Comments($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      _id\n      PostId\n      Body\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Create_Comments($commentsData: commentsData!) {\n    PostComments(commentsData: $commentsData) {\n      _id\n      PostId\n      Body\n      CommentReference\n      createdAt\n      User {\n        _id\n        Firstname\n        Lastname\n        Image\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditPost($editData: editPost!) {\n    EditPost(editData: $editData) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation EditPost($editData: editPost!) {\n    EditPost(editData: $editData) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePost($deletePostPostId: String!) {\n    DeletePost(PostId: $deletePostPostId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($deletePostPostId: String!) {\n    DeletePost(PostId: $deletePostPostId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserStatus($getUserStatusUserId: ID!) {\n    GetUserStatus(userId: $getUserStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n"): (typeof documents)["\n  query GetUserStatus($getUserStatusUserId: ID!) {\n    GetUserStatus(userId: $getUserStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFriendsStatus($friendsStatusUserId: ID!) {\n    FriendsStatus(userId: $friendsStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n"): (typeof documents)["\n  query GetFriendsStatus($friendsStatusUserId: ID!) {\n    FriendsStatus(userId: $friendsStatusUserId) {\n      UserId\n      StatusId\n      public_id\n      Image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddStatus(\n    $addStatusId: ID!\n    $addStatusPicture: Upload!\n    $addStatusUserId: ID!\n  ) {\n    AddStatus(\n      _id: $addStatusId\n      picture: $addStatusPicture\n      userId: $addStatusUserId\n    ) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation AddStatus(\n    $addStatusId: ID!\n    $addStatusPicture: Upload!\n    $addStatusUserId: ID!\n  ) {\n    AddStatus(\n      _id: $addStatusId\n      picture: $addStatusPicture\n      userId: $addStatusUserId\n    ) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DELETE_STATUS($statusId: ID!, $deleteStatusUserId2: ID!) {\n    DeleteStatus(StatusId: $statusId, userId: $deleteStatusUserId2) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DELETE_STATUS($statusId: ID!, $deleteStatusUserId2: ID!) {\n    DeleteStatus(StatusId: $statusId, userId: $deleteStatusUserId2) {\n      message\n      success\n    }\n  }\n"];
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
export function gql(source: "\n  mutation RefreshToken {\n    RefreshToken {\n      message\n      success\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken {\n    RefreshToken {\n      message\n      success\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n"): (typeof documents)["\n  query userData($_id: ID!) {\n    userData(_id: $_id) {\n      _id\n      Firstname\n      Lastname\n      Email\n      Password\n      Image\n      DOB\n      Sex\n      Bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllUser($allUsersId: ID!) {\n    allUsers(_id: $allUsersId) {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllUser($allUsersId: ID!) {\n    allUsers(_id: $allUsersId) {\n      _id\n      Email\n      Firstname\n      Lastname\n      Image\n      Friends {\n        _id\n        RequestId\n        AcceptedId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n        Receiver {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserStatistics($userStaticsUserId: ID!) {\n    userStatics(userID: $userStaticsUserId) {\n      follower\n      following\n      UserInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n        Bio\n        Email\n        updatedAt\n      }\n      posts {\n        _id\n        isGroup\n        isSeen\n        Title\n        isRetweeted\n        createdAt\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n          createdAt\n        }\n        PostId\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserStatistics($userStaticsUserId: ID!) {\n    userStatics(userID: $userStaticsUserId) {\n      follower\n      following\n      UserInfo {\n        _id\n        Firstname\n        Lastname\n        Image\n        Bio\n        Email\n        updatedAt\n      }\n      posts {\n        _id\n        isGroup\n        isSeen\n        Title\n        isRetweeted\n        createdAt\n        RetweetedPost {\n          _id\n          PostImage\n          Title\n          User {\n            _id\n            Firstname\n            Lastname\n            Image\n          }\n          createdAt\n        }\n        PostId\n        PostImage\n        PublicId\n        User {\n          _id\n          Firstname\n          Lastname\n          Image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Change_User_Profile(\n    $changeUserProfileFile: Upload!\n    $changeUserProfileId: String!\n  ) {\n    ChangeUserProfile(file: $changeUserProfileFile, _id: $changeUserProfileId) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Change_User_Profile(\n    $changeUserProfileFile: Upload!\n    $changeUserProfileId: String!\n  ) {\n    ChangeUserProfile(file: $changeUserProfileFile, _id: $changeUserProfileId) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Change_Cover($file: Upload!, $changeCoverId2: String!) {\n    ChangeCover(file: $file, _id: $changeCoverId2) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Change_Cover($file: Upload!, $changeCoverId2: String!) {\n    ChangeCover(file: $file, _id: $changeCoverId2) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogOut {\n    LogOut {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation LogOut {\n    LogOut {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation OnlineOfflineStatus(\n    $onlineOfflineStatusUserId: ID!\n    $online: Boolean!\n  ) {\n    OnlineOfflineStatus(userId: $onlineOfflineStatusUserId, online: $online) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation OnlineOfflineStatus(\n    $onlineOfflineStatusUserId: ID!\n    $online: Boolean!\n  ) {\n    OnlineOfflineStatus(userId: $onlineOfflineStatusUserId, online: $online) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangePassword($userEmail: String!, $newPassword: String!) {\n    ChangePassword(userEmail: $userEmail, newPassword: $newPassword) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($userEmail: String!, $newPassword: String!) {\n    ChangePassword(userEmail: $userEmail, newPassword: $newPassword) {\n      message\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMail($mail: Mail!, $code: String!) {\n    SendMail(mail: $mail, code: $code) {\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SendMail($mail: Mail!, $code: String!) {\n    SendMail(mail: $mail, code: $code) {\n      message\n      success\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
  /** objectid custom scalar type */
  _id: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ChatsIngroup = {
  __typename?: 'ChatsIngroup';
  Chat?: Maybe<Scalars['String']['output']>;
  ChatPlacement: Scalars['Int']['output'];
  From?: Maybe<User>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  To?: Maybe<GroupData>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  public_id?: Maybe<Scalars['String']['output']>;
};

export type Comments = {
  __typename?: 'Comments';
  Body?: Maybe<Scalars['String']['output']>;
  CommentReference?: Maybe<Scalars['String']['output']>;
  PostId?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type Engine = {
  __typename?: 'Engine';
  GroupName?: Maybe<Scalars['String']['output']>;
  NotiImage?: Maybe<Scalars['String']['output']>;
  NotiText?: Maybe<Scalars['String']['output']>;
};

export type File = {
  __typename?: 'File';
  serverUrl: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GroupInfo = {
  GroupId: Array<Scalars['ID']['input']>;
  GroupName?: InputMaybe<Scalars['String']['input']>;
  sharedPostId: Scalars['ID']['input'];
};

export type Likes = {
  __typename?: 'Likes';
  PostId?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
};

export type Mail = {
  DESTINATION: Scalars['String']['input'];
  HTMLBODY: Scalars['String']['input'];
  MESSAGE: Scalars['String']['input'];
  SUBJECT?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddAdminRole?: Maybe<GroupResponse>;
  AddStatus?: Maybe<StatusResponse>;
  AddUser?: Maybe<GroupResponse>;
  ChangeCover?: Maybe<UploadResponse>;
  ChangePassword?: Maybe<Response>;
  ChangeUserProfile?: Maybe<UploadResponse>;
  ChatWithFriends?: Maybe<MessageResponse>;
  ChatWithFriendsInGroups?: Maybe<GroupResponse>;
  CreatePost: PostResponse;
  DeleteNotification?: Maybe<NotiResponse>;
  DeletePost: PostResponse;
  DeleteStatus?: Maybe<StatusResponse>;
  EditPost: PostResponse;
  ExcludeAdmin?: Maybe<GroupResponse>;
  ExcludeUser?: Maybe<GroupResponse>;
  JoinGroup?: Maybe<GroupResponse>;
  LeaveGroup?: Maybe<GroupResponse>;
  LogOut?: Maybe<Response>;
  OnlineOfflineStatus?: Maybe<Response>;
  PostComments?: Maybe<Comments>;
  PostLikes?: Maybe<Likes>;
  Registeration: Response;
  RemoveAdminRole?: Maybe<GroupResponse>;
  Retweet: PostResponse;
  SendMail: Response;
  SendNotification?: Maybe<NotiResponse>;
  Share?: Maybe<PostResponse>;
  SharePostWithGroup?: Maybe<PostResponse>;
  User?: Maybe<PostResponse>;
  ViewedNotifications?: Maybe<NotiResponse>;
  _?: Maybe<Scalars['String']['output']>;
  createGroup?: Maybe<GroupResponse>;
  follow: FriendResponse;
  followBack?: Maybe<FriendResponse>;
  rejectRequest?: Maybe<FriendResponse>;
  singleUpload?: Maybe<File>;
  unFollow?: Maybe<FriendResponse>;
};


export type MutationAddAdminRoleArgs = {
  adminId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddStatusArgs = {
  _id: Scalars['ID']['input'];
  picture: Scalars['Upload']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddUserArgs = {
  adminId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  guestId: Scalars['ID']['input'];
};


export type MutationChangeCoverArgs = {
  _id: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationChangeUserProfileArgs = {
  _id: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationChatWithFriendsArgs = {
  chatInfo: ChatInfo;
  picture?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationChatWithFriendsInGroupsArgs = {
  dataFeed: DataFeed;
  picture?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationCreatePostArgs = {
  picture?: InputMaybe<Scalars['Upload']['input']>;
  postData?: InputMaybe<PostEntries>;
};


export type MutationDeleteNotificationArgs = {
  NotiId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  PostId: Scalars['String']['input'];
};


export type MutationDeleteStatusArgs = {
  StatusId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationEditPostArgs = {
  editData: EditPost;
};


export type MutationExcludeAdminArgs = {
  adminId: Scalars['ID']['input'];
  adminRoleId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationExcludeUserArgs = {
  adminId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  guestId: Scalars['ID']['input'];
};


export type MutationJoinGroupArgs = {
  GroupId: Scalars['ID']['input'];
  _id: Scalars['ID']['input'];
};


export type MutationLeaveGroupArgs = {
  GroupId: Scalars['ID']['input'];
  _id: Scalars['ID']['input'];
};


export type MutationOnlineOfflineStatusArgs = {
  online: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationPostCommentsArgs = {
  commentsData: CommentsData;
};


export type MutationPostLikesArgs = {
  likesData: LikesData;
};


export type MutationRegisterationArgs = {
  registerInfo: RegisterInfo;
};


export type MutationRemoveAdminRoleArgs = {
  adminId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRetweetArgs = {
  retweetData: RetweetData;
};


export type MutationSendMailArgs = {
  code: Scalars['String']['input'];
  mail: Mail;
};


export type MutationSendNotificationArgs = {
  NotiData: NotiData;
};


export type MutationShareArgs = {
  picture?: InputMaybe<Scalars['Upload']['input']>;
  shareData: ShareData;
};


export type MutationSharePostWithGroupArgs = {
  GroupInfo?: InputMaybe<GroupInfo>;
  retweetData: RetweetData;
};


export type MutationUserArgs = {
  Online?: InputMaybe<OnlineUser>;
};


export type MutationViewedNotificationsArgs = {
  NotiId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type MutationCreateGroupArgs = {
  createData: CreateData;
  file?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationFollowArgs = {
  requestData: Request;
};


export type MutationFollowBackArgs = {
  AcceptedId: Scalars['String']['input'];
  friendId: Scalars['String']['input'];
  userRequestId: Scalars['ID']['input'];
};


export type MutationRejectRequestArgs = {
  friendId: Scalars['String']['input'];
};


export type MutationSingleUploadArgs = {
  Email: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUnFollowArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  friendId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type NotiData = {
  NotiEngine?: InputMaybe<NotiEngine>;
  NotiReference?: InputMaybe<Scalars['String']['input']>;
  ReceiverId?: InputMaybe<Scalars['_id']['input']>;
  SenderInfo?: InputMaybe<Scalars['_id']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  isSeen?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NotiResponse = {
  __typename?: 'NotiResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Notifications = {
  __typename?: 'Notifications';
  NotiEngine?: Maybe<Engine>;
  NotiReference?: Maybe<Scalars['String']['output']>;
  ReceiverId?: Maybe<Scalars['String']['output']>;
  SenderInfo?: Maybe<User>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  isGroup: Scalars['Boolean']['output'];
  isSeen?: Maybe<Scalars['Boolean']['output']>;
};

export type OnlineUser = {
  status?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vocation?: InputMaybe<Scalars['String']['input']>;
};

export type PostInfo = {
  __typename?: 'PostInfo';
  PostId: Scalars['String']['output'];
  PostImage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  RetweetedPost?: Maybe<RetweetedPost>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  isRetweeted?: Maybe<Scalars['Boolean']['output']>;
};

export type Posts = {
  __typename?: 'Posts';
  PostId?: Maybe<Scalars['String']['output']>;
  PostImage?: Maybe<Scalars['String']['output']>;
  Posts?: Maybe<Array<PostInfo>>;
  PublicId?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  AllFriends?: Maybe<Array<Friends>>;
  AllPosts: Posts;
  Chat?: Maybe<Array<Maybe<ChatResponse>>>;
  ChatWithFriendsInGroups?: Maybe<Array<Maybe<ChatsIngroup>>>;
  Connection: Response;
  FriendRequest?: Maybe<Friends>;
  FriendSuggestions?: Maybe<Array<Maybe<Suggestions>>>;
  FriendsStatus: Array<Maybe<Status>>;
  GetAllGroups?: Maybe<Array<GroupData>>;
  GetChatFriends?: Maybe<Array<ListOfFriends>>;
  GetNotifications?: Maybe<Array<Notifications>>;
  GetUserStatus: Array<Maybe<Status>>;
  GroupInfo?: Maybe<GroupData>;
  GroupUserSuggestions?: Maybe<Array<Maybe<User>>>;
  GroupUsers?: Maybe<Array<Maybe<User>>>;
  MutualFriends?: Maybe<Array<Maybe<Friends>>>;
  PostComments: Array<Comments>;
  PostLikes: Array<Likes>;
  SinglePost?: Maybe<PostInfo>;
  TestUser?: Maybe<User>;
  UserFriendChat?: Maybe<Array<Maybe<FriendChat>>>;
  _?: Maybe<Scalars['String']['output']>;
  allFriendRequests?: Maybe<Array<Friends>>;
  allUsers?: Maybe<Array<Maybe<AllUser>>>;
  hello: Scalars['String']['output'];
  randomFriendRequest?: Maybe<Friends>;
  uploads?: Maybe<Scalars['String']['output']>;
  userData?: Maybe<UserInfo>;
  userStatics?: Maybe<Statics>;
};


export type QueryAllFriendsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryAllPostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryChatArgs = {
  chatUserInfo: ChatUserInfo;
};


export type QueryChatWithFriendsInGroupsArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryConnectionArgs = {
  connectionInfo: ConnectionInfo;
};


export type QueryFriendRequestArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFriendSuggestionsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryFriendsStatusArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetChatFriendsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserStatusArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGroupInfoArgs = {
  groupId: Scalars['ID']['input'];
  groupName: Scalars['String']['input'];
};


export type QueryGroupUserSuggestionsArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGroupUsersArgs = {
  groupId: Scalars['ID']['input'];
  groupName: Scalars['String']['input'];
};


export type QueryMutualFriendsArgs = {
  friendId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QuerySinglePostArgs = {
  PostId: Scalars['ID']['input'];
};


export type QueryUserFriendChatArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryAllFriendRequestsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryAllUsersArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryRandomFriendRequestArgs = {
  AcceptedId: Scalars['ID']['input'];
};


export type QueryUserDataArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserStaticsArgs = {
  userID: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Statics = {
  __typename?: 'Statics';
  follower?: Maybe<Scalars['Int']['output']>;
  following?: Maybe<Scalars['Int']['output']>;
  posts: Scalars['Int']['output'];
};

export type Status = {
  __typename?: 'Status';
  Image?: Maybe<Scalars['String']['output']>;
  StatusId?: Maybe<Scalars['ID']['output']>;
  UserId?: Maybe<Scalars['ID']['output']>;
  public_id?: Maybe<Scalars['ID']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  Chat?: Maybe<ChatResponse>;
  ChatWithFriendsInGroups?: Maybe<ChatsIngroup>;
  SendNotification?: Maybe<Notifications>;
  _?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  Bio?: Maybe<Scalars['String']['output']>;
  DOB?: Maybe<Scalars['String']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  Firstname?: Maybe<Scalars['String']['output']>;
  Image?: Maybe<Scalars['String']['output']>;
  Lastname?: Maybe<Scalars['String']['output']>;
  Sex?: Maybe<Scalars['String']['output']>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AllUser = {
  __typename?: 'allUser';
  Email?: Maybe<Scalars['String']['output']>;
  Firstname: Scalars['String']['output'];
  Friends?: Maybe<Array<Maybe<Friend>>>;
  Image?: Maybe<Scalars['String']['output']>;
  Lastname: Scalars['String']['output'];
  _id?: Maybe<Scalars['_id']['output']>;
};

export type ChatFilter = {
  activeUser: Scalars['ID']['input'];
  friendId: Scalars['ID']['input'];
};

export type ChatInfo = {
  Chat?: InputMaybe<Scalars['String']['input']>;
  From: Scalars['ID']['input'];
  To: Scalars['ID']['input'];
};

export type ChatResponse = {
  __typename?: 'chatResponse';
  Chat?: Maybe<Scalars['String']['output']>;
  From?: Maybe<User>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  To?: Maybe<User>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  public_id?: Maybe<Scalars['String']['output']>;
};

export type ChatUserInfo = {
  activeUserId: Scalars['ID']['input'];
  friendId: Scalars['ID']['input'];
};

export type CommentsData = {
  Body: Scalars['String']['input'];
  CommentReference: Scalars['String']['input'];
  PostId: Scalars['String']['input'];
  User: Scalars['String']['input'];
};

export type ConnectionInfo = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Password: Scalars['String']['input'];
  Username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateData = {
  Administrators?: InputMaybe<Array<Scalars['ID']['input']>>;
  GroupName: Scalars['String']['input'];
  Privacy: Scalars['String']['input'];
  Users?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type DataFeed = {
  Chat?: InputMaybe<Scalars['ID']['input']>;
  ChatPlacement: Scalars['Int']['input'];
  From: Scalars['ID']['input'];
  GroupId: Scalars['ID']['input'];
  To: Scalars['ID']['input'];
};

export type EditPost = {
  Picture?: InputMaybe<Scalars['Upload']['input']>;
  PostId: Scalars['String']['input'];
  Title?: InputMaybe<Scalars['String']['input']>;
};

export type Friend = {
  __typename?: 'friend';
  AcceptedId?: Maybe<Scalars['String']['output']>;
  Receiver?: Maybe<User>;
  RequestId?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
};

export type FriendChat = {
  __typename?: 'friendChat';
  Chat?: Maybe<Scalars['String']['output']>;
  From?: Maybe<User>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type FriendResponse = {
  __typename?: 'friendResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Friends = {
  __typename?: 'friends';
  AcceptedId?: Maybe<Scalars['ID']['output']>;
  Receiver?: Maybe<User>;
  RequestId?: Maybe<Scalars['ID']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type GroupData = {
  __typename?: 'groupData';
  Administrators?: Maybe<Array<Maybe<User>>>;
  GroupCoverImage?: Maybe<Scalars['String']['output']>;
  GroupName?: Maybe<Scalars['String']['output']>;
  GroupUsers?: Maybe<Array<Maybe<User>>>;
  Privacy?: Maybe<Scalars['String']['output']>;
  Public_Id?: Maybe<Scalars['String']['output']>;
  _id: Scalars['_id']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type GroupResponse = {
  __typename?: 'groupResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LikesData = {
  PostId: Scalars['String']['input'];
  Preference: Scalars['String']['input'];
  User: Scalars['ID']['input'];
};

export type ListOfFriends = {
  __typename?: 'listOfFriends';
  AcceptedId?: Maybe<Scalars['String']['output']>;
  RequestId?: Maybe<Scalars['String']['output']>;
  User: User;
  _id: Scalars['_id']['output'];
};

export type MessageResponse = {
  __typename?: 'messageResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type NotiEngine = {
  GroupName?: InputMaybe<Scalars['String']['input']>;
  NotiImage?: InputMaybe<Scalars['String']['input']>;
  NotiText?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Online = {
  __typename?: 'online';
  status?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  vocation?: Maybe<Scalars['String']['output']>;
};

export type PostEntries = {
  PostId: Scalars['String']['input'];
  PostReference: Scalars['String']['input'];
  RetweetedPost?: InputMaybe<Scalars['_id']['input']>;
  Title?: InputMaybe<Scalars['String']['input']>;
  User?: InputMaybe<Scalars['ID']['input']>;
  isRetweeted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostResponse = {
  __typename?: 'postResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RegisterInfo = {
  Bio?: InputMaybe<Scalars['String']['input']>;
  DOB: Scalars['String']['input'];
  Email?: InputMaybe<Scalars['String']['input']>;
  Firstname: Scalars['String']['input'];
  Image?: InputMaybe<Scalars['String']['input']>;
  Lastname: Scalars['String']['input'];
  Password?: InputMaybe<Scalars['String']['input']>;
  Sex: Scalars['String']['input'];
  _id?: InputMaybe<Scalars['String']['input']>;
};

export type Request = {
  RequestId: Scalars['String']['input'];
  User: Scalars['ID']['input'];
  _id: Scalars['ID']['input'];
};

export type RetweetData = {
  Post: Scalars['ID']['input'];
  PostId: Scalars['String']['input'];
  RetweetedUser: Scalars['ID']['input'];
};

export type RetweetedPost = {
  __typename?: 'retweetedPost';
  PostImage?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type ShareData = {
  From: Scalars['String']['input'];
  Image?: InputMaybe<Scalars['String']['input']>;
  PostId: Scalars['String']['input'];
  Title?: InputMaybe<Scalars['String']['input']>;
  To: Scalars['String']['input'];
  _id: Array<Scalars['String']['input']>;
};

export type StatusResponse = {
  __typename?: 'statusResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Suggestions = {
  __typename?: 'suggestions';
  Firstname: Scalars['String']['output'];
  Image?: Maybe<Scalars['String']['output']>;
  Lastname: Scalars['String']['output'];
  _id: Scalars['_id']['output'];
};

export type UploadResponse = {
  __typename?: 'uploadResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UserInfo = {
  __typename?: 'userInfo';
  Bio?: Maybe<Scalars['String']['output']>;
  DOB: Scalars['String']['output'];
  Email?: Maybe<Scalars['String']['output']>;
  Firstname: Scalars['String']['output'];
  Image?: Maybe<Scalars['String']['output']>;
  Lastname: Scalars['String']['output'];
  Password?: Maybe<Scalars['String']['output']>;
  Sex: Scalars['String']['output'];
  _id?: Maybe<Scalars['_id']['output']>;
};

export type UserChatsQueryVariables = Exact<{
  chatUserInfo: ChatUserInfo;
}>;


export type UserChatsQuery = { __typename?: 'Query', Chat?: Array<{ __typename?: 'chatResponse', _id: any, public_id?: string | null, PicturedMessage?: string | null, Chat?: string | null, createdAt?: any | null, To?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, From?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null> | null };

export type UserFriendChatQueryVariables = Exact<{
  userFriendChatUserId: Scalars['ID']['input'];
}>;


export type UserFriendChatQuery = { __typename?: 'Query', UserFriendChat?: Array<{ __typename?: 'friendChat', _id: any, Chat?: string | null, PicturedMessage?: string | null, createdAt?: any | null, From?: { __typename?: 'User', _id: any } | null } | null> | null };

export type InstantUserChatsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type InstantUserChatsSubscription = { __typename?: 'Subscription', Chat?: { __typename?: 'chatResponse', _id: any, Chat?: string | null, PicturedMessage?: string | null, public_id?: string | null, createdAt?: any | null, To?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, From?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null };

export type ChatWithFriendsMutationVariables = Exact<{
  chatInfo: ChatInfo;
  chatWithFriendsPicture?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type ChatWithFriendsMutation = { __typename?: 'Mutation', ChatWithFriends?: { __typename?: 'messageResponse', message?: string | null, success?: boolean | null } | null };

export type AllFriendsRequestsQueryVariables = Exact<{
  allFriendRequestsId: Scalars['ID']['input'];
}>;


export type AllFriendsRequestsQuery = { __typename?: 'Query', allFriendRequests?: Array<{ __typename?: 'friends', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> | null };

export type AllFriendsQueryVariables = Exact<{
  FriendId: Scalars['ID']['input'];
}>;


export type AllFriendsQuery = { __typename?: 'Query', AllFriends?: Array<{ __typename?: 'friends', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, Receiver?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, User?: { __typename?: 'User', _id: any, Lastname?: string | null, Firstname?: string | null, Image?: string | null } | null }> | null };

export type RandomFriendRequestQueryVariables = Exact<{
  acceptedId: Scalars['ID']['input'];
}>;


export type RandomFriendRequestQuery = { __typename?: 'Query', randomFriendRequest?: { __typename?: 'friends', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Image?: string | null, Firstname?: string | null, Lastname?: string | null } | null } | null };

export type FriendSuggestionsQueryVariables = Exact<{
  friendSuggestionsId: Scalars['ID']['input'];
}>;


export type FriendSuggestionsQuery = { __typename?: 'Query', FriendSuggestions?: Array<{ __typename?: 'suggestions', _id: any, Firstname: string, Lastname: string, Image?: string | null } | null> | null };

export type FollowMutationVariables = Exact<{
  followRequestData: Request;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } };

export type FollowBackMutationVariables = Exact<{
  AcceptedId: Scalars['String']['input'];
  FriendId: Scalars['String']['input'];
  userRequestId: Scalars['ID']['input'];
}>;


export type FollowBackMutation = { __typename?: 'Mutation', followBack?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type UnFollowMutationVariables = Exact<{
  unFollowUserId: Scalars['ID']['input'];
  friendId: Scalars['ID']['input'];
  unFollowId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollow?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type RejectRequestMutationVariables = Exact<{
  rejectRequestFriendId: Scalars['String']['input'];
}>;


export type RejectRequestMutation = { __typename?: 'Mutation', rejectRequest?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGroupsQuery = { __typename?: 'Query', GetAllGroups?: Array<{ __typename?: 'groupData', _id: any, GroupCoverImage?: string | null, GroupName?: string | null, Privacy?: string | null, createdAt?: any | null, GroupUsers?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null }> | null };

export type GroupInfoQueryVariables = Exact<{
  groupName: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
}>;


export type GroupInfoQuery = { __typename?: 'Query', GroupInfo?: { __typename?: 'groupData', _id: any, Public_Id?: string | null, GroupCoverImage?: string | null, GroupName?: string | null, createdAt?: any | null, Administrators?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null, GroupUsers?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null } | null };

export type ChatInGroupsQueryVariables = Exact<{
  chatWithFriendsInGroupsGroupId: Scalars['ID']['input'];
}>;


export type ChatInGroupsQuery = { __typename?: 'Query', ChatWithFriendsInGroups?: Array<{ __typename?: 'ChatsIngroup', _id: any, Chat?: string | null, public_id?: string | null, PicturedMessage?: string | null, ChatPlacement: number, createdAt?: any | null, From?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, To?: { __typename?: 'groupData', _id: any, GroupName?: string | null } | null } | null> | null };

export type GroupUsersQueryVariables = Exact<{
  groupUsersGroupName: Scalars['String']['input'];
  groupUsersGroupId: Scalars['ID']['input'];
}>;


export type GroupUsersQuery = { __typename?: 'Query', GroupUsers?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null };

export type GroupUserSuggestionQueryVariables = Exact<{
  groupUserSuggestionsGroupId: Scalars['ID']['input'];
}>;


export type GroupUserSuggestionQuery = { __typename?: 'Query', GroupUserSuggestions?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null };

export type ExcludeAdminMutationVariables = Exact<{
  excludeAdminAdminId: Scalars['ID']['input'];
  adminRoleId: Scalars['ID']['input'];
  excludeAdminGroupId: Scalars['ID']['input'];
}>;


export type ExcludeAdminMutation = { __typename?: 'Mutation', ExcludeAdmin?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type JoinGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', JoinGroup?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type LeaveGroupMutationVariables = Exact<{
  leaveGroupId: Scalars['ID']['input'];
  Id: Scalars['ID']['input'];
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', LeaveGroup?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type SendChatInGroupMutationVariables = Exact<{
  dataFeed: DataFeed;
}>;


export type SendChatInGroupMutation = { __typename?: 'Mutation', ChatWithFriendsInGroups?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type CreateGroupMutationVariables = Exact<{
  createData: CreateData;
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type AddUserMutationVariables = Exact<{
  adminId: Scalars['ID']['input'];
  guestId: Scalars['ID']['input'];
  addUserGroupId: Scalars['ID']['input'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', AddUser?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type RemoveAdminRoleMutationVariables = Exact<{
  removeAdminRoleAdminId: Scalars['ID']['input'];
  removeAdminRoleUserId: Scalars['ID']['input'];
  removeAdminRoleGroupId: Scalars['ID']['input'];
}>;


export type RemoveAdminRoleMutation = { __typename?: 'Mutation', RemoveAdminRole?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type AddAdminRoleMutationVariables = Exact<{
  addAdminRoleAdminId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  addAdminRoleGroupId: Scalars['ID']['input'];
}>;


export type AddAdminRoleMutation = { __typename?: 'Mutation', AddAdminRole?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type ExcludeUserMutationVariables = Exact<{
  excludeUserAdminId: Scalars['ID']['input'];
  excludeUserGuestId: Scalars['ID']['input'];
  excludeUserGroupId: Scalars['ID']['input'];
}>;


export type ExcludeUserMutation = { __typename?: 'Mutation', ExcludeUser?: { __typename?: 'groupResponse', message?: string | null, success?: boolean | null } | null };

export type RealTimeChatInGroupSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RealTimeChatInGroupSubscription = { __typename?: 'Subscription', ChatWithFriendsInGroups?: { __typename?: 'ChatsIngroup', _id: any, Chat?: string | null, public_id?: string | null, PicturedMessage?: string | null, ChatPlacement: number, createdAt?: any | null, From?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, To?: { __typename?: 'groupData', _id: any, GroupName?: string | null } | null } | null };

export type GetUserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationsQuery = { __typename?: 'Query', GetNotifications?: Array<{ __typename?: 'Notifications', _id: any, ReceiverId?: string | null, isGroup: boolean, isSeen?: boolean | null, NotiReference?: string | null, createdAt?: any | null, SenderInfo?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, NotiEngine?: { __typename?: 'Engine', GroupName?: string | null, NotiImage?: string | null, NotiText?: string | null } | null }> | null };

export type SendNotificationMutationVariables = Exact<{
  notiData: NotiData;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', SendNotification?: { __typename?: 'NotiResponse', message?: string | null, success?: boolean | null } | null };

export type DeleteNotificationMutationVariables = Exact<{
  notiId: Scalars['ID']['input'];
  deleteNotificationUserId: Scalars['ID']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', DeleteNotification?: { __typename?: 'NotiResponse', message?: string | null, success?: boolean | null } | null };

export type Viewed_NotificationsMutationVariables = Exact<{
  notiId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type Viewed_NotificationsMutation = { __typename?: 'Mutation', ViewedNotifications?: { __typename?: 'NotiResponse', message?: string | null, success?: boolean | null } | null };

export type PushNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PushNotificationSubscription = { __typename?: 'Subscription', SendNotification?: { __typename?: 'Notifications', _id: any, isSeen?: boolean | null, isGroup: boolean, ReceiverId?: string | null, NotiReference?: string | null, createdAt?: any | null, SenderInfo?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, NotiEngine?: { __typename?: 'Engine', GroupName?: string | null, NotiText?: string | null, NotiImage?: string | null } | null } | null };

export type GetAllPostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', AllPosts: { __typename?: 'Posts', cursor?: string | null, hasNextPage?: boolean | null, Posts?: Array<{ __typename?: 'PostInfo', _id?: any | null, PostId: string, Title?: string | null, PostImage?: string | null, PublicId?: string | null, isGroup?: boolean | null, isRetweeted?: boolean | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, RetweetedPost?: { __typename?: 'retweetedPost', _id?: any | null, PostImage?: string | null, Title?: string | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null }> | null } };

export type Post_LikesQueryVariables = Exact<{ [key: string]: never; }>;


export type Post_LikesQuery = { __typename?: 'Query', PostLikes: Array<{ __typename?: 'Likes', _id?: any | null, PostId?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> };

export type Single_PostQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type Single_PostQuery = { __typename?: 'Query', SinglePost?: { __typename?: 'PostInfo', _id?: any | null, PostId: string, Title?: string | null, PostImage?: string | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null };

export type Post_CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type Post_CommentsQuery = { __typename?: 'Query', PostComments: Array<{ __typename?: 'Comments', _id?: any | null, Body?: string | null, PostId?: string | null, CommentReference?: string | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> };

export type SharePostWithMutationVariables = Exact<{
  shareData: ShareData;
}>;


export type SharePostWithMutation = { __typename?: 'Mutation', Share?: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } | null };

export type SharePostWithGroupMutationVariables = Exact<{
  retweetData: RetweetData;
  groupInfo?: InputMaybe<GroupInfo>;
}>;


export type SharePostWithGroupMutation = { __typename?: 'Mutation', SharePostWithGroup?: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } | null };

export type RetweetPostMutationVariables = Exact<{
  retweetData: RetweetData;
}>;


export type RetweetPostMutation = { __typename?: 'Mutation', Retweet: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } };

export type Create_PostMutationVariables = Exact<{
  postData?: InputMaybe<PostEntries>;
  picture?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type Create_PostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } };

export type Create_LikesMutationVariables = Exact<{
  likesData: LikesData;
}>;


export type Create_LikesMutation = { __typename?: 'Mutation', PostLikes?: { __typename?: 'Likes', _id?: any | null, PostId?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null };

export type Create_CommentsMutationVariables = Exact<{
  commentsData: CommentsData;
}>;


export type Create_CommentsMutation = { __typename?: 'Mutation', PostComments?: { __typename?: 'Comments', _id?: any | null, PostId?: string | null, Body?: string | null, CommentReference?: string | null, createdAt?: any | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null };

export type EditPostMutationVariables = Exact<{
  editData: EditPost;
}>;


export type EditPostMutation = { __typename?: 'Mutation', EditPost: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } };

export type DeletePostMutationVariables = Exact<{
  deletePostPostId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', DeletePost: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } };

export type GetUserStatusQueryVariables = Exact<{
  getUserStatusUserId: Scalars['ID']['input'];
}>;


export type GetUserStatusQuery = { __typename?: 'Query', GetUserStatus: Array<{ __typename?: 'Status', UserId?: string | null, StatusId?: string | null, public_id?: string | null, Image?: string | null } | null> };

export type GetFriendsStatusQueryVariables = Exact<{
  friendsStatusUserId: Scalars['ID']['input'];
}>;


export type GetFriendsStatusQuery = { __typename?: 'Query', FriendsStatus: Array<{ __typename?: 'Status', UserId?: string | null, StatusId?: string | null, public_id?: string | null, Image?: string | null } | null> };

export type AddStatusMutationVariables = Exact<{
  addStatusId: Scalars['ID']['input'];
  addStatusPicture: Scalars['Upload']['input'];
  addStatusUserId: Scalars['ID']['input'];
}>;


export type AddStatusMutation = { __typename?: 'Mutation', AddStatus?: { __typename?: 'statusResponse', message?: string | null, success?: boolean | null } | null };

export type Delete_StatusMutationVariables = Exact<{
  statusId: Scalars['ID']['input'];
  deleteStatusUserId2: Scalars['ID']['input'];
}>;


export type Delete_StatusMutation = { __typename?: 'Mutation', DeleteStatus?: { __typename?: 'statusResponse', message?: string | null, success?: boolean | null } | null };

export type ConnectionQueryVariables = Exact<{
  connectionInfo: ConnectionInfo;
}>;


export type ConnectionQuery = { __typename?: 'Query', Connection: { __typename?: 'Response', message: string, success: boolean, token?: string | null } };

export type RegisterationMutationVariables = Exact<{
  registerInfo: RegisterInfo;
}>;


export type RegisterationMutation = { __typename?: 'Mutation', Registeration: { __typename?: 'Response', message: string, success: boolean, token?: string | null } };

export type UserDataQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserDataQuery = { __typename?: 'Query', userData?: { __typename?: 'userInfo', _id?: any | null, Firstname: string, Lastname: string, Email?: string | null, Password?: string | null, Image?: string | null, DOB: string, Sex: string, Bio?: string | null } | null };

export type AllUserQueryVariables = Exact<{
  allUsersId: Scalars['ID']['input'];
}>;


export type AllUserQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'allUser', _id?: any | null, Email?: string | null, Firstname: string, Lastname: string, Image?: string | null, Friends?: Array<{ __typename?: 'friend', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null, Receiver?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null> | null } | null> | null };

export type UserStatisticsQueryVariables = Exact<{
  userStaticsUserId: Scalars['ID']['input'];
}>;


export type UserStatisticsQuery = { __typename?: 'Query', userStatics?: { __typename?: 'Statics', follower?: number | null, following?: number | null, posts: number } | null };

export type Change_User_ProfileMutationVariables = Exact<{
  changeUserProfileFile: Scalars['Upload']['input'];
  changeUserProfileId: Scalars['String']['input'];
}>;


export type Change_User_ProfileMutation = { __typename?: 'Mutation', ChangeUserProfile?: { __typename?: 'uploadResponse', message: string, success: boolean } | null };

export type Change_CoverMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  changeCoverId2: Scalars['String']['input'];
}>;


export type Change_CoverMutation = { __typename?: 'Mutation', ChangeCover?: { __typename?: 'uploadResponse', message: string, success: boolean } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', LogOut?: { __typename?: 'Response', message: string, success: boolean } | null };

export type OnlineOfflineStatusMutationVariables = Exact<{
  onlineOfflineStatusUserId: Scalars['ID']['input'];
  online: Scalars['Boolean']['input'];
}>;


export type OnlineOfflineStatusMutation = { __typename?: 'Mutation', OnlineOfflineStatus?: { __typename?: 'Response', message: string, success: boolean } | null };

export type ChangePasswordMutationVariables = Exact<{
  userEmail: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', ChangePassword?: { __typename?: 'Response', message: string, success: boolean } | null };

export type SendMailMutationVariables = Exact<{
  mail: Mail;
  code: Scalars['String']['input'];
}>;


export type SendMailMutation = { __typename?: 'Mutation', SendMail: { __typename?: 'Response', message: string, success: boolean } };


export const UserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userChats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatUserInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"chatUserInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatUserInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatUserInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"PicturedMessage"}},{"kind":"Field","name":{"kind":"Name","value":"Chat"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"To"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"From"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<UserChatsQuery, UserChatsQueryVariables>;
export const UserFriendChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserFriendChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userFriendChatUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserFriendChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userFriendChatUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"From"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Chat"}},{"kind":"Field","name":{"kind":"Name","value":"PicturedMessage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UserFriendChatQuery, UserFriendChatQueryVariables>;
export const InstantUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"InstantUserChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Chat"}},{"kind":"Field","name":{"kind":"Name","value":"PicturedMessage"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"To"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"From"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<InstantUserChatsSubscription, InstantUserChatsSubscriptionVariables>;
export const ChatWithFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChatWithFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"chatInfo"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatWithFriendsPicture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChatWithFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatInfo"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatWithFriendsPicture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ChatWithFriendsMutation, ChatWithFriendsMutationVariables>;
export const AllFriendsRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allFriendsRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFriendRequestsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allFriendRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFriendRequestsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<AllFriendsRequestsQuery, AllFriendsRequestsQueryVariables>;
export const AllFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"Receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<AllFriendsQuery, AllFriendsQueryVariables>;
export const RandomFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RandomFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acceptedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"AcceptedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acceptedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<RandomFriendRequestQuery, RandomFriendRequestQueryVariables>;
export const FriendSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friendSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendSuggestionsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FriendSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendSuggestionsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<FriendSuggestionsQuery, FriendSuggestionsQueryVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"request"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const FollowBackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowBack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AcceptedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followBack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"AcceptedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AcceptedId"}}},{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userRequestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<FollowBackMutation, FollowBackMutationVariables>;
export const UnFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unFollowUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unFollowId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unFollowUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}},{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unFollowId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnFollowMutation, UnFollowMutationVariables>;
export const RejectRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"rejectRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rejectRequestFriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rejectRequestFriendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RejectRequestMutation, RejectRequestMutationVariables>;
export const GetAllGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupCoverImage"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Privacy"}},{"kind":"Field","name":{"kind":"Name","value":"GroupUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllGroupsQuery, GetAllGroupsQueryVariables>;
export const GroupInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Public_Id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupCoverImage"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Administrators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"GroupUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GroupInfoQuery, GroupInfoQueryVariables>;
export const ChatInGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatInGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatWithFriendsInGroupsGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChatWithFriendsInGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatWithFriendsInGroupsGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Chat"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"PicturedMessage"}},{"kind":"Field","name":{"kind":"Name","value":"ChatPlacement"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"From"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"To"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}}]}}]}}]}}]} as unknown as DocumentNode<ChatInGroupsQuery, ChatInGroupsQueryVariables>;
export const GroupUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupUsersGroupName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupUsersGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupUsersGroupName"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupUsersGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<GroupUsersQuery, GroupUsersQueryVariables>;
export const GroupUserSuggestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupUserSuggestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupUserSuggestionsGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupUserSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupUserSuggestionsGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<GroupUserSuggestionQuery, GroupUserSuggestionQueryVariables>;
export const ExcludeAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExcludeAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeAdminAdminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminRoleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeAdminGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ExcludeAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeAdminAdminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"adminRoleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminRoleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeAdminGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ExcludeAdminMutation, ExcludeAdminMutationVariables>;
export const JoinGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"JoinGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"GroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<JoinGroupMutation, JoinGroupMutationVariables>;
export const LeaveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LeaveGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"GroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const SendChatInGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChatInGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFeed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"dataFeed"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChatWithFriendsInGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataFeed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFeed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendChatInGroupMutation, SendChatInGroupMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createData"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createData"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addUserGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"guestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addUserGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const RemoveAdminRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAdminRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleAdminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RemoveAdminRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleAdminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeAdminRoleGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveAdminRoleMutation, RemoveAdminRoleMutationVariables>;
export const AddAdminRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAdminRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addAdminRoleAdminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addAdminRoleGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddAdminRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addAdminRoleAdminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addAdminRoleGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddAdminRoleMutation, AddAdminRoleMutationVariables>;
export const ExcludeUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExcludeUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserAdminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserGuestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ExcludeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserAdminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"guestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserGuestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeUserGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ExcludeUserMutation, ExcludeUserMutationVariables>;
export const RealTimeChatInGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RealTimeChatInGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChatWithFriendsInGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Chat"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"PicturedMessage"}},{"kind":"Field","name":{"kind":"Name","value":"ChatPlacement"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"From"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"To"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}}]}}]}}]}}]} as unknown as DocumentNode<RealTimeChatInGroupSubscription, RealTimeChatInGroupSubscriptionVariables>;
export const GetUserNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"ReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"isSeen"}},{"kind":"Field","name":{"kind":"Name","value":"SenderInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"NotiEngine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"NotiImage"}},{"kind":"Field","name":{"kind":"Name","value":"NotiText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"NotiReference"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>;
export const SendNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notiData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotiData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SendNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NotiData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notiData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendNotificationMutation, SendNotificationMutationVariables>;
export const DeleteNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteNotificationUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NotiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notiId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteNotificationUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const Viewed_NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Viewed_Notifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notiId"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ViewedNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NotiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Viewed_NotificationsMutation, Viewed_NotificationsMutationVariables>;
export const PushNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PushNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SendNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isSeen"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"ReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"NotiReference"}},{"kind":"Field","name":{"kind":"Name","value":"SenderInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"NotiEngine"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"NotiText"}},{"kind":"Field","name":{"kind":"Name","value":"NotiImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PushNotificationSubscription, PushNotificationSubscriptionVariables>;
export const GetAllPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"Posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"Title"}},{"kind":"Field","name":{"kind":"Name","value":"PostImage"}},{"kind":"Field","name":{"kind":"Name","value":"PublicId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"isRetweeted"}},{"kind":"Field","name":{"kind":"Name","value":"RetweetedPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostImage"}},{"kind":"Field","name":{"kind":"Name","value":"Title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const Post_LikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post_Likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostLikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<Post_LikesQuery, Post_LikesQueryVariables>;
export const Single_PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Single_Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SinglePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"PostId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"Title"}},{"kind":"Field","name":{"kind":"Name","value":"PostImage"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<Single_PostQuery, Single_PostQueryVariables>;
export const Post_CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post_Comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Body"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"CommentReference"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<Post_CommentsQuery, Post_CommentsQueryVariables>;
export const SharePostWithDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SharePostWith"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shareData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"shareData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Share"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shareData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shareData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SharePostWithMutation, SharePostWithMutationVariables>;
export const SharePostWithGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SharePostWithGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"retweetData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"retweetData"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupInfo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SharePostWithGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"retweetData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"retweetData"}}},{"kind":"Argument","name":{"kind":"Name","value":"GroupInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SharePostWithGroupMutation, SharePostWithGroupMutationVariables>;
export const RetweetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetweetPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"retweetData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"retweetData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Retweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"retweetData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"retweetData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RetweetPostMutation, RetweetPostMutationVariables>;
export const Create_PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"postEntries"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postData"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Create_PostMutation, Create_PostMutationVariables>;
export const Create_LikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Likes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likesData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"likesData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"likesData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likesData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<Create_LikesMutation, Create_LikesMutationVariables>;
export const Create_CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Comments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"commentsData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentsData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"Body"}},{"kind":"Field","name":{"kind":"Name","value":"CommentReference"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<Create_CommentsMutation, Create_CommentsMutationVariables>;
export const EditPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"editData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"editPost"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EditPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"editData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<EditPostMutation, EditPostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePostPostId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"PostId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePostPostId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const GetUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserStatusUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserStatusUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserId"}},{"kind":"Field","name":{"kind":"Name","value":"StatusId"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<GetUserStatusQuery, GetUserStatusQueryVariables>;
export const GetFriendsStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFriendsStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendsStatusUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FriendsStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendsStatusUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserId"}},{"kind":"Field","name":{"kind":"Name","value":"StatusId"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<GetFriendsStatusQuery, GetFriendsStatusQueryVariables>;
export const AddStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addStatusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addStatusPicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addStatusUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addStatusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addStatusPicture"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addStatusUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddStatusMutation, AddStatusMutationVariables>;
export const Delete_StatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_STATUS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteStatusUserId2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"StatusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteStatusUserId2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Delete_StatusMutation, Delete_StatusMutationVariables>;
export const ConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"connection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"connectionInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connectionInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ConnectionQuery, ConnectionQueryVariables>;
export const RegisterationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Registeration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"registerInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Registeration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterationMutation, RegisterationMutationVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}},{"kind":"Field","name":{"kind":"Name","value":"DOB"}},{"kind":"Field","name":{"kind":"Name","value":"Sex"}},{"kind":"Field","name":{"kind":"Name","value":"Bio"}}]}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
export const AllUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allUsersId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allUsersId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}},{"kind":"Field","name":{"kind":"Name","value":"Friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllUserQuery, AllUserQueryVariables>;
export const UserStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userStaticsUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userStaticsUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"posts"}}]}}]}}]} as unknown as DocumentNode<UserStatisticsQuery, UserStatisticsQueryVariables>;
export const Change_User_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Change_User_Profile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeUserProfileFile"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeUserProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangeUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeUserProfileFile"}}},{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeUserProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Change_User_ProfileMutation, Change_User_ProfileMutationVariables>;
export const Change_CoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Change_Cover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeCoverId2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangeCover"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeCoverId2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Change_CoverMutation, Change_CoverMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const OnlineOfflineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OnlineOfflineStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onlineOfflineStatusUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"online"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnlineOfflineStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onlineOfflineStatusUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"online"},"value":{"kind":"Variable","name":{"kind":"Name","value":"online"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<OnlineOfflineStatusMutation, OnlineOfflineStatusMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const SendMailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mail"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SendMail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mail"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendMailMutation, SendMailMutationVariables>;
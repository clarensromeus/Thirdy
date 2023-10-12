import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  MongoId: { input: any; output: any; }
  Upload: { input: any; output: any; }
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
  _id: Scalars['MongoId']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  public_id?: Maybe<Scalars['String']['output']>;
};

export type Comments = {
  __typename?: 'Comments';
  Body?: Maybe<Scalars['String']['output']>;
  CommentReference?: Maybe<Scalars['String']['output']>;
  PostId?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
};

export type Engine = {
  __typename?: 'Engine';
  FriendRequestID?: Maybe<Scalars['String']['output']>;
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  RefreshToken?: Maybe<TokenResponse>;
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
  ReceiverId?: InputMaybe<Scalars['MongoId']['input']>;
  SenderInfo?: InputMaybe<Scalars['MongoId']['input']>;
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
  _id: Scalars['MongoId']['output'];
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  UserInfo?: Maybe<UserInfo>;
  follower?: Maybe<Scalars['Int']['output']>;
  following?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<UserPosts>>;
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
  _id: Scalars['MongoId']['output'];
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  _id: Scalars['MongoId']['output'];
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
  _id?: Maybe<Scalars['MongoId']['output']>;
};

export type FriendChat = {
  __typename?: 'friendChat';
  Chat?: Maybe<Scalars['String']['output']>;
  From?: Maybe<User>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  _id: Scalars['MongoId']['output'];
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  _id: Scalars['MongoId']['output'];
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
  _id: Scalars['MongoId']['output'];
};

export type MessageResponse = {
  __typename?: 'messageResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type NotiEngine = {
  FriendRequestID?: InputMaybe<Scalars['String']['input']>;
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
  RetweetedPost?: InputMaybe<Scalars['MongoId']['input']>;
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
  _id?: Maybe<Scalars['MongoId']['output']>;
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
  _id: Scalars['MongoId']['output'];
};

export type TokenResponse = {
  __typename?: 'tokenResponse';
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  _id?: Maybe<Scalars['MongoId']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type UserPosts = {
  __typename?: 'userPosts';
  PostId: Scalars['String']['output'];
  PostImage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  RetweetedPost?: Maybe<RetweetedPost>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  isRetweeted?: Maybe<Scalars['Boolean']['output']>;
  isSeen?: Maybe<Scalars['Boolean']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CacheControlScope: CacheControlScope;
  ChatsIngroup: ResolverTypeWrapper<ChatsIngroup>;
  Comments: ResolverTypeWrapper<Comments>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Engine: ResolverTypeWrapper<Engine>;
  File: ResolverTypeWrapper<File>;
  GroupInfo: GroupInfo;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Likes: ResolverTypeWrapper<Likes>;
  Mail: Mail;
  MongoId: ResolverTypeWrapper<Scalars['MongoId']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NotiData: NotiData;
  NotiResponse: ResolverTypeWrapper<NotiResponse>;
  Notifications: ResolverTypeWrapper<Notifications>;
  OnlineUser: OnlineUser;
  PostInfo: ResolverTypeWrapper<PostInfo>;
  Posts: ResolverTypeWrapper<Posts>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  Statics: ResolverTypeWrapper<Statics>;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  allUser: ResolverTypeWrapper<AllUser>;
  chatFilter: ChatFilter;
  chatInfo: ChatInfo;
  chatResponse: ResolverTypeWrapper<ChatResponse>;
  chatUserInfo: ChatUserInfo;
  commentsData: CommentsData;
  connectionInfo: ConnectionInfo;
  createData: CreateData;
  dataFeed: DataFeed;
  editPost: EditPost;
  friend: ResolverTypeWrapper<Friend>;
  friendChat: ResolverTypeWrapper<FriendChat>;
  friendResponse: ResolverTypeWrapper<FriendResponse>;
  friends: ResolverTypeWrapper<Friends>;
  groupData: ResolverTypeWrapper<GroupData>;
  groupResponse: ResolverTypeWrapper<GroupResponse>;
  likesData: LikesData;
  listOfFriends: ResolverTypeWrapper<ListOfFriends>;
  messageResponse: ResolverTypeWrapper<MessageResponse>;
  notiEngine: NotiEngine;
  online: ResolverTypeWrapper<Online>;
  postEntries: PostEntries;
  postResponse: ResolverTypeWrapper<PostResponse>;
  registerInfo: RegisterInfo;
  request: Request;
  retweetData: RetweetData;
  retweetedPost: ResolverTypeWrapper<RetweetedPost>;
  shareData: ShareData;
  statusResponse: ResolverTypeWrapper<StatusResponse>;
  suggestions: ResolverTypeWrapper<Suggestions>;
  tokenResponse: ResolverTypeWrapper<TokenResponse>;
  uploadResponse: ResolverTypeWrapper<UploadResponse>;
  userInfo: ResolverTypeWrapper<UserInfo>;
  userPosts: ResolverTypeWrapper<UserPosts>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ChatsIngroup: ChatsIngroup;
  Comments: Comments;
  Date: Scalars['Date']['output'];
  Engine: Engine;
  File: File;
  GroupInfo: GroupInfo;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Likes: Likes;
  Mail: Mail;
  MongoId: Scalars['MongoId']['output'];
  Mutation: {};
  NotiData: NotiData;
  NotiResponse: NotiResponse;
  Notifications: Notifications;
  OnlineUser: OnlineUser;
  PostInfo: PostInfo;
  Posts: Posts;
  Query: {};
  Response: Response;
  Statics: Statics;
  Status: Status;
  String: Scalars['String']['output'];
  Subscription: {};
  Upload: Scalars['Upload']['output'];
  User: User;
  allUser: AllUser;
  chatFilter: ChatFilter;
  chatInfo: ChatInfo;
  chatResponse: ChatResponse;
  chatUserInfo: ChatUserInfo;
  commentsData: CommentsData;
  connectionInfo: ConnectionInfo;
  createData: CreateData;
  dataFeed: DataFeed;
  editPost: EditPost;
  friend: Friend;
  friendChat: FriendChat;
  friendResponse: FriendResponse;
  friends: Friends;
  groupData: GroupData;
  groupResponse: GroupResponse;
  likesData: LikesData;
  listOfFriends: ListOfFriends;
  messageResponse: MessageResponse;
  notiEngine: NotiEngine;
  online: Online;
  postEntries: PostEntries;
  postResponse: PostResponse;
  registerInfo: RegisterInfo;
  request: Request;
  retweetData: RetweetData;
  retweetedPost: RetweetedPost;
  shareData: ShareData;
  statusResponse: StatusResponse;
  suggestions: Suggestions;
  tokenResponse: TokenResponse;
  uploadResponse: UploadResponse;
  userInfo: UserInfo;
  userPosts: UserPosts;
};

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ChatsIngroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatsIngroup'] = ResolversParentTypes['ChatsIngroup']> = {
  Chat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ChatPlacement?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  From?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  PicturedMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  To?: Resolver<Maybe<ResolversTypes['groupData']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  public_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comments'] = ResolversParentTypes['Comments']> = {
  Body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CommentReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PostId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EngineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Engine'] = ResolversParentTypes['Engine']> = {
  FriendRequestID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GroupName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  NotiImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  NotiText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  serverUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Likes'] = ResolversParentTypes['Likes']> = {
  PostId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MongoIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MongoId'], any> {
  name: 'MongoId';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  AddAdminRole?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationAddAdminRoleArgs, 'adminId' | 'groupId' | 'userId'>>;
  AddStatus?: Resolver<Maybe<ResolversTypes['statusResponse']>, ParentType, ContextType, RequireFields<MutationAddStatusArgs, '_id' | 'picture' | 'userId'>>;
  AddUser?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'adminId' | 'groupId' | 'guestId'>>;
  ChangeCover?: Resolver<Maybe<ResolversTypes['uploadResponse']>, ParentType, ContextType, RequireFields<MutationChangeCoverArgs, '_id' | 'file'>>;
  ChangePassword?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'userEmail'>>;
  ChangeUserProfile?: Resolver<Maybe<ResolversTypes['uploadResponse']>, ParentType, ContextType, RequireFields<MutationChangeUserProfileArgs, '_id' | 'file'>>;
  ChatWithFriends?: Resolver<Maybe<ResolversTypes['messageResponse']>, ParentType, ContextType, RequireFields<MutationChatWithFriendsArgs, 'chatInfo'>>;
  ChatWithFriendsInGroups?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationChatWithFriendsInGroupsArgs, 'dataFeed'>>;
  CreatePost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, Partial<MutationCreatePostArgs>>;
  DeleteNotification?: Resolver<Maybe<ResolversTypes['NotiResponse']>, ParentType, ContextType, RequireFields<MutationDeleteNotificationArgs, 'NotiId' | 'userId'>>;
  DeletePost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'PostId'>>;
  DeleteStatus?: Resolver<Maybe<ResolversTypes['statusResponse']>, ParentType, ContextType, RequireFields<MutationDeleteStatusArgs, 'StatusId' | 'userId'>>;
  EditPost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'editData'>>;
  ExcludeAdmin?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationExcludeAdminArgs, 'adminId' | 'adminRoleId' | 'groupId'>>;
  ExcludeUser?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationExcludeUserArgs, 'adminId' | 'groupId' | 'guestId'>>;
  JoinGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationJoinGroupArgs, 'GroupId' | '_id'>>;
  LeaveGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationLeaveGroupArgs, 'GroupId' | '_id'>>;
  LogOut?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  OnlineOfflineStatus?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationOnlineOfflineStatusArgs, 'online' | 'userId'>>;
  PostComments?: Resolver<Maybe<ResolversTypes['Comments']>, ParentType, ContextType, RequireFields<MutationPostCommentsArgs, 'commentsData'>>;
  PostLikes?: Resolver<Maybe<ResolversTypes['Likes']>, ParentType, ContextType, RequireFields<MutationPostLikesArgs, 'likesData'>>;
  RefreshToken?: Resolver<Maybe<ResolversTypes['tokenResponse']>, ParentType, ContextType>;
  Registeration?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationRegisterationArgs, 'registerInfo'>>;
  RemoveAdminRole?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationRemoveAdminRoleArgs, 'adminId' | 'groupId' | 'userId'>>;
  Retweet?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<MutationRetweetArgs, 'retweetData'>>;
  SendMail?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationSendMailArgs, 'code' | 'mail'>>;
  SendNotification?: Resolver<Maybe<ResolversTypes['NotiResponse']>, ParentType, ContextType, RequireFields<MutationSendNotificationArgs, 'NotiData'>>;
  Share?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, RequireFields<MutationShareArgs, 'shareData'>>;
  SharePostWithGroup?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, RequireFields<MutationSharePostWithGroupArgs, 'retweetData'>>;
  User?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, Partial<MutationUserArgs>>;
  ViewedNotifications?: Resolver<Maybe<ResolversTypes['NotiResponse']>, ParentType, ContextType, Partial<MutationViewedNotificationsArgs>>;
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'createData'>>;
  follow?: Resolver<ResolversTypes['friendResponse'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'requestData'>>;
  followBack?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationFollowBackArgs, 'AcceptedId' | 'friendId' | 'userRequestId'>>;
  rejectRequest?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationRejectRequestArgs, 'friendId'>>;
  singleUpload?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationSingleUploadArgs, 'Email' | 'file'>>;
  unFollow?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationUnFollowArgs, 'friendId' | 'userId'>>;
};

export type NotiResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotiResponse'] = ResolversParentTypes['NotiResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notifications'] = ResolversParentTypes['Notifications']> = {
  NotiEngine?: Resolver<Maybe<ResolversTypes['Engine']>, ParentType, ContextType>;
  NotiReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ReceiverId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SenderInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isGroup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostInfo'] = ResolversParentTypes['PostInfo']> = {
  PostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RetweetedPost?: Resolver<Maybe<ResolversTypes['retweetedPost']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isRetweeted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Posts'] = ResolversParentTypes['Posts']> = {
  PostId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Posts?: Resolver<Maybe<Array<ResolversTypes['PostInfo']>>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  AllFriends?: Resolver<Maybe<Array<ResolversTypes['friends']>>, ParentType, ContextType, RequireFields<QueryAllFriendsArgs, '_id'>>;
  AllPosts?: Resolver<ResolversTypes['Posts'], ParentType, ContextType, RequireFields<QueryAllPostsArgs, 'limit'>>;
  Chat?: Resolver<Maybe<Array<Maybe<ResolversTypes['chatResponse']>>>, ParentType, ContextType, RequireFields<QueryChatArgs, 'chatUserInfo'>>;
  ChatWithFriendsInGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChatsIngroup']>>>, ParentType, ContextType, RequireFields<QueryChatWithFriendsInGroupsArgs, 'groupId'>>;
  Connection?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<QueryConnectionArgs, 'connectionInfo'>>;
  FriendRequest?: Resolver<Maybe<ResolversTypes['friends']>, ParentType, ContextType, RequireFields<QueryFriendRequestArgs, 'userId'>>;
  FriendSuggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['suggestions']>>>, ParentType, ContextType, RequireFields<QueryFriendSuggestionsArgs, '_id'>>;
  FriendsStatus?: Resolver<Array<Maybe<ResolversTypes['Status']>>, ParentType, ContextType, RequireFields<QueryFriendsStatusArgs, 'userId'>>;
  GetAllGroups?: Resolver<Maybe<Array<ResolversTypes['groupData']>>, ParentType, ContextType>;
  GetChatFriends?: Resolver<Maybe<Array<ResolversTypes['listOfFriends']>>, ParentType, ContextType, RequireFields<QueryGetChatFriendsArgs, 'userId'>>;
  GetNotifications?: Resolver<Maybe<Array<ResolversTypes['Notifications']>>, ParentType, ContextType>;
  GetUserStatus?: Resolver<Array<Maybe<ResolversTypes['Status']>>, ParentType, ContextType, RequireFields<QueryGetUserStatusArgs, 'userId'>>;
  GroupInfo?: Resolver<Maybe<ResolversTypes['groupData']>, ParentType, ContextType, RequireFields<QueryGroupInfoArgs, 'groupId' | 'groupName'>>;
  GroupUserSuggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGroupUserSuggestionsArgs, 'groupId'>>;
  GroupUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGroupUsersArgs, 'groupId' | 'groupName'>>;
  MutualFriends?: Resolver<Maybe<Array<Maybe<ResolversTypes['friends']>>>, ParentType, ContextType, RequireFields<QueryMutualFriendsArgs, 'friendId' | 'userId'>>;
  PostComments?: Resolver<Array<ResolversTypes['Comments']>, ParentType, ContextType>;
  PostLikes?: Resolver<Array<ResolversTypes['Likes']>, ParentType, ContextType>;
  SinglePost?: Resolver<Maybe<ResolversTypes['PostInfo']>, ParentType, ContextType, RequireFields<QuerySinglePostArgs, 'PostId'>>;
  UserFriendChat?: Resolver<Maybe<Array<Maybe<ResolversTypes['friendChat']>>>, ParentType, ContextType, RequireFields<QueryUserFriendChatArgs, 'userId'>>;
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  allFriendRequests?: Resolver<Maybe<Array<ResolversTypes['friends']>>, ParentType, ContextType, RequireFields<QueryAllFriendRequestsArgs, '_id'>>;
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['allUser']>>>, ParentType, ContextType, RequireFields<QueryAllUsersArgs, '_id'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  randomFriendRequest?: Resolver<Maybe<ResolversTypes['friends']>, ParentType, ContextType, RequireFields<QueryRandomFriendRequestArgs, 'AcceptedId'>>;
  uploads?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userData?: Resolver<Maybe<ResolversTypes['userInfo']>, ParentType, ContextType, RequireFields<QueryUserDataArgs, '_id'>>;
  userStatics?: Resolver<Maybe<ResolversTypes['Statics']>, ParentType, ContextType, RequireFields<QueryUserStaticsArgs, 'userID'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statics'] = ResolversParentTypes['Statics']> = {
  UserInfo?: Resolver<Maybe<ResolversTypes['userInfo']>, ParentType, ContextType>;
  follower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  following?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['userPosts']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  Image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  StatusId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  UserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  public_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  Chat?: SubscriptionResolver<Maybe<ResolversTypes['chatResponse']>, "Chat", ParentType, ContextType>;
  ChatWithFriendsInGroups?: SubscriptionResolver<Maybe<ResolversTypes['ChatsIngroup']>, "ChatWithFriendsInGroups", ParentType, ContextType>;
  SendNotification?: SubscriptionResolver<Maybe<ResolversTypes['Notifications']>, "SendNotification", ParentType, ContextType>;
  _?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_", ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  DOB?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Sex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AllUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['allUser'] = ResolversParentTypes['allUser']> = {
  Email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['friend']>>>, ParentType, ContextType>;
  Image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['chatResponse'] = ResolversParentTypes['chatResponse']> = {
  Chat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  From?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  PicturedMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  To?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  public_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendResolvers<ContextType = any, ParentType extends ResolversParentTypes['friend'] = ResolversParentTypes['friend']> = {
  AcceptedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  RequestId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['friendChat'] = ResolversParentTypes['friendChat']> = {
  Chat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  From?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  PicturedMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['friendResponse'] = ResolversParentTypes['friendResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendsResolvers<ContextType = any, ParentType extends ResolversParentTypes['friends'] = ResolversParentTypes['friends']> = {
  AcceptedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  Receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  RequestId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['groupData'] = ResolversParentTypes['groupData']> = {
  Administrators?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  GroupCoverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GroupName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GroupUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  Privacy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Public_Id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['groupResponse'] = ResolversParentTypes['groupResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListOfFriendsResolvers<ContextType = any, ParentType extends ResolversParentTypes['listOfFriends'] = ResolversParentTypes['listOfFriends']> = {
  AcceptedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RequestId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['messageResponse'] = ResolversParentTypes['messageResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnlineResolvers<ContextType = any, ParentType extends ResolversParentTypes['online'] = ResolversParentTypes['online']> = {
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['postResponse'] = ResolversParentTypes['postResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RetweetedPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['retweetedPost'] = ResolversParentTypes['retweetedPost']> = {
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['statusResponse'] = ResolversParentTypes['statusResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuggestionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['suggestions'] = ResolversParentTypes['suggestions']> = {
  Firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokenResponse'] = ResolversParentTypes['tokenResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['uploadResponse'] = ResolversParentTypes['uploadResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['userInfo'] = ResolversParentTypes['userInfo']> = {
  Bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  DOB?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Sex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['userPosts'] = ResolversParentTypes['userPosts']> = {
  PostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RetweetedPost?: Resolver<Maybe<ResolversTypes['retweetedPost']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isRetweeted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ChatsIngroup?: ChatsIngroupResolvers<ContextType>;
  Comments?: CommentsResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Engine?: EngineResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Likes?: LikesResolvers<ContextType>;
  MongoId?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NotiResponse?: NotiResponseResolvers<ContextType>;
  Notifications?: NotificationsResolvers<ContextType>;
  PostInfo?: PostInfoResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Statics?: StaticsResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  allUser?: AllUserResolvers<ContextType>;
  chatResponse?: ChatResponseResolvers<ContextType>;
  friend?: FriendResolvers<ContextType>;
  friendChat?: FriendChatResolvers<ContextType>;
  friendResponse?: FriendResponseResolvers<ContextType>;
  friends?: FriendsResolvers<ContextType>;
  groupData?: GroupDataResolvers<ContextType>;
  groupResponse?: GroupResponseResolvers<ContextType>;
  listOfFriends?: ListOfFriendsResolvers<ContextType>;
  messageResponse?: MessageResponseResolvers<ContextType>;
  online?: OnlineResolvers<ContextType>;
  postResponse?: PostResponseResolvers<ContextType>;
  retweetedPost?: RetweetedPostResolvers<ContextType>;
  statusResponse?: StatusResponseResolvers<ContextType>;
  suggestions?: SuggestionsResolvers<ContextType>;
  tokenResponse?: TokenResponseResolvers<ContextType>;
  uploadResponse?: UploadResponseResolvers<ContextType>;
  userInfo?: UserInfoResolvers<ContextType>;
  userPosts?: UserPostsResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

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
  MongoId: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type File = {
  __typename?: 'File';
  serverUrl: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Likes = {
  __typename?: 'Likes';
  PostId: Scalars['ID']['output'];
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddStatus?: Maybe<StatusResponse>;
  AddUser?: Maybe<GroupResponse>;
  ChangeCover?: Maybe<UploadResponse>;
  ChangeProfile?: Maybe<UploadResponse>;
  ChatWithFriends?: Maybe<ResponseMessage>;
  ChatWithFriendsInGroups?: Maybe<GroupResponse>;
  CreatePost: PostResponse;
  DeleteStatusImage?: Maybe<StatusResponse>;
  EditPost: PostResponse;
  ExcludeUser?: Maybe<GroupResponse>;
  JoinGroup?: Maybe<GroupResponse>;
  LeaveGroup?: Maybe<GroupResponse>;
  PostComments?: Maybe<PostResponse>;
  PostLikes?: Maybe<Likes>;
  Registeration: Response;
  Retweet: PostResponse;
  Share?: Maybe<PostResponse>;
  User?: Maybe<PostResponse>;
  _?: Maybe<Scalars['String']['output']>;
  createGroup?: Maybe<GroupResponse>;
  follow: FriendResponse;
  followBack?: Maybe<FriendResponse>;
  rejectRequest?: Maybe<FriendResponse>;
  singleUpload?: Maybe<File>;
  unFollow?: Maybe<FriendResponse>;
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


export type MutationChangeProfileArgs = {
  _id: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationChatWithFriendsArgs = {
  chatData: ChatData;
  chatFilter: ChatFilter;
  picture?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationChatWithFriendsInGroupsArgs = {
  chatData: ChatData;
  chatFilter: ChatFilter;
  picture?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationCreatePostArgs = {
  picture?: InputMaybe<Scalars['Upload']['input']>;
  postData?: InputMaybe<PostEntries>;
};


export type MutationDeleteStatusImageArgs = {
  StatusId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationEditPostArgs = {
  editData: EditPost;
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


export type MutationPostCommentsArgs = {
  commentsData: CommentsData;
};


export type MutationPostLikesArgs = {
  likesData: LikesData;
};


export type MutationRegisterationArgs = {
  registerInfo: RegisterInfo;
};


export type MutationRetweetArgs = {
  retweetData: RetweetData;
};


export type MutationShareArgs = {
  picture?: InputMaybe<Scalars['Upload']['input']>;
  shareData: ShareData;
};


export type MutationUserArgs = {
  Online?: InputMaybe<OnlineUser>;
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
  friendId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type OnlineUser = {
  status?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vocation?: InputMaybe<Scalars['String']['input']>;
};

export type PostInfo = {
  __typename?: 'PostInfo';
  Comments?: Maybe<Array<Maybe<Comments>>>;
  Likes?: Maybe<Array<Maybe<Likes>>>;
  PostId: Scalars['String']['output'];
  PostImage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Posts = {
  __typename?: 'Posts';
  PostId?: Maybe<Scalars['String']['output']>;
  PostImage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  AllFriends?: Maybe<Array<Friends>>;
  ChatRoom?: Maybe<Array<Maybe<ChatResponse>>>;
  Connection: Response;
  DeletePost: PostResponse;
  FriendRequest?: Maybe<Friends>;
  FriendSuggestions?: Maybe<Array<Maybe<Suggestions>>>;
  GetAllGroups?: Maybe<Array<GroupData>>;
  GetAllPosts: Array<PostInfo>;
  GetChatFriends?: Maybe<Array<ListOfFriends>>;
  GetallStatus: UserStatus;
  GroupInfo?: Maybe<GroupData>;
  MutualFriends?: Maybe<Array<Maybe<Friends>>>;
  PostComments: Array<CommentsResponse>;
  PostLikes: Array<LikesResponse>;
  TestUser?: Maybe<User>;
  _?: Maybe<Scalars['String']['output']>;
  allFriendRequests?: Maybe<Array<Friends>>;
  hello: Scalars['String']['output'];
  uploads?: Maybe<Scalars['String']['output']>;
  userData?: Maybe<UserInfo>;
};


export type QueryAllFriendsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryChatRoomArgs = {
  chatFilter: ChatFilter;
};


export type QueryConnectionArgs = {
  connectionInfo: ConnectionInfo;
};


export type QueryDeletePostArgs = {
  PostId: Scalars['String']['input'];
};


export type QueryFriendRequestArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFriendSuggestionsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetChatFriendsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetallStatusArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGroupInfoArgs = {
  groupId: Scalars['ID']['input'];
  groupName: Scalars['String']['input'];
};


export type QueryMutualFriendsArgs = {
  friendId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryAllFriendRequestsArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserDataArgs = {
  _id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type StatusInfo = {
  __typename?: 'StatusInfo';
  Images: Scalars['String']['output'];
  StatusId: Scalars['String']['output'];
  public_id: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ChatRoom?: Maybe<Array<ChatResponse>>;
  ChatWithFriendsInGroups?: Maybe<Scalars['String']['output']>;
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
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ChatData = {
  Chat?: InputMaybe<Scalars['ID']['input']>;
  ChatId: Scalars['ID']['input'];
  From: Scalars['String']['input'];
  PublicId?: InputMaybe<Scalars['String']['input']>;
  To: Scalars['String']['input'];
};

export type ChatFilter = {
  activeUser: Scalars['ID']['input'];
  activeUserId: Scalars['ID']['input'];
  friendId: Scalars['ID']['input'];
};

export type ChatResponse = {
  __typename?: 'chatResponse';
  Chat?: Maybe<Scalars['String']['output']>;
  ChatId: Scalars['ID']['output'];
  From?: Maybe<User>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  To?: Maybe<User>;
  _id: Scalars['MongoId']['output'];
  createdAt: Scalars['String']['output'];
};

export type Comments = {
  __typename?: 'comments';
  PostId: Scalars['ID']['output'];
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
};

export type CommentsData = {
  Body: Scalars['String']['input'];
  CommentReference: Scalars['String']['input'];
  Post: Scalars['String']['input'];
  PostId: Scalars['String']['input'];
  User: Scalars['String']['input'];
};

export type CommentsResponse = {
  __typename?: 'commentsResponse';
  CommentReference: Scalars['String']['output'];
  Post: PostInfo;
  PostId: Scalars['String']['output'];
  User: User;
  _id: Scalars['MongoId']['output'];
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

export type EditPost = {
  Picture?: InputMaybe<Scalars['Upload']['input']>;
  PostId: Scalars['String']['input'];
  Title?: InputMaybe<Scalars['String']['input']>;
};

export type FriendResponse = {
  __typename?: 'friendResponse';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Friends = {
  __typename?: 'friends';
  AcceptedId?: Maybe<Scalars['ID']['output']>;
  RequestId?: Maybe<Scalars['ID']['output']>;
  User?: Maybe<User>;
  _id?: Maybe<Scalars['MongoId']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
};

export type GroupData = {
  __typename?: 'groupData';
  GroupCoverImage?: Maybe<Scalars['String']['output']>;
  GroupName: Scalars['String']['output'];
  GroupUsers?: Maybe<Array<Maybe<User>>>;
  Privacy: Scalars['String']['output'];
  Public_Id?: Maybe<Scalars['String']['output']>;
  _id: Scalars['MongoId']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
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

export type LikesResponse = {
  __typename?: 'likesResponse';
  PostId: Scalars['String']['output'];
  Preference?: Maybe<Scalars['String']['output']>;
  _id: Scalars['MongoId']['output'];
};

export type ListOfFriends = {
  __typename?: 'listOfFriends';
  AcceptedId?: Maybe<Scalars['String']['output']>;
  RequestId?: Maybe<Scalars['String']['output']>;
  User: User;
  _id: Scalars['MongoId']['output'];
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
  Title?: InputMaybe<Scalars['String']['input']>;
  User?: InputMaybe<Scalars['ID']['input']>;
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

export type ResponseMessage = {
  __typename?: 'responseMessage';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RetweetData = {
  Post: Scalars['ID']['input'];
  PostId: Scalars['String']['input'];
  RetweetedUser: Scalars['ID']['input'];
};

export type ShareData = {
  From: Scalars['String']['input'];
  PostId: Scalars['String']['input'];
  ShareDestination: Scalars['String']['input'];
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
  _id?: Maybe<Scalars['String']['output']>;
};

export type UserStatus = {
  __typename?: 'userStatus';
  StatusImages: Array<Maybe<StatusInfo>>;
  User: User;
  _id: Scalars['MongoId']['output'];
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
  File: ResolverTypeWrapper<File>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Likes: ResolverTypeWrapper<Likes>;
  MongoId: ResolverTypeWrapper<Scalars['MongoId']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OnlineUser: OnlineUser;
  PostInfo: ResolverTypeWrapper<PostInfo>;
  Posts: ResolverTypeWrapper<Posts>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  StatusInfo: ResolverTypeWrapper<StatusInfo>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  chatData: ChatData;
  chatFilter: ChatFilter;
  chatResponse: ResolverTypeWrapper<ChatResponse>;
  comments: ResolverTypeWrapper<Comments>;
  commentsData: CommentsData;
  commentsResponse: ResolverTypeWrapper<CommentsResponse>;
  connectionInfo: ConnectionInfo;
  createData: CreateData;
  editPost: EditPost;
  friendResponse: ResolverTypeWrapper<FriendResponse>;
  friends: ResolverTypeWrapper<Friends>;
  groupData: ResolverTypeWrapper<GroupData>;
  groupResponse: ResolverTypeWrapper<GroupResponse>;
  likesData: LikesData;
  likesResponse: ResolverTypeWrapper<LikesResponse>;
  listOfFriends: ResolverTypeWrapper<ListOfFriends>;
  online: ResolverTypeWrapper<Online>;
  postEntries: PostEntries;
  postResponse: ResolverTypeWrapper<PostResponse>;
  registerInfo: RegisterInfo;
  request: Request;
  responseMessage: ResolverTypeWrapper<ResponseMessage>;
  retweetData: RetweetData;
  shareData: ShareData;
  statusResponse: ResolverTypeWrapper<StatusResponse>;
  suggestions: ResolverTypeWrapper<Suggestions>;
  uploadResponse: ResolverTypeWrapper<UploadResponse>;
  userInfo: ResolverTypeWrapper<UserInfo>;
  userStatus: ResolverTypeWrapper<UserStatus>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  File: File;
  ID: Scalars['ID']['output'];
  Likes: Likes;
  MongoId: Scalars['MongoId']['output'];
  Mutation: {};
  OnlineUser: OnlineUser;
  PostInfo: PostInfo;
  Posts: Posts;
  Query: {};
  Response: Response;
  StatusInfo: StatusInfo;
  String: Scalars['String']['output'];
  Subscription: {};
  Upload: Scalars['Upload']['output'];
  User: User;
  chatData: ChatData;
  chatFilter: ChatFilter;
  chatResponse: ChatResponse;
  comments: Comments;
  commentsData: CommentsData;
  commentsResponse: CommentsResponse;
  connectionInfo: ConnectionInfo;
  createData: CreateData;
  editPost: EditPost;
  friendResponse: FriendResponse;
  friends: Friends;
  groupData: GroupData;
  groupResponse: GroupResponse;
  likesData: LikesData;
  likesResponse: LikesResponse;
  listOfFriends: ListOfFriends;
  online: Online;
  postEntries: PostEntries;
  postResponse: PostResponse;
  registerInfo: RegisterInfo;
  request: Request;
  responseMessage: ResponseMessage;
  retweetData: RetweetData;
  shareData: ShareData;
  statusResponse: StatusResponse;
  suggestions: Suggestions;
  uploadResponse: UploadResponse;
  userInfo: UserInfo;
  userStatus: UserStatus;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  serverUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Likes'] = ResolversParentTypes['Likes']> = {
  PostId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MongoIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MongoId'], any> {
  name: 'MongoId';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  AddStatus?: Resolver<Maybe<ResolversTypes['statusResponse']>, ParentType, ContextType, RequireFields<MutationAddStatusArgs, '_id' | 'picture' | 'userId'>>;
  AddUser?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'adminId' | 'groupId' | 'guestId'>>;
  ChangeCover?: Resolver<Maybe<ResolversTypes['uploadResponse']>, ParentType, ContextType, RequireFields<MutationChangeCoverArgs, '_id' | 'file'>>;
  ChangeProfile?: Resolver<Maybe<ResolversTypes['uploadResponse']>, ParentType, ContextType, RequireFields<MutationChangeProfileArgs, '_id' | 'file'>>;
  ChatWithFriends?: Resolver<Maybe<ResolversTypes['responseMessage']>, ParentType, ContextType, RequireFields<MutationChatWithFriendsArgs, 'chatData' | 'chatFilter'>>;
  ChatWithFriendsInGroups?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationChatWithFriendsInGroupsArgs, 'chatData' | 'chatFilter'>>;
  CreatePost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, Partial<MutationCreatePostArgs>>;
  DeleteStatusImage?: Resolver<Maybe<ResolversTypes['statusResponse']>, ParentType, ContextType, RequireFields<MutationDeleteStatusImageArgs, 'StatusId' | 'userId'>>;
  EditPost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'editData'>>;
  ExcludeUser?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationExcludeUserArgs, 'adminId' | 'groupId' | 'guestId'>>;
  JoinGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationJoinGroupArgs, 'GroupId' | '_id'>>;
  LeaveGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationLeaveGroupArgs, 'GroupId' | '_id'>>;
  PostComments?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, RequireFields<MutationPostCommentsArgs, 'commentsData'>>;
  PostLikes?: Resolver<Maybe<ResolversTypes['Likes']>, ParentType, ContextType, RequireFields<MutationPostLikesArgs, 'likesData'>>;
  Registeration?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationRegisterationArgs, 'registerInfo'>>;
  Retweet?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<MutationRetweetArgs, 'retweetData'>>;
  Share?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, RequireFields<MutationShareArgs, 'shareData'>>;
  User?: Resolver<Maybe<ResolversTypes['postResponse']>, ParentType, ContextType, Partial<MutationUserArgs>>;
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createGroup?: Resolver<Maybe<ResolversTypes['groupResponse']>, ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'createData'>>;
  follow?: Resolver<ResolversTypes['friendResponse'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'requestData'>>;
  followBack?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationFollowBackArgs, 'AcceptedId' | 'friendId'>>;
  rejectRequest?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationRejectRequestArgs, 'friendId'>>;
  singleUpload?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationSingleUploadArgs, 'Email' | 'file'>>;
  unFollow?: Resolver<Maybe<ResolversTypes['friendResponse']>, ParentType, ContextType, RequireFields<MutationUnFollowArgs, 'friendId' | 'userId'>>;
};

export type PostInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostInfo'] = ResolversParentTypes['PostInfo']> = {
  Comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['comments']>>>, ParentType, ContextType>;
  Likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Likes']>>>, ParentType, ContextType>;
  PostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Posts'] = ResolversParentTypes['Posts']> = {
  PostId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PostImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  AllFriends?: Resolver<Maybe<Array<ResolversTypes['friends']>>, ParentType, ContextType, RequireFields<QueryAllFriendsArgs, '_id'>>;
  ChatRoom?: Resolver<Maybe<Array<Maybe<ResolversTypes['chatResponse']>>>, ParentType, ContextType, RequireFields<QueryChatRoomArgs, 'chatFilter'>>;
  Connection?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<QueryConnectionArgs, 'connectionInfo'>>;
  DeletePost?: Resolver<ResolversTypes['postResponse'], ParentType, ContextType, RequireFields<QueryDeletePostArgs, 'PostId'>>;
  FriendRequest?: Resolver<Maybe<ResolversTypes['friends']>, ParentType, ContextType, RequireFields<QueryFriendRequestArgs, 'userId'>>;
  FriendSuggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['suggestions']>>>, ParentType, ContextType, RequireFields<QueryFriendSuggestionsArgs, '_id'>>;
  GetAllGroups?: Resolver<Maybe<Array<ResolversTypes['groupData']>>, ParentType, ContextType>;
  GetAllPosts?: Resolver<Array<ResolversTypes['PostInfo']>, ParentType, ContextType>;
  GetChatFriends?: Resolver<Maybe<Array<ResolversTypes['listOfFriends']>>, ParentType, ContextType, RequireFields<QueryGetChatFriendsArgs, 'userId'>>;
  GetallStatus?: Resolver<ResolversTypes['userStatus'], ParentType, ContextType, RequireFields<QueryGetallStatusArgs, 'userId'>>;
  GroupInfo?: Resolver<Maybe<ResolversTypes['groupData']>, ParentType, ContextType, RequireFields<QueryGroupInfoArgs, 'groupId' | 'groupName'>>;
  MutualFriends?: Resolver<Maybe<Array<Maybe<ResolversTypes['friends']>>>, ParentType, ContextType, RequireFields<QueryMutualFriendsArgs, 'friendId' | 'userId'>>;
  PostComments?: Resolver<Array<ResolversTypes['commentsResponse']>, ParentType, ContextType>;
  PostLikes?: Resolver<Array<ResolversTypes['likesResponse']>, ParentType, ContextType>;
  TestUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  allFriendRequests?: Resolver<Maybe<Array<ResolversTypes['friends']>>, ParentType, ContextType, RequireFields<QueryAllFriendRequestsArgs, '_id'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploads?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userData?: Resolver<Maybe<ResolversTypes['userInfo']>, ParentType, ContextType, RequireFields<QueryUserDataArgs, '_id'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusInfo'] = ResolversParentTypes['StatusInfo']> = {
  Images?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  StatusId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  ChatRoom?: SubscriptionResolver<Maybe<Array<ResolversTypes['chatResponse']>>, "ChatRoom", ParentType, ContextType>;
  ChatWithFriendsInGroups?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "ChatWithFriendsInGroups", ParentType, ContextType>;
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
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['chatResponse'] = ResolversParentTypes['chatResponse']> = {
  Chat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ChatId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  From?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  PicturedMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PublicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  To?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['comments'] = ResolversParentTypes['comments']> = {
  PostId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['commentsResponse'] = ResolversParentTypes['commentsResponse']> = {
  CommentReference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Post?: Resolver<ResolversTypes['PostInfo'], ParentType, ContextType>;
  PostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['friendResponse'] = ResolversParentTypes['friendResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendsResolvers<ContextType = any, ParentType extends ResolversParentTypes['friends'] = ResolversParentTypes['friends']> = {
  AcceptedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  RequestId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['MongoId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['groupData'] = ResolversParentTypes['groupData']> = {
  GroupCoverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GroupName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  GroupUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  Privacy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Public_Id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['groupResponse'] = ResolversParentTypes['groupResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['likesResponse'] = ResolversParentTypes['likesResponse']> = {
  PostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Preference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListOfFriendsResolvers<ContextType = any, ParentType extends ResolversParentTypes['listOfFriends'] = ResolversParentTypes['listOfFriends']> = {
  AcceptedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RequestId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
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

export type ResponseMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['responseMessage'] = ResolversParentTypes['responseMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['userStatus'] = ResolversParentTypes['userStatus']> = {
  StatusImages?: Resolver<Array<Maybe<ResolversTypes['StatusInfo']>>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  File?: FileResolvers<ContextType>;
  Likes?: LikesResolvers<ContextType>;
  MongoId?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PostInfo?: PostInfoResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  StatusInfo?: StatusInfoResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  chatResponse?: ChatResponseResolvers<ContextType>;
  comments?: CommentsResolvers<ContextType>;
  commentsResponse?: CommentsResponseResolvers<ContextType>;
  friendResponse?: FriendResponseResolvers<ContextType>;
  friends?: FriendsResolvers<ContextType>;
  groupData?: GroupDataResolvers<ContextType>;
  groupResponse?: GroupResponseResolvers<ContextType>;
  likesResponse?: LikesResponseResolvers<ContextType>;
  listOfFriends?: ListOfFriendsResolvers<ContextType>;
  online?: OnlineResolvers<ContextType>;
  postResponse?: PostResponseResolvers<ContextType>;
  responseMessage?: ResponseMessageResolvers<ContextType>;
  statusResponse?: StatusResponseResolvers<ContextType>;
  suggestions?: SuggestionsResolvers<ContextType>;
  uploadResponse?: UploadResponseResolvers<ContextType>;
  userInfo?: UserInfoResolvers<ContextType>;
  userStatus?: UserStatusResolvers<ContextType>;
};


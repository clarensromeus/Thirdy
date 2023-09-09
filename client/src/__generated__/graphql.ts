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
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
  /** objectid custom scalar type */
  _id: { input: any; output: any; }
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
  _id?: Maybe<Scalars['_id']['output']>;
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
  _id?: Maybe<Scalars['_id']['output']>;
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
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  AllFriends?: Maybe<Array<Friends>>;
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
  _id: Scalars['_id']['output'];
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
  friendId: Scalars['ID']['input'];
};

export type ChatResponse = {
  __typename?: 'chatResponse';
  Chat?: Maybe<Scalars['String']['output']>;
  ChatId: Scalars['ID']['output'];
  From?: Maybe<Scalars['String']['output']>;
  PicturedMessage?: Maybe<Scalars['String']['output']>;
  PublicId?: Maybe<Scalars['String']['output']>;
  To?: Maybe<Scalars['String']['output']>;
  _id: Scalars['_id']['output'];
};

export type Comments = {
  __typename?: 'comments';
  PostId: Scalars['ID']['output'];
  User?: Maybe<User>;
  _id?: Maybe<Scalars['_id']['output']>;
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
  _id: Scalars['_id']['output'];
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
  _id?: Maybe<Scalars['_id']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
};

export type GroupData = {
  __typename?: 'groupData';
  GroupCoverImage?: Maybe<Scalars['String']['output']>;
  GroupName: Scalars['String']['output'];
  GroupUsers?: Maybe<Array<Maybe<User>>>;
  Privacy: Scalars['String']['output'];
  Public_Id?: Maybe<Scalars['String']['output']>;
  _id: Scalars['_id']['output'];
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
  _id: Scalars['_id']['output'];
};

export type ListOfFriends = {
  __typename?: 'listOfFriends';
  AcceptedId?: Maybe<Scalars['String']['output']>;
  RequestId?: Maybe<Scalars['String']['output']>;
  User: User;
  _id: Scalars['_id']['output'];
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
  _id?: Maybe<Scalars['String']['output']>;
};

export type UserStatus = {
  __typename?: 'userStatus';
  StatusImages: Array<Maybe<StatusInfo>>;
  User: User;
  _id: Scalars['_id']['output'];
};

export type AllFriendsRequestsQueryVariables = Exact<{
  allFriendRequestsId: Scalars['ID']['input'];
}>;


export type AllFriendsRequestsQuery = { __typename?: 'Query', allFriendRequests?: Array<{ __typename?: 'friends', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> | null };

export type AllFriendsQueryVariables = Exact<{
  FriendId: Scalars['ID']['input'];
}>;


export type AllFriendsQuery = { __typename?: 'Query', AllFriends?: Array<{ __typename?: 'friends', _id?: any | null, RequestId?: string | null, AcceptedId?: string | null, createdAt?: string | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> | null };

export type FriendSuggestionsQueryVariables = Exact<{
  friendSuggestionsId: Scalars['ID']['input'];
}>;


export type FriendSuggestionsQuery = { __typename?: 'Query', FriendSuggestions?: Array<{ __typename?: 'suggestions', _id: any, Firstname: string, Lastname: string, Image?: string | null } | null> | null };

export type FollowMutationVariables = Exact<{
  followRequestData: Request;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } };

export type FollowBackMutationVariables = Exact<{
  acceptedId: Scalars['String']['input'];
  friendId: Scalars['String']['input'];
}>;


export type FollowBackMutation = { __typename?: 'Mutation', followBack?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type UnFollowMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  unFollowFriendId: Scalars['ID']['input'];
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollow?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type RejectRequestMutationVariables = Exact<{
  rejectRequestFriendId: Scalars['String']['input'];
}>;


export type RejectRequestMutation = { __typename?: 'Mutation', rejectRequest?: { __typename?: 'friendResponse', message?: string | null, success?: boolean | null } | null };

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGroupsQuery = { __typename?: 'Query', GetAllGroups?: Array<{ __typename?: 'groupData', _id: any, GroupCoverImage?: string | null, GroupName: string, Privacy: string, createdAt?: string | null }> | null };

export type GroupInfoQueryVariables = Exact<{
  groupName: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
}>;


export type GroupInfoQuery = { __typename?: 'Query', GroupInfo?: { __typename?: 'groupData', _id: any, GroupName: string, GroupCoverImage?: string | null, Privacy: string, GroupUsers?: Array<{ __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null> | null } | null };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', GetAllPosts: Array<{ __typename?: 'PostInfo', _id?: any | null, PostId: string, Title?: string | null, PostImage?: string | null, createdAt?: string | null, updatedAt?: string | null, Comments?: Array<{ __typename?: 'comments', _id?: any | null, PostId: string, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null> | null, Likes?: Array<{ __typename?: 'Likes', _id?: any | null, PostId: string, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null> | null, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null }> };

export type Create_PostMutationVariables = Exact<{
  postData?: InputMaybe<PostEntries>;
  picture?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type Create_PostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } };

export type Create_LikesMutationVariables = Exact<{
  likesData: LikesData;
}>;


export type Create_LikesMutation = { __typename?: 'Mutation', PostLikes?: { __typename?: 'Likes', _id?: any | null, PostId: string, User?: { __typename?: 'User', _id: any, Firstname?: string | null, Lastname?: string | null, Image?: string | null } | null } | null };

export type Create_CommentMutationVariables = Exact<{
  commentsData: CommentsData;
}>;


export type Create_CommentMutation = { __typename?: 'Mutation', PostComments?: { __typename?: 'postResponse', message?: string | null, success?: boolean | null } | null };

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


export type UserDataQuery = { __typename?: 'Query', userData?: { __typename?: 'userInfo', _id?: string | null, Firstname: string, Lastname: string, Email?: string | null, Password?: string | null, Image?: string | null, DOB: string, Sex: string, Bio?: string | null } | null };

export type Change_User_ProfileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  id: Scalars['String']['input'];
}>;


export type Change_User_ProfileMutation = { __typename?: 'Mutation', ChangeProfile?: { __typename?: 'uploadResponse', message: string, success: boolean } | null };


export const AllFriendsRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allFriendsRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFriendRequestsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allFriendRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFriendRequestsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<AllFriendsRequestsQuery, AllFriendsRequestsQueryVariables>;
export const AllFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"FriendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"RequestId"}},{"kind":"Field","name":{"kind":"Name","value":"AcceptedId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<AllFriendsQuery, AllFriendsQueryVariables>;
export const FriendSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friendSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendSuggestionsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FriendSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendSuggestionsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]} as unknown as DocumentNode<FriendSuggestionsQuery, FriendSuggestionsQueryVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"request"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const FollowBackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowBack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acceptedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followBack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"AcceptedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acceptedId"}}},{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<FollowBackMutation, FollowBackMutationVariables>;
export const UnFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unFollowFriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unFollowFriendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnFollowMutation, UnFollowMutationVariables>;
export const RejectRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"rejectRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rejectRequestFriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rejectRequestFriendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RejectRequestMutation, RejectRequestMutationVariables>;
export const GetAllGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupCoverImage"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Privacy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllGroupsQuery, GetAllGroupsQueryVariables>;
export const GroupInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"GroupName"}},{"kind":"Field","name":{"kind":"Name","value":"GroupCoverImage"}},{"kind":"Field","name":{"kind":"Name","value":"Privacy"}},{"kind":"Field","name":{"kind":"Name","value":"GroupUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<GroupInfoQuery, GroupInfoQueryVariables>;
export const GetAllPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetAllPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"Title"}},{"kind":"Field","name":{"kind":"Name","value":"PostImage"}},{"kind":"Field","name":{"kind":"Name","value":"Comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"Likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const Create_PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"postEntries"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postData"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Create_PostMutation, Create_PostMutationVariables>;
export const Create_LikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Likes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likesData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"likesData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"likesData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likesData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"PostId"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}}]}}]}}]}}]} as unknown as DocumentNode<Create_LikesMutation, Create_LikesMutationVariables>;
export const Create_CommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_Comment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"commentsData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PostComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentsData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Create_CommentMutation, Create_CommentMutationVariables>;
export const ConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"connection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"connectionInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connectionInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ConnectionQuery, ConnectionQueryVariables>;
export const RegisterationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Registeration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"registerInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Registeration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterationMutation, RegisterationMutationVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}},{"kind":"Field","name":{"kind":"Name","value":"DOB"}},{"kind":"Field","name":{"kind":"Name","value":"Sex"}},{"kind":"Field","name":{"kind":"Name","value":"Bio"}}]}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
export const Change_User_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Change_User_Profile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<Change_User_ProfileMutation, Change_User_ProfileMutationVariables>;
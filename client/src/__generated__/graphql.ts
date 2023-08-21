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
  Upload: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  Registeration: Response;
  _?: Maybe<Scalars['String']['output']>;
  singleUpload?: Maybe<Scalars['String']['output']>;
};


export type MutationRegisterationArgs = {
  registerInfo: RegisterInfo;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  Connection: Response;
  _?: Maybe<Scalars['String']['output']>;
  hello: Scalars['String']['output'];
  uploads?: Maybe<Scalars['String']['output']>;
  userData?: Maybe<UserInfo>;
};


export type QueryConnectionArgs = {
  connectionInfo: ConnectionInfo;
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['String']['output']>;
};

export type ConnectionInfo = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Password: Scalars['String']['input'];
  Username?: InputMaybe<Scalars['String']['input']>;
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

export type ConnectionQueryVariables = Exact<{
  connectionInfo: ConnectionInfo;
}>;


export type ConnectionQuery = { __typename?: 'Query', Connection: { __typename?: 'Response', message: string, success: boolean, token?: string | null } };

export type RegisterationMutationVariables = Exact<{
  registerInfo: RegisterInfo;
}>;


export type RegisterationMutation = { __typename?: 'Mutation', Registeration: { __typename?: 'Response', message: string, success: boolean, token?: string | null } };

export type UserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDataQuery = { __typename?: 'Query', userData?: { __typename?: 'userInfo', _id?: string | null, Firstname: string, Lastname: string, Email?: string | null, Password?: string | null, Image?: string | null, DOB: string, Sex: string, Bio?: string | null } | null };


export const ConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"connection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"connectionInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connectionInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connectionInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ConnectionQuery, ConnectionQueryVariables>;
export const RegisterationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Registeration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"registerInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Registeration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterationMutation, RegisterationMutationVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Firstname"}},{"kind":"Field","name":{"kind":"Name","value":"Lastname"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"Image"}},{"kind":"Field","name":{"kind":"Name","value":"DOB"}},{"kind":"Field","name":{"kind":"Name","value":"Sex"}},{"kind":"Field","name":{"kind":"Name","value":"Bio"}}]}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
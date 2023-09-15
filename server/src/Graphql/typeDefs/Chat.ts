import { gql } from "graphql-tag";

export default gql`
  #------------------>Scalars<-------------------#
  scalar MongoId
  scalar Date

  #------------------>Query<---------------------#
  extend type Query {
    GetChatFriends(userId: String!): [listOfFriends!]
    Chat(chatUserInfo: chatUserInfo!): [chatResponse]
  }
  #------------------->Mutation<-----------------#
  extend type Mutation {
    ChatWithFriends(chatInfo: chatInfo!, picture: Upload): messageResponse
  }

  #----------------->Subscription<---------------#

  extend type Subscription {
    Chat: chatResponse
  }

  #------------------->Types<--------------------#
  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Email: String
    Image: String
    Sex: String
    DOB: String
    Bio: String
    createdAt: String
    updatedAt: String
  }

  type listOfFriends {
    _id: MongoId!
    RequestId: String
    AcceptedId: String
    User: User!
  }

  type chatResponse {
    _id: MongoId!
    Chat: String
    public_id: String
    PicturedMessage: String
    To: User
    From: User
    createdAt: Date
  }

  type messageResponse {
    message: String
    success: Boolean
  }

  #-------------------->Inputs<--------------------#
  input chatInfo {
    Chat: String
    To: ID!
    From: ID!
  }

  input chatUserInfo {
    friendId: ID!
    activeUserId: ID!
  }
`;

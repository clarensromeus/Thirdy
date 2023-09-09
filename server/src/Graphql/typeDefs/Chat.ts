import { gql } from "graphql-tag";

export default gql`
  #------------------>Scalars<-------------------#
  scalar MongoId

  #------------------>Query<---------------------#
  extend type Query {
    GetChatFriends(userId: String!): [listOfFriends!]
    ChatRoom(chatFilter: chatFilter!): [chatResponse]
  }
  #------------------->Mutation<-----------------#
  extend type Mutation {
    ChatWithFriends(
      chatData: chatData!
      picture: Upload
      chatFilter: chatFilter!
    ): responseMessage
  }

  #----------------->Subscription<---------------#

  extend type Subscription {
    ChatRoom: [chatResponse!]
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
    ChatId: ID!
    Chat: String
    PublicId: String
    PicturedMessage: String
    To: User
    From: User
    createdAt: String!
  }

  type responseMessage {
    message: String
    success: Boolean
  }

  #-------------------->Inputs<--------------------#
  input chatData {
    ChatId: ID!
    Chat: ID
    PublicId: String
    To: String!
    From: String!
  }

  input chatFilter {
    friendId: ID!
    activeUserId: ID!
  }
`;

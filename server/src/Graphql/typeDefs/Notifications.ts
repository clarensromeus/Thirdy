import { gql } from "graphql-tag";

export default gql`
  #------------------>Scalars<--------------------#
  scalar MongoId
  scalar Date

  #------------------->Queries<-------------------#
  extend type Query {
    GetNotifications: [Notifications!]
  }

  #--------------------->Mutations<---------------#
  extend type Mutation {
    SendNotification(NotiData: NotiData!): NotiResponse
    DeleteNotification(NotiId: ID!, userId: ID!): NotiResponse
    ViewedNotifications(NotiId: [ID]): NotiResponse
  }

  #------------------>Subscriptions<--------------#
  extend type Subscription {
    SendNotification: Notifications
  }

  #------------------->Inputs<--------------------#
  input notiEngine {
    GroupName: String
    isGroup: Boolean
    NotiText: String
    NotiImage: String
    FriendRequestID: String
  }

  input NotiData {
    ReceiverId: MongoId
    isGroup: Boolean
    isSeen: Boolean
    SenderInfo: MongoId
    NotiReference: String
    NotiEngine: notiEngine
  }

  #------------------>Types<-------------------#
  type NotiResponse {
    message: String
    success: Boolean
  }

  type Engine {
    GroupName: String
    NotiText: String
    NotiImage: String
    FriendRequestID: String
  }

  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Image: String
  }

  type Notifications {
    _id: MongoId!
    ReceiverId: String
    isGroup: Boolean!
    isSeen: Boolean
    SenderInfo: User
    NotiReference: String
    NotiEngine: Engine
    createdAt: Date
  }
`;

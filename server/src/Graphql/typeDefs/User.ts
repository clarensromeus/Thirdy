import { gql } from "graphql-tag";

export default gql`
  #______________Queries____________________
  extend type Query {
    _: String
    hello: String!
    userData(_id: ID!): userInfo
    Connection(connectionInfo: connectionInfo!): Response!
    allUsers: [allUser]
  }
  #________________Mutations_________________
  extend type Mutation {
    _: String
    Registeration(registerInfo: registerInfo!): Response!
    ChangeProfile(file: Upload!, _id: String!): uploadResponse
    ChangeCover(file: Upload!, _id: String!): uploadResponse
  }

  #________________Subscriptions______________
  extend type Subscription {
    _: String
  }

  #________________types______________________
  type Response {
    message: String!
    token: String
    success: Boolean!
  }

  type userInfo {
    _id: MongoId
    Firstname: String!
    Lastname: String!
    Email: String
    Image: String
    Password: String
    Sex: String!
    DOB: String!
    Bio: String
  }

  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Image: String
  }

  type friend {
    _id: MongoId
    RequestId: String
    AcceptedId: String
    User: User
    Receiver: User
  }

  type allUser {
    _id: MongoId
    Firstname: String!
    Lastname: String!
    Email: String
    Image: String
    Friends: [friend]
  }

  type uploadResponse {
    message: String!
    success: Boolean!
  }

  #_________________inputs_____________________

  input connectionInfo {
    Username: String
    Email: String
    Password: String!
  }

  input registerInfo {
    _id: String
    Firstname: String!
    Lastname: String!
    Email: String
    Image: String
    Password: String
    Sex: String!
    DOB: String!
    Bio: String
  }
`;

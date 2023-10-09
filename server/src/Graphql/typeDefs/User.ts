import { gql } from "graphql-tag";

export default gql`
  #______________Queries____________________
  extend type Query {
    userStatics(userID: ID!): Statics
    userData(_id: ID!): userInfo
    Connection(connectionInfo: connectionInfo!): Response!
    allUsers(_id: ID!): [allUser]
  }
  #________________Mutations_________________
  extend type Mutation {
    Registeration(registerInfo: registerInfo!): Response!
    ChangeUserProfile(file: Upload!, _id: String!): uploadResponse
    ChangeCover(file: Upload!, _id: String!): uploadResponse
    SendMail(mail: Mail!, code: String!): Response!
    LogOut: Response
    OnlineOfflineStatus(userId: ID!, online: Boolean!): Response
    ChangePassword(userEmail: String!, newPassword: String!): Response
  }

  #________________types______________________
  type Response {
    message: String!
    token: String
    success: Boolean!
  }

  type Statics {
    follower: Int
    following: Int
    posts: Int!
  }

  type userInfo {
    _id: MongoId @cacheControl(maxAge: 40, scope: PRIVATE)
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

  input Mail {
    DESTINATION: String!
    SUBJECT: String
    HTMLBODY: String!
    MESSAGE: String!
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

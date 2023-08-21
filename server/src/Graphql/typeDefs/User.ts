import { gql } from "graphql-tag";

export default gql`
  extend type Query {
    _: String
    hello: String!
    userData: userInfo
    Connection(connectionInfo: connectionInfo!): Response!
  }

  extend type Mutation {
    _: String
    Registeration(registerInfo: registerInfo!): Response!
  }

  extend type Subscription {
    _: String
  }

  type Response {
    message: String!
    token: String
    success: Boolean!
  }

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

  type userInfo {
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

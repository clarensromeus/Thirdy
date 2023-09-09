import { gql } from "graphql-tag";

export default gql`
  scalar MongoId

  extend type Query {
    GetallStatus(userId: ID!): userStatus!
  }

  extend type Mutation {
    AddStatus(_id: ID!, picture: Upload!, userId: ID!): statusResponse
    DeleteStatusImage(StatusId: ID!, userId: ID!): statusResponse
  }

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

  type statusResponse {
    message: String
    success: Boolean
  }

  type StatusInfo {
    StatusId: String!
    public_id: String!
    Images: String!
  }

  type userStatus {
    _id: MongoId!
    User: User!
    StatusImages: [StatusInfo]!
  }
`;

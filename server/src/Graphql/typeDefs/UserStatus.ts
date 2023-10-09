import { gql } from "graphql-tag";

export default gql`
  scalar MongoId

  extend type Query {
    GetUserStatus(userId: ID!): [Status]!
    FriendsStatus(userId: ID!): [Status]!
  }

  extend type Mutation {
    AddStatus(_id: ID!, picture: Upload!, userId: ID!): statusResponse
    DeleteStatus(StatusId: ID!, userId: ID!): statusResponse
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

  type Status {
    UserId: ID
    StatusId: ID
    public_id: ID
    Image: String
  }
`;

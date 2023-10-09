import { gql } from "graphql-tag";

export default gql`
  #---------------Scalars<----------------------#
  scalar MongoId
  scalar Date

  #---------------->Queries<---------------------#
  extend type Query {
    MutualFriends(friendId: ID!, userId: ID!): [friends]
    FriendRequest(userId: ID!): friends
    AllFriends(_id: ID!): [friends!]
    FriendSuggestions(_id: ID!): [suggestions]
    allFriendRequests(_id: ID!): [friends!]
    randomFriendRequest(AcceptedId: ID!): friends
  }

  #---------------->Mutations<-------------------#
  extend type Mutation {
    follow(requestData: request!): friendResponse!
    rejectRequest(friendId: String!): friendResponse
    followBack(
      AcceptedId: String!
      friendId: String!
      userRequestId: ID!
    ): friendResponse
    unFollow(userId: ID!, friendId: ID!, _id: ID): friendResponse
  }

  #------------------->Types<------------------#
  type friendResponse {
    message: String
    success: Boolean
  }

  type User {
    _id: MongoId!
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

  type suggestions {
    _id: MongoId!
    Firstname: String!
    Lastname: String!
    Image: String
  }

  type friends {
    _id: MongoId
    RequestId: ID
    AcceptedId: ID
    Receiver: User
    User: User
    createdAt: Date
  }

  #------------------->Inputs<-----------------#
  input request {
    _id: ID!
    RequestId: String!
    User: ID!
  }
`;

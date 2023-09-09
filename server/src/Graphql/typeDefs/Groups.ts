import { gql } from "graphql-tag";

export default gql`
  #------------------>Scalar<------------------------#
  scalar MongoId

  #------------------>Queries<------------------------#
  extend type Query {
    GetAllGroups: [groupData!]
    GroupInfo(groupName: String!, groupId: ID!): groupData
  }

  #------------------>Mutations<------------------------#
  extend type Mutation {
    createGroup(createData: createData!, file: Upload): groupResponse
    JoinGroup(_id: ID!, GroupId: ID!): groupResponse
    LeaveGroup(_id: ID!, GroupId: ID!): groupResponse
    AddUser(adminId: ID!, guestId: ID!, groupId: ID!): groupResponse
    ChatWithFriendsInGroups(
      chatData: chatData!
      picture: Upload
      chatFilter: chatFilter!
    ): groupResponse
    ExcludeUser(adminId: ID!, guestId: ID!, groupId: ID!): groupResponse
  }

  extend type Subscription {
    ChatWithFriendsInGroups: String
  }

  #------------------>Types<---------------------#
  type groupResponse {
    message: String
    success: Boolean
  }

  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Email: String
    Image: String
  }

  type Posts {
    _id: MongoId
    PostId: String
    PostImage: String
    PublicId: String
    Title: String
    User: User
    createdAt: String
    updatedAt: String
  }

  type groupData {
    _id: MongoId!
    GroupName: String!
    GroupCoverImage: String
    Public_Id: String
    Privacy: String!
    GroupUsers: [User]
    createdAt: String
    updatedAt: String
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
    activeUser: ID!
  }

  input createData {
    GroupName: String!
    Users: [ID!]
    Privacy: String!
    Administrators: [ID!]
  }
`;

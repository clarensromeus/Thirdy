import { gql } from "graphql-tag";

export default gql`
  #------------------>Scalar<------------------------#
  scalar MongoId
  scalar Date

  #------------------>Queries<------------------------#
  extend type Query {
    GetAllGroups: [groupData!]
    GroupInfo(groupName: String!, groupId: ID!): groupData
    ChatWithFriendsInGroups(groupId: ID!): [ChatsIngroup]
    GroupUsers(groupName: String!, groupId: ID!): [User]
  }

  #------------------>Mutations<------------------------#
  extend type Mutation {
    createGroup(createData: createData!, file: Upload): groupResponse
    JoinGroup(_id: ID!, GroupId: ID!): groupResponse
    LeaveGroup(_id: ID!, GroupId: ID!): groupResponse
    AddUser(adminId: ID!, guestId: ID!, groupId: ID!): groupResponse
    ChatWithFriendsInGroups(dataFeed: dataFeed!, picture: Upload): groupResponse
    ExcludeUser(adminId: ID!, guestId: ID!, groupId: ID!): groupResponse
    AddAdminRole(adminId: ID!, userId: ID!, groupId: ID!): groupResponse
    RemoveAdminRole(adminId: ID!, userId: ID!, groupId: ID!): groupResponse
  }

  extend type Subscription {
    ChatWithFriendsInGroups: ChatsIngroup
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
    GroupName: String
    GroupCoverImage: String
    Public_Id: String
    Privacy: String
    GroupUsers: [User]
    createdAt: Date
  }

  type ChatsIngroup {
    _id: MongoId!
    Chat: String
    ChatPlacement: Int!
    From: User
    To: groupData
    createdAt: Date
    public_id: String
    PicturedMessage: String
  }

  #-------------------->Inputs<--------------------#

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

  input dataFeed {
    GroupId: ID!
    Chat: ID
    To: ID!
    From: ID!
    ChatPlacement: Int!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  #_______________scalars________________
  scalar MongoId
  scalar Date

  # _______________Queries______________
  extend type Query {
    AllPosts(cursor: String, limit: Int!): Posts!
    PostLikes: [Likes!]!
    PostComments: [Comments!]!
    SinglePost(PostId: ID!): PostInfo
  }

  #_______________Mutations_______________
  extend type Mutation {
    CreatePost(postData: postEntries, picture: Upload): postResponse!
    EditPost(editData: editPost!): postResponse!
    User(Online: OnlineUser): postResponse
    PostLikes(likesData: likesData!): Likes
    PostComments(commentsData: commentsData!): Comments
    DeletePost(PostId: String!): postResponse!
    Retweet(retweetData: retweetData!): postResponse!
    Share(shareData: shareData!, picture: Upload): postResponse
    SharePostWithGroup(
      retweetData: retweetData!
      GroupInfo: GroupInfo
    ): postResponse
  }

  #______________inputs___________________
  input postEntries {
    Title: String
    PostId: String!
    PostReference: String!
    User: ID
    isRetweeted: Boolean
    RetweetedPost: MongoId
  }

  input GroupInfo {
    GroupId: [ID!]!
    GroupName: String
    sharedPostId: ID!
  }

  input editPost {
    Title: String
    PostId: String!
    Picture: Upload
  }

  input OnlineUser {
    username: String
    vocation: String
    status: String
  }

  input likesData {
    PostId: String!
    Preference: String!
    User: ID!
  }

  input commentsData {
    PostId: String!
    Body: String!
    CommentReference: String!
    User: String!
  }

  input retweetData {
    PostId: String!
    RetweetedUser: ID!
    Post: ID!
  }

  input shareData {
    _id: [String!]!
    Title: String
    PostId: String!
    From: String!
    To: String!
    Image: String
  }

  #__________________types________________
  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Image: String
  }

  type Likes {
    _id: MongoId
    PostId: String
    User: User
  }

  type Comments {
    _id: MongoId
    PostId: String
    Body: String
    CommentReference: String
    User: User
    createdAt: Date
  }

  type retweetedPost {
    _id: MongoId
    PostImage: String
    Title: String
    User: User
    createdAt: Date
  }

  type PostInfo {
    _id: MongoId
    PostId: String!
    PostImage: String
    PublicId: String
    Title: String
    User: User
    isGroup: Boolean
    isRetweeted: Boolean
    RetweetedPost: retweetedPost
    createdAt: Date
  }

  type Posts {
    Posts: [PostInfo!] @cacheControl(maxAge: 20)
    cursor: String
    hasNextPage: Boolean
  }

  type postResponse {
    message: String
    success: Boolean
  }

  type online {
    username: String
    vocation: String
    status: String
  }
`;

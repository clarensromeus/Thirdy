import { gql } from "graphql-tag";

export default gql`
  #_______________scalars________________
  scalar MongoId

  # _______________Queries______________
  extend type Query {
    GetAllPosts: [PostInfo!]!
    DeletePost(PostId: String!): postResponse!
    PostLikes: [likesResponse!]!
    PostComments: [commentsResponse!]!
  }

  #_______________Mutations_______________
  extend type Mutation {
    CreatePost(postData: postEntries, picture: Upload): postResponse!
    EditPost(editData: editPost!): postResponse!
    User(Online: OnlineUser): postResponse
    PostLikes(likesData: likesData!): Likes
    PostComments(commentsData: commentsData!): postResponse
    Retweet(retweetData: retweetData!): postResponse!
    Share(shareData: shareData!, picture: Upload): postResponse
  }

  #______________inputs___________________
  input postEntries {
    Title: String
    PostId: String!
    PostReference: String!
    User: ID
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
    Post: String!
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
    ShareDestination: String!
  }

  #__________________types________________
  type User {
    _id: MongoId
    Firstname: String
    Lastname: String
    Image: String
  }

  type likesResponse {
    _id: MongoId!
    PostId: String!
    Preference: String
  }

  type commentsResponse {
    _id: MongoId!
    PostId: String!
    CommentReference: String!
    Post: PostInfo!
    User: User!
  }

  type Likes {
    _id: MongoId
    PostId: ID!
    User: User
  }

  type comments {
    _id: MongoId
    PostId: ID!
    User: User
  }

  type PostInfo {
    _id: MongoId
    PostId: String!
    PostImage: String
    PublicId: String
    Comments: [comments]
    Title: String
    Likes: [Likes]
    User: User
    createdAt: String
    updatedAt: String
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

import { gql } from "@apollo/client";

/* ------------------------>Queries<----------------------------- */
const Get_All_Post = gql`
  query GetAllPosts($limit: Int!, $cursor: String) {
    AllPosts(limit: $limit, cursor: $cursor) {
      cursor
      hasNextPage
      Posts {
        _id
        PostId
        Title
        PostImage
        PublicId
        User {
          _id
          Firstname
          Lastname
          Image
        }
        isGroup
        isRetweeted
        RetweetedRating {
          _id
        }
        RetweetedPost {
          _id
          PostImage
          Title
          createdAt
          User {
            _id
            Firstname
            Lastname
            Image
          }
        }
        createdAt
      }
    }
  }
`;

const ALL_POST_LIKES = gql`
  query Post_Likes {
    PostLikes {
      _id
      PostId
      User {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const SINGLE_POST = gql`
  query Single_Post($postId: ID!) {
    SinglePost(PostId: $postId) {
      _id
      PostId
      Title
      PostImage
      User {
        _id
        Firstname
        Lastname
        Image
      }
      createdAt
    }
  }
`;

const ALL_POST_COMMENTS = gql`
  query Post_Comments {
    PostComments {
      _id
      Body
      PostId
      CommentReference
      createdAt
      User {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const SHARE_POST_With_Friends = gql`
  mutation SharePostWith($shareData: shareData!) {
    Share(shareData: $shareData) {
      message
      success
    }
  }
`;

const SHARE_POST_WITH_GROUPS = gql`
  mutation SharePostWithGroup(
    $retweetData: retweetData!
    $groupInfo: GroupInfo
  ) {
    SharePostWithGroup(retweetData: $retweetData, GroupInfo: $groupInfo) {
      message
      success
    }
  }
`;

const RETWEET_POST = gql`
  mutation RetweetPost($retweetData: retweetData!) {
    Retweet(retweetData: $retweetData) {
      message
      success
    }
  }
`;

/* ----------------------->Mutations<------------------------- */
const Create_post = gql`
  mutation Create_Post($postData: postEntries, $picture: Upload) {
    CreatePost(postData: $postData, picture: $picture) {
      message
      success
    }
  }
`;

const POST_LIKES = gql`
  mutation Create_Likes($likesData: likesData!) {
    PostLikes(likesData: $likesData) {
      _id
      PostId
      User {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const POST_COMMENTS = gql`
  mutation Create_Comments($commentsData: commentsData!) {
    PostComments(commentsData: $commentsData) {
      _id
      PostId
      Body
      CommentReference
      createdAt
      User {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

const EDIT_POST = gql`
  mutation EditPost($editData: editPost!) {
    EditPost(editData: $editData) {
      message
      success
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($deletePostPostId: String!) {
    DeletePost(PostId: $deletePostPostId) {
      message
      success
    }
  }
`;

export {
  Create_post,
  POST_LIKES,
  POST_COMMENTS,
  Get_All_Post,
  ALL_POST_COMMENTS,
  ALL_POST_LIKES,
  SINGLE_POST,
  SHARE_POST_With_Friends,
  SHARE_POST_WITH_GROUPS,
  RETWEET_POST,
  EDIT_POST,
  DELETE_POST,
};

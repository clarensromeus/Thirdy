import { gql } from "@apollo/client";

/* ------------------------>Queries<----------------------------- */
const Get_All_Post = gql`
  query GetAllPosts {
    GetAllPosts {
      _id
      PostId
      Title
      PostImage
      Comments {
        _id
        PostId
        User {
          _id
          Firstname
          Lastname
          Image
        }
      }
      Likes {
        _id
        PostId
        User {
          _id
          Firstname
          Lastname
          Image
        }
      }
      User {
        _id
        Firstname
        Lastname
        Image
      }
      createdAt
      updatedAt
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
  mutation Create_Comment($commentsData: commentsData!) {
    PostComments(commentsData: $commentsData) {
      message
      success
    }
  }
`;

export { Create_post, POST_LIKES, POST_COMMENTS, Get_All_Post };

/* const Get_All_Post = gql`
  query GetAllPosts {
    GetAllPosts {
      _id
      PostId
      Title
      PostImage
      Likes {
        _id
        PostId
         User: {
          _id
          Firstname
          Lastname
          Image
        }
      }
      Comments {
        _id
        PostId
        User: {
          _id
          Firstname
          Lastname
          Image
        }
      }
      User {
        _id
        Firstname
        Lastname
      }
      createdAt
      updatedAt
    }
  }
`; */

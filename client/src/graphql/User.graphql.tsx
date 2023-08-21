import { gql } from "@apollo/client";

const USER_CONNECTION = gql`
  query connection($connectionInfo: connectionInfo!) {
    Connection(connectionInfo: $connectionInfo) {
      message
      success
      token
    }
  }
`;

const USER_REGISTERATION = gql`
  mutation Registeration($registerInfo: registerInfo!) {
    Registeration(registerInfo: $registerInfo) {
      message
      success
      token
    }
  }
`;

const Get_UserData = gql`
  query userData {
    userData {
      _id
      Firstname
      Lastname
      Email
      Password
      Image
      DOB
      Sex
      Bio
    }
  }
`;

export { USER_CONNECTION, USER_REGISTERATION, Get_UserData };

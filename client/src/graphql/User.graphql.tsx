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
  query userData($_id: ID!) {
    userData(_id: $_id) {
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

const Change_Profile = gql`
  mutation Change_User_Profile($file: Upload!, $id: String!) {
    ChangeProfile(file: $file, _id: $id) {
      message
      success
    }
  }
`;

export { USER_CONNECTION, USER_REGISTERATION, Get_UserData, Change_Profile };

import { gql } from "@apollo/client";

const GET_ALL_GROUPS = gql`
  query GetAllGroups {
    GetAllGroups {
      _id
      GroupCoverImage
      GroupName
      Privacy
      createdAt
    }
  }
`;

const GROUP_INFO = gql`
  query GroupInfo($groupName: String!, $groupId: ID!) {
    GroupInfo(groupName: $groupName, groupId: $groupId) {
      _id
      GroupName
      GroupCoverImage
      Privacy
      GroupUsers {
        _id
        Firstname
        Lastname
        Image
      }
    }
  }
`;

export { GET_ALL_GROUPS, GROUP_INFO };

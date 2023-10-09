import { gql } from "@apollo/client";

// a query with local only for determining if user is
// authenticated or not
export const IS_AUTH = gql`
  query Authentication {
    isLoggedIn @client
  }
`;

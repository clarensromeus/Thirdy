import { gql } from "graphql-tag";

export default gql`
  type Query {
    _: String
    hello: String!
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

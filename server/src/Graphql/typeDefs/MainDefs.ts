import { gql } from "graphql-tag";

export default gql`
  scalar Upload

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

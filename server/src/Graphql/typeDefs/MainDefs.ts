import { gql } from "graphql-tag";

export default gql`
  scalar Upload

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

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

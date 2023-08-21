import { gql } from "graphql-tag";

export default gql`
  scalar Upload

  extend type Query {
    uploads: String
  }

  extend type Mutation {
    singleUpload(file: Upload!): String
  }
`;

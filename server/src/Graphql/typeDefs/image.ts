import { gql } from "graphql-tag";

export default gql`
  extend type Query {
    uploads: String
  }

  extend type Mutation {
    singleUpload(file: Upload!, name: String, Email: String!): File
  }

  type File {
    serverUrl: String!
    success: Boolean!
  }
`;

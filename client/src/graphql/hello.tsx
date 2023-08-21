import { gql } from "@apollo/client";

const Get_hello = gql`
  query hello {
    hello
  }
`;
export default Get_hello;

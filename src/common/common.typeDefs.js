import { gql } from "apollo-server";

export default gql`
  type MutationOutput {
    ok: Boolean!
    error: String
  }
`;

import { gql } from "apollo-server-express";

export default gql`
  type createReplyResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createReply(commentId: Int!, payload: String!): createReplyResult!
  }
`;

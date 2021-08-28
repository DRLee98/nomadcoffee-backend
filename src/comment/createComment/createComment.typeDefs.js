import { gql } from "apollo-server-express";

export default gql`
  type createCommentResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createComment(shopId: Int!, payload: String!): createCommentResult!
  }
`;

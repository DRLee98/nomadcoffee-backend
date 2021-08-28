import { gql } from "apollo-server-express";

export default gql`
  type toggleLikeResult {
    ok: Boolean!
    error: String
    isLiked: Boolean
  }
  type Mutation {
    toggleLike(shopId: Int!): toggleLikeResult!
  }
`;

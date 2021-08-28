import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeReplies(commentId: Int!): [Reply!]
  }
`;

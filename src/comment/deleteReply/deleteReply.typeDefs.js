import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteReply(replyId: Int!): MutationOutput!
  }
`;

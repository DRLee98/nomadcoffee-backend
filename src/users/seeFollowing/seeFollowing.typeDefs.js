import { gql } from "apollo-server-express";

export default gql`
  type seeFollowingResult {
    ok: Boolean!
    error: String
    following: [User!]
    totalPage: Int!
  }
  type Query {
    seeFollowing(id: Int!, page: Int): seeFollowingResult!
  }
`;

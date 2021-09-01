import { gql } from "apollo-server-express";

export default gql`
  type seeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User!]
    totalPage: Int!
  }
  type Query {
    seeFollowers(id: Int!, page: Int): seeFollowersResult!
  }
`;

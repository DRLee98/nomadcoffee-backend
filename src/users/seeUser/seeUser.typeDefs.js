import { gql } from "apollo-server-express";

export default gql`
  type seeUserResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalFollowersPages: Int
    following: [User]
  }
  type Query {
    seeUser(id: Int!, followersPage: Int, followingLastId: Int): seeUserResult!
  }
`;

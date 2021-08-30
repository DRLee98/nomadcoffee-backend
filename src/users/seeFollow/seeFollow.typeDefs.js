import { gql } from "apollo-server-express";

export default gql`
  type seeFollowResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalFollowersPages: Int!
    following: [User]
    totalFollowingPages: Int!
  }
  type Query {
    seeFollow(
      id: Int!
      followersPage: Int
      followingPage: Int
    ): seeFollowResult!
  }
`;

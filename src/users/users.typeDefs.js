import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

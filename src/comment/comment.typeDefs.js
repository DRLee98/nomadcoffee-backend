import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    shop: CoffeeShop!
    user: User!
    totalReply: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Reply {
    id: Int!
    payload: String!
    user: User!
    comment: Comment!
    createdAt: String!
    updatedAt: String!
  }
`;

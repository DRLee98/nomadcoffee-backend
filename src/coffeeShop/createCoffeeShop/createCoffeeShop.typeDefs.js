import { gql } from "apollo-server-express";

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
    id: Int
    photoUrls: [String!]
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      address: String
      categories: String
      photos: [Upload]
    ): createCoffeeShopResult!
  }
`;

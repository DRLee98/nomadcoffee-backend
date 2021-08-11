import { gql } from "apollo-server-express";

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      categories: String
      photos: [Upload]
    ): createCoffeeShopResult!
  }
`;

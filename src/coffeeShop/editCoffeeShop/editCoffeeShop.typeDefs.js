import { gql } from "apollo-server-express";

export default gql`
  type editCoffeeShopResult {
    ok: Boolean!
    error: String
    photoUrls: [String!]
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      address: String
      categories: String
      photos: [Upload]
    ): editCoffeeShopResult!
  }
`;

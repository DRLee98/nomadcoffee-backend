import { gql } from "apollo-server-express";

export default gql`
  type searchCoffeeShopResult {
    totalPage: Int!
    totalCount: Int!
    shops: [CoffeeShop!]
  }
  type Query {
    searchCoffeeShop(word: String!, page: Int): searchCoffeeShopResult
  }
`;

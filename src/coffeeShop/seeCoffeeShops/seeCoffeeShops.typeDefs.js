import { gql } from "apollo-server-express";

export default gql`
  type seeCoffeeShopsResult {
    totalPage: Int!
    totalCount: Int!
    shops: [CoffeeShop!]
  }
  type Query {
    seeCoffeeShops(page: Int): seeCoffeeShopsResult
  }
`;

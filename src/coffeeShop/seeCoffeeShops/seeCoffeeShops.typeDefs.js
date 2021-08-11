import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCoffeeShops(page: Int): [CoffeeShop]
  }
`;

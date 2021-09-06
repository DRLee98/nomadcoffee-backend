import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopsCountPageResult {
    totalCount: Int!
    totalPage: Int!
  }
  type Query {
    coffeeShopsCountPage(page: Int): CoffeeShopsCountPageResult
  }
`;

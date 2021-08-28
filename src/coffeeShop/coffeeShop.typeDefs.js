import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    address: String
    user: User!
    photos: [CoffeeShopPhoto!]
    categories: [Category!]
    comments: [Comment!]
    totalLikes: Int!
    totalComments: Int!
    isLiked: Boolean!
  }
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop!]
    totalShops: Int!
  }
  type Like {
    id: Int!
    shop: CoffeeShop!
  }
`;

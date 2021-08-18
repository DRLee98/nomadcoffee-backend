import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({
        take: takeNum,
        skip: page ? (page - 1) * takeNum : 0,
        include: {
          user: true,
          photos: {
            select: { url: true },
          },
          categories: {
            select: { name: true, slug: true },
          },
        },
      }),
  },
};

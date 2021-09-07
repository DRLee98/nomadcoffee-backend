import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: takeNum,
        skip: page ? (page - 1) * takeNum : 0,
        include: {
          user: {
            select: { id: true, avatarURL: true, username: true },
          },
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

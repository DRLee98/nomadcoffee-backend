import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const totalCount = await client.coffeeShop.count();
      const totalPage = Math.ceil(totalCount / takeNum);
      const shops = await client.coffeeShop.findMany({
        take: takeNum,
        skip: page ? (page - 1) * takeNum : 0,
        include: {
          user: {
            select: { id: true, avatarURL: true },
          },
          photos: {
            select: { url: true },
          },
          categories: {
            select: { name: true, slug: true },
          },
        },
      });
      return {
        totalCount,
        totalPage,
        shops,
      };
    },
  },
};

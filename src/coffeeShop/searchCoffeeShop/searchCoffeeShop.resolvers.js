import client from "../../client";
import { takeNum } from "../../common/common.constants";

const searchTakeNum = takeNum * 3;

export default {
  Query: {
    searchCoffeeShop: async (_, { word, page }) => {
      try {
        const totalCount = await client.coffeeShop.count({
          where: {
            name: { contains: word },
          },
        });
        const totalPage = Math.ceil(totalCount / searchTakeNum);
        const shops = await client.coffeeShop.findMany({
          take: searchTakeNum,
          skip: page ? (page - 1) * searchTakeNum : 0,
          where: {
            name: { contains: word },
          },
          include: {
            photos: {
              select: { url: true },
            },
          },
        });
        return {
          totalCount,
          totalPage,
          shops,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error,
        };
      }
    },
  },
};

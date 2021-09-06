import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    coffeeShopsCountPage: async () => {
      const totalCount = await client.coffeeShop.count();
      const totalPage = Math.ceil(totalCount / takeNum);
      return {
        totalCount,
        totalPage,
      };
    },
  },
};

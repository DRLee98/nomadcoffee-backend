import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeCategory: (_, { slug, page }) =>
      client.category.findUnique({
        where: { slug },
        include: {
          shops: {
            take: takeNum,
            skip: page ? (page - 1) * takeNum : 0,
          },
        },
      }),
  },
};

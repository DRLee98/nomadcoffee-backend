import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeCategories: (_, { page }) =>
      client.category.findMany({
        take: takeNum,
        skip: page ? (page - 1) * takeNum : 0,
      }),
  },
};

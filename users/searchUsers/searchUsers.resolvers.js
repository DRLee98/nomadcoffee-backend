import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    searchUsers: (_, { searchTerm, page }) =>
      client.user.findMany({
        where: {
          OR: [
            {
              username: {
                startsWith: searchTerm,
              },
            },
            {
              username: {
                endsWith: searchTerm,
              },
            },
            {
              username: {
                contains: searchTerm,
              },
            },
          ],
        },
        take: takeNum,
        skip: page ? (page - 1) * takeNum : 0,
      }),
  },
};

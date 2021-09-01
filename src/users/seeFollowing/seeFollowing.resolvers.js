import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeFollowing: async (_, { id, page }) => {
      try {
        const user = await client.user.findUnique({ where: { id } });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const following = await user.following({
          take: takeNum,
          skip: page ? (page - 1) * takeNum : 0,
        });
        const totalPage = Math.ceil(user.totalFollowing / takeNum);
        return {
          ok: true,
          following,
          totalPage,
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

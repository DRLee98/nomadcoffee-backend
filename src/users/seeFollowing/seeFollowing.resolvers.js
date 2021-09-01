import client from "../../client";
import { takeNum } from "../../common/common.constants";

const followTakeNum = takeNum * 3;

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
        const following = await client.user
          .findUnique({ where: { id } })
          .following({
            take: followTakeNum,
            skip: page ? (page - 1) * followTakeNum : 0,
          });
        const totalFollowing = await client.user.count({
          where: { following: { some: { id } } },
        });
        const totalPage = Math.ceil(totalFollowing / followTakeNum);
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

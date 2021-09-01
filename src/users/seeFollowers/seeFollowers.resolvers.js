import client from "../../client";
import { takeNum } from "../../common/common.constants";

const followTakeNum = takeNum * 3;

export default {
  Query: {
    seeFollowers: async (_, { id, page }) => {
      try {
        const user = await client.user.findUnique({ where: { id } });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const followers = await user.followers({
          take: followTakeNum,
          skip: page ? (page - 1) * followTakeNum : 0,
        });
        const totalPage = Math.ceil(user.totalFollowers / followTakeNum);
        return {
          ok: true,
          followers,
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
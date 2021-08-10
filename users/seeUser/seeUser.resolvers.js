import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeUser: async (_, { id, followersPage, followingLastId }) => {
      try {
        const user = await client.user.findUnique({ where: { id } });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const followers = await user.followers({
          take: takeNum,
          skip: followersPage ? (followersPage - 1) * takeNum : 0,
        });
        const following = await user.following({
          take: takeNum,
          skip: followingLastId ? 1 : 0,
          ...(followingLastId && { cursor: { id: followingLastId } }),
        });
        const totalFollowersPages = Math.ceil(user.totalFollowers / takeNum);
        return {
          ok: true,
          followers,
          totalFollowersPages,
          following,
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

import client from "../../client";
import { takeNum } from "../../common/common.constants";

export default {
  Query: {
    seeFollow: async (_, { id, followersPage, followingPage }) => {
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
          skip: followingPage ? (followingPage - 1) * takeNum : 0,
        });
        const totalFollowersPages = Math.ceil(user.totalFollowers / takeNum);
        const totalFollowingPages = Math.ceil(user.totalFollowing / takeNum);
        return {
          ok: true,
          followers,
          totalFollowersPages,
          following,
          totalFollowingPages,
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

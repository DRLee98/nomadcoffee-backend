import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const exist = await client.user.findUnique({ where: { id } });
        if (!exist) {
          return {
            ok: false,
            error: "That user does not exist.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error,
        };
      }
    }),
  },
};

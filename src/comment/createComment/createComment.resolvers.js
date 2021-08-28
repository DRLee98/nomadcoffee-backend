import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectResolver(
      async (_, { shopId, payload }, { loggedInUser }) => {
        try {
          const coffeeShop = await client.coffeeShop.findUnique({
            where: { id: shopId },
          });
          if (!coffeeShop) {
            return {
              ok: false,
              error: "Coffee Shop not found.",
            };
          }
          const comment = await client.comment.create({
            data: {
              payload,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              shop: {
                connect: {
                  id: shopId,
                },
              },
            },
          });
          return {
            ok: true,
            id: comment.id,
          };
        } catch (error) {
          console.log(error);
          return {
            ok: false,
            error,
          };
        }
      },
    ),
  },
};

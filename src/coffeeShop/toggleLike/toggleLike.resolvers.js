import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectResolver(async (_, { shopId }, { loggedInUser }) => {
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
        const likeWhere = {
          userId_coffeeShopId: {
            userId: loggedInUser.id,
            coffeeShopId: shopId,
          },
        };
        const isLiked = await client.like.findUnique({
          where: likeWhere,
        });
        if (isLiked) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              shop: {
                connect: { id: shopId },
              },
            },
          });
        }
        return {
          ok: true,
          isLiked: !Boolean(isLiked),
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

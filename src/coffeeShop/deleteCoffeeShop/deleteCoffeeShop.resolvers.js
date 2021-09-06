import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            photos: {
              select: {
                url: true,
              },
            },
          },
        });
        if (!coffeeShop) {
          return {
            ok: false,
            error: "Coffee Shop not found.",
          };
        }
        if (coffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }
        await client.coffeeShopPhoto.deleteMany({
          where: {
            coffeeShopId: id,
          },
        });
        await client.like.deleteMany({
          where: {
            coffeeShopId: id,
          },
        });
        await client.reply.deleteMany({
          where: {
            comment: {
              coffeeShopId: id,
            },
          },
        });
        await client.comment.deleteMany({
          where: {
            coffeeShopId: id,
          },
        });
        await client.coffeeShop.delete({
          where: {
            id,
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

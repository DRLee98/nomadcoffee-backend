import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
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
            coffeeShopId: {
              some: {
                id,
              },
            },
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

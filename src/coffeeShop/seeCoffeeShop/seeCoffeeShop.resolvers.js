import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { id }) =>
      client.coffeeShop.findUnique({
        where: { id },
        include: {
          user: true,
          photos: {
            select: { url: true },
          },
          categories: {
            select: { name: true, slug: true },
          },
        },
      }),
  },
};

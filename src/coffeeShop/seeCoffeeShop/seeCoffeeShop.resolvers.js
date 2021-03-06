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
          comments: {
            select: {
              id: true,
              payload: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  avatarURL: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }),
  },
};

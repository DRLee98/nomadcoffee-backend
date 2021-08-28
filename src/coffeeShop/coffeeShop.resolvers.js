import client from "../client";

export default {
  CoffeeShop: {
    totalLikes: ({ id }) => client.like.count({ where: { shop: { id } } }),
    totalComments: ({ id }) =>
      client.comment.count({ where: { shop: { id } } }),
    isLiked: async ({ id }, _, { loggedInUser }) => {
      const isLiked = await client.like.findUnique({
        where: {
          userId_coffeeShopId: {
            userId: loggedInUser.id,
            coffeeShopId: id,
          },
        },
      });
      return Boolean(isLiked);
    },
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
  },
};

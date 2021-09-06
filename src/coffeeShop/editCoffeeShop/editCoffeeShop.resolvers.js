import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { getCategoryObj, getPhotoObj } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, address, categories, photos },
        { loggedInUser },
      ) => {
        try {
          const coffeeShop = await client.coffeeShop.findUnique({
            where: { id },
            include: {
              categories: true,
              photos: true,
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
          const categoryObj = getCategoryObj(categories);
          const photoObj = await getPhotoObj(photos);
          console.log(photoObj);
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              address,
              ...(categoryObj.length > 0 && {
                categories: {
                  disconnect: coffeeShop.categories.map((category) => ({
                    id: category.id,
                  })),
                  connectOrCreate: categoryObj,
                },
              }),
              ...(photoObj.length > 0 && {
                photos: {
                  deleteMany: {},
                  createMany: { data: photoObj },
                },
              }),
            },
          });
          const photoUrls = [];
          photoObj.forEach((photo) => photoUrls.push(photo.url));
          return {
            ok: true,
            ...(photoUrls.length > 0 && { photoUrls }),
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

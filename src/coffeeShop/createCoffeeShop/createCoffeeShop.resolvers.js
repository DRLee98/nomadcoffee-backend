import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { getCategoryObj, getPhotoObj } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { name, latitude, longitude, address, categories, photos },
        { loggedInUser },
      ) => {
        try {
          const categoryObj = getCategoryObj(categories);
          const photoObj = await getPhotoObj(photos);
          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              address,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoryObj.length > 0 && {
                categories: {
                  connectOrCreate: categoryObj,
                },
              }),
              ...(photoObj.length > 0 && {
                photos: {
                  createMany: { data: photoObj },
                },
              }),
            },
          });
          const photoUrls = [];
          photoObj.forEach((photo) => photoUrls.push(photo.url));
          console.log(photoUrls);
          return {
            ok: true,
            id: coffeeShop.id,
            photoUrls,
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

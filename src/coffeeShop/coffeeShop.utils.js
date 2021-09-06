import uploader from "../upload/upload.utils";

export const getCategoryObj = (categories) => {
  if (categories) {
    const categoriesList = categories.split(",") || [];
    const filterList = categoriesList.filter(
      (category) => category.trim() !== "",
    );
    return filterList.map((category) => {
      const name = category.trim();
      const slug = getSlug(name);
      if (name !== "") {
        return {
          where: { slug },
          create: { name, slug },
        };
      } else {
      }
    });
  }
  return [];
};

export const getSlug = (category) => {
  return category.replace(/ /gi, "_").toLowerCase();
};

export const getPhotoObj = async (photos) => {
  console.log(photos);
  if (photos) {
    return await Promise.all(
      photos.map(async (photo) => {
        const url = await uploader(photo);
        console.log(url);
        return { url };
      }),
    );
  }
  return [];
};

import uploader from "../upload/upload.utils";

export const getCategoryObj = (categories) => {
  if (categories) {
    const categoriesList = categories.split(",") || [];
    console.log(categoriesList);
    const filterList = categoriesList.filter(
      (category) => category.trim() !== "",
    );
    console.log(filterList);
    return filterList.map((category) => {
      console.log(category);
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

const getSlug = (category) => {
  console.log(category);
  return category.replaceAll(" ", "_").toLowerCase();
};

export const getPhotoObj = async (photos) => {
  if (photos) {
    return await Promise.all(
      photos.map(async (photo) => {
        const url = await uploader(photo);
        return { url };
      }),
    );
  }
  return [];
};

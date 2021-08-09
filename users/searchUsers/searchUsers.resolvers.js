import client from "../../client";

export default {
  Query: {
    searchUsers: (_, { searchTerm }) =>
      client.user.findMany({
        where: {
          OR: [
            {
              username: {
                startsWith: searchTerm,
              },
            },
            {
              username: {
                endsWith: searchTerm,
              },
            },
            {
              username: {
                contains: searchTerm,
              },
            },
          ],
        },
      }),
  },
};

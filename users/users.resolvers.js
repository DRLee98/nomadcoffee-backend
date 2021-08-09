import client from "../client";

const takeNum = 2;

export default {
  User: {
    following: ({ id }, { page }) =>
      client.user
        .findUnique({ where: { id } })
        .following({ skip: page ? (page - 1) * takeNum : 0, take: takeNum }),
    followers: ({ id }, { lastId }) =>
      client.user.findUnique({ where: { id } }).followers({
        skip: lastId ? 1 : 0,
        take: takeNum,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });
      return Boolean(exists);
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};

import client from "../../client";

export default {
  Query: {
    seeReplies: (_, { commentId }) =>
      client.reply.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          comment: {
            id: commentId,
          },
        },
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
      }),
  },
};

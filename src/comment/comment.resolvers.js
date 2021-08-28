import client from "../client";

export default {
  Comment: {
    totalReply: ({ id }) => client.reply.count({ where: { comment: { id } } }),
  },
};

import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createReply: protectResolver(
      async (_, { commentId, payload }, { loggedInUser }) => {
        try {
          const comment = await client.comment.findUnique({
            where: { id: commentId },
          });
          if (!comment) {
            return {
              ok: false,
              error: "Comment not found.",
            };
          }
          const reply = await client.reply.create({
            data: {
              payload,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              comment: {
                connect: {
                  id: commentId,
                },
              },
            },
          });
          return {
            ok: true,
            id: reply.id,
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

import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectResolver(
      async (_, { commentId }, { loggedInUser }) => {
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
          if (comment.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "Not authorized.",
            };
          }
          await client.reply.deleteMany({
            where: {
              comment: {
                id: commentId,
              },
            },
          });
          await client.comment.delete({
            where: {
              id: commentId,
            },
          });
          return {
            ok: true,
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

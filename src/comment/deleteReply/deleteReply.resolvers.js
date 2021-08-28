import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteReply: protectResolver(async (_, { replyId }, { loggedInUser }) => {
      try {
        const reply = await client.reply.findUnique({
          where: { id: replyId },
        });
        if (!reply) {
          return {
            ok: false,
            error: "Reply not found.",
          };
        }
        if (reply.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }
        await client.reply.delete({
          where: {
            id: replyId,
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
    }),
  },
};

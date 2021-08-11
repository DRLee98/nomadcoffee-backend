import bcrypt from "bcrypt";
import client from "../../client";
import uploader from "../../upload/upload.utils";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatar, password },
    ) => {
      try {
        const exist = await client.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                username,
              },
            ],
          },
        });
        if (exist) {
          return {
            ok: false,
            error: "This username/email is already taken.",
          };
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = await uploader(avatar);
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            password: hashPassword,
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
  },
};

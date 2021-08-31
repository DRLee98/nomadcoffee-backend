import bcrypt from "bcrypt";
import client from "../../client";
import uploader from "../../upload/upload.utils";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { username, email, name, location, avatar, password },
        { loggedInUser },
      ) => {
        try {
          let hashPassword = null;
          if (password) {
            hashPassword = await bcrypt.hash(password, 10);
          }
          const avatarURL = await uploader(avatar);
          const updatedUser = await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              username,
              email,
              name,
              location,
              ...(avatarURL && { avatarURL }),
              ...(password && { password: hashPassword }),
            },
          });
          if (updatedUser.id) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: "Could not update profile.",
            };
          }
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

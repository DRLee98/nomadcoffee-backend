import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
        return {
          ok: true,
          token,
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

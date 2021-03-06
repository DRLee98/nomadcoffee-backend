import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token || token === null) {
      return null;
    }
    const verifiedToken = await jwt.verify(token, process.env.PRIVATE_KEY);
    if (verifiedToken.id) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken.id },
      });
      if (user) {
        return user;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const protectResolver = (resolver) => (parent, args, context, info) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
  }
  return resolver(parent, args, context, info);
};

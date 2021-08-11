import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.token;
    return {
      loggedInUser: await getUser(token),
    };
  },
});

server.start().then(() => {
  const app = express();

  app.use("/static", express.static("files"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  app.listen({ port: PORT });

  console.log(`✅ Server is running on http://localhost:${PORT}/graphql`);
});

import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  const app = express();

  app.use("/static", express.static("files"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  app.listen({ port: PORT });

  console.log(`✅ Server is running on http://localhost:${PORT}/graphql`);
});

// server
//   .listen(PORT)
//   .then(() => console.log(`✅ Server is running on http://localhost:${PORT}`));

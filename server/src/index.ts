// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as mongoose from "mongoose";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import express, { Express } from "express";
import http from "http";

import { join } from "path";
import cors from "cors";
import bodyParser from "body-parser";
import consola from "consola";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
// internally crafted imports of resources
import { PORT } from "./Config/index.ts";
import { typeDefs, resolvers } from "./Graphql/index.ts";
import { URL } from "./Constants/index.ts";
import * as DB_Model from "./Models/index.ts";
import { REDIS_CLIENT } from "./Constants/Redis.ts";
import { ACCESS_TOKEN } from "./Config/index.ts";
import { userModel } from "./Models/User.ts";
import { IGetInfo } from "./typings/Auth.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// create express instance
const app: Express = express();

// create http server
const httpServer = createServer(app);

// create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer, // allow to run web socket over http
  path: "/graphql", // specify the path to run http server using web socket like(http://locahost:5000/graphql)
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => {
      // Returning an object will add that information to
      // contextValue, which all of our resolvers have access to.
      if (ctx.connectionParams?.authentication) {
        // grab the token from the client
        const token = ctx.connectionParams.authentication;

        if (!token)
          return {
            isAuth: false,
          };

        // if token exists decode it
        const DecodedToken = (await jwt.verify(
          `${token}`,
          `${ACCESS_TOKEN}`
        )) as Pick<IGetInfo<string>, "_id">;

        // a bad token is provided by the client
        // restrict the user permission on requests performed by subscription
        if (!DecodedToken)
          return {
            isAuth: false,
          };

        // check the user existence in the user document from Atlas db
        const user = await userModel
          .findOne()
          .where({ _id: DecodedToken._id })
          .select("_id Firstname Lastname");

        if (!user)
          return {
            isAuth: false,
          };

        // allow all permission if the client is successfully authenticated
        return { isAuth: true, user };
      }

      // token is not provided display an authorized client
      return { isAuth: false };
    },
  },
  wsServer
);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  formatError: (formattedError, error) => {
    // return invalidation error if a query  does not a schema
    // and many other apollo error enums can be user according
    // to your need
    if (
      formattedError?.extensions?.code ===
      ApolloServerErrorCode?.GRAPHQL_VALIDATION_FAILED
    ) {
      return {
        ...formattedError,
        message:
          "sorry try again and make sure that your query matches your schema",
      };
    }

    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
  },

  csrfPrevention: true,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// start the server
await server.start();
app.use(express.static(join(__dirname, "./Uploads")));
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true, // access-control-allow-credentials:true[]
  }),
  bodyParser.json(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressMiddleware(server)
);

const LaunchServer = async (): Promise<void> => {
  try {
    // database connection using mongoose
    await mongoose.connect(URL);
    // redis db connection
    await REDIS_CLIENT.connect();
    // message to display if db is successfully connected
    consola.success({ badge: true, message: "DB successfully connected" });
    await httpServer.listen({ port: PORT }, () =>
      consola.success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${PORT}/graphql`,
      })
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

LaunchServer();

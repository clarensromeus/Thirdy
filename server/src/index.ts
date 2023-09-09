// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as mongoose from "mongoose";
import express, { Express } from "express";
import http from "http";
import { join } from "path";
import { PubSub } from "graphql-subscriptions";
import cors from "cors";
import bodyParser from "body-parser";
import consola from "consola";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
// externally crafted imports of ressources
import { PORT } from "./Config/index.ts";
import { typeDefs, resolvers } from "./Graphql/index.ts";
import { URL } from "./Constants/index.ts";
import * as DB_Model from "./Models/index.ts";
import ReadToken from "./Utils/ReadToken.ts";
import { RequestWithUserRole } from "./typings/Auth.ts";
import { REDIS_CLIENT } from "./Constants/Redis.ts";

interface MyContext {
  user: RequestWithUserRole["user"];
  isAuth: RequestWithUserRole["isAuth"];
  [K: string]: any;
}

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// initializing Pubsub for executing asynchronous Graphql operations
const pubSub: PubSub = new PubSub();

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
        const user = ReadToken(`${ctx.connectionParams?.Authentication}`);
        return { pubSub, user };
      }

      return { pubSub };
    },
  },
  wsServer
);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
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

// initialiize the express instance
/* const app: Express = express();

const httpServer: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app); */

/* const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: true, // make file upload secure and unvulnerable
  // for proper server shutdown
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// create a static file for assets coming from image upload
app.use(express.static(join(__dirname, "./Uploads")));
app.use(ReadToken);
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true, // access-control-allow-credentials:true[]
  }),
  bordyParser.json(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const { user, isAuth }: RequestWithUserRole = await req;
      return {
        user,
        isAuth,
        ...DB_Model,
      };
    },
  })
); */

/* const LaunchServer = async (): Promise<void> => {
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

LaunchServer(); */

// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as mongoose from "mongoose";
import express, { Express } from "express";
import http from "http";
import { join } from "path";
import cors from "cors";
import bordyParser from "body-parser";
import consola from "consola";
// externally crafted imports of ressources
import { PORT } from "./Config/index.ts";
import { typeDefs, resolvers } from "./Graphql/index.ts";
import { URL } from "./Constants/index.ts";
import * as DB_Model from "./Models/index.ts";
import ReadToken from "./Utils/ReadToken.ts";
import { RequestWithUserRole } from "./typings/Auth.ts";
import { REDIS_CLIENT } from "./Constants/Redis.ts";
import __dirname from "./Service/GlobalVars.ts";

interface MyContext {
  user: RequestWithUserRole["user"];
  isAuth: RequestWithUserRole["isAuth"];
  [K: string]: any;
}
// initialiize the express instance
const app: Express = express();

const httpServer: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: true, // make file upload secure and unvulnerable
  // for proper server shutdown
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
// create a static file for assets coming from image upload
app.use(express.static(join(__dirname, "/Uploads")));
app.use(ReadToken);
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true, // access-control-allow-credentials:true[]
  }),
  bordyParser.json(),
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

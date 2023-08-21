import { DB_PASSWORD, DB_USER } from "../Config/index.ts";

const DBURL: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@thirdy.5ksb3do.mongodb.net/?retryWrites=true&w=majority`;

export default DBURL;

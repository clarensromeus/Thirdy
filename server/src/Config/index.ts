import { config, DotenvConfigOutput } from "dotenv";

type IEnv<T> = {
  PORT: T;
  DB_USER: T;
  DB_PASSWORD: T;
};

const { parsed }: DotenvConfigOutput = config();

export const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  Base_URL,
  URL = `${Base_URL}${PORT}`,
}: any = parsed;

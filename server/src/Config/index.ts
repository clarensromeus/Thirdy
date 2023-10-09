import { config, DotenvConfigOutput } from "dotenv";

const { parsed }: DotenvConfigOutput = config();

export const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  Base_URL,
  URL = `${Base_URL}${PORT}`,
  Cloud_Name,
  Api_Secret,
  Api_Key,
  EMAIL_PASS,
  EMAIL_USER,
}: any = parsed;

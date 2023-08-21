import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

export default __dirname;

// some variables are not global in es module like commonJs, so for the case they need
// to properly define

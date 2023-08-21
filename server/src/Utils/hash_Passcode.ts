import { promisify } from "util";
import bcryptjs from "bcryptjs";

// generate the salt
const BCRYPT_SALT: (salt?: number) => Promise<unknown> = promisify(
  bcryptjs.genSalt
).bind(bcryptjs);

// get passCode encoded
const BCRYPT_HASH: (
  passCode: string,
  hash: string | number
) => Promise<string> = promisify(bcryptjs.hash).bind(bcryptjs);

const BCRYPT_COMPARE: (
  firstPassCode: string,
  secondPassCode: string
) => Promise<boolean> = promisify(bcryptjs.compare).bind(bcryptjs);

// function helper to generate crypted passCode
const hashPassCode = async ({
  passCode,
}: {
  passCode: string;
}): Promise<string | undefined> => {
  try {
    // generating a salt of 10 bytes
    const salt: unknown = await BCRYPT_SALT(10);

    const hashPassCode: string = await BCRYPT_HASH(passCode, `${salt}`);

    if (typeof passCode === "undefined") return;

    return hashPassCode;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// function helper to compare crypted passCode
const Compare_hash = async ({
  passCode,
  newPassCode,
}: {
  passCode: string;
  newPassCode: string;
}) => {
  try {
    if (typeof passCode === "undefined") return false;
    if (typeof newPassCode === "undefined") return false;
    // compare passCodes for truthy and falsey case
    const isCompared: boolean = await BCRYPT_COMPARE(passCode, newPassCode);

    return isCompared;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { hashPassCode, Compare_hash };

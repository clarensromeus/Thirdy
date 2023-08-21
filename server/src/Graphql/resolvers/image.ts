import lodash from "lodash";
import { ReadStream, WriteStream, createWriteStream } from "fs";
import { join, parse, dirname } from "path";
import { fileURLToPath } from "url";
// externally crafted imports of ressources
import { Resolvers } from "../../__generate__/types";
import { URL } from "../../Config/index.ts";
import __dirname from "../../Service/GlobalVars.ts";

const {} = lodash;

export const Image = {
  Mutation: {
    singleUpload: async (__: any, { file }: any) => {
      console.log(file);
      /* console.log(file);
      let { filename, createReadStream } = await file;
      // extract out the name and extension of the filename
      let { name, ext } = parse(filename);

      const stream = await createReadStream();
      // retrieve the file name and replace all numbers, letters and white space with a simple dash
      name = name.replace(/^[A-Z0-9]+[/d]/, "-");

      // create the server file
      let serverFile = join(
        __dirname,
        `../../Uploads/${name}-${new Date()}-${ext}`
      );

      // write the file
      const writeFileStream = await createWriteStream(serverFile);
      // use pipe to read the file in chain
      stream.pipe(writeFileStream);

      serverFile = `${URL}/${serverFile.split("Uploads")[1]}`; */

      return "file is uploading with success";
    },
  },
};

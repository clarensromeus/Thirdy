import lodash from "lodash";
import { dirname } from "path";
import { fileURLToPath } from "url";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
// externally crafted imports of ressources
import { Resolvers } from "../../__generate__/types";
import UploadFile from "../../Service/ImageUpload.ts";
import { ImageType } from "../../typings/upload.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

export const Image: Resolvers = {
  // This maps the Upload scalar to the implementation provided
  // by the graphql-upload package.
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (__, { file, name, Email }) => {
      const { success, secureUrl, serverUrl, public_id }: ImageType<string> =
        await UploadFile(file, true, __dirname, "Thirdy_social");

      return { success, serverUrl };
    },
  },
};

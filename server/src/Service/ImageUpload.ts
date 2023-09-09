import lodash from "lodash";
import { parse, join } from "path";
import { createWriteStream, WriteStream, ReadStream } from "fs";
import { nanoid } from "nanoid";
// externally crafted imports of ressources
import { URL } from "../Config/index.ts";
import { ImageType } from "../typings/upload.ts";
import { cloudinary } from "../Utils/Cloudinary.ts";

const { replace } = lodash;

const UploadFile = async (
  file: any,
  success: boolean,
  __dirname: string,
  folder_name: string
): Promise<ImageType<string>> => {
  try {
    const { filename, createReadStream } = await file;

    const stream: ReadStream = await createReadStream();

    let { name, ext } = parse(filename);

    name = replace(name, /([^A-Z0-9]+\s)/gi, "-");

    let serverUrl: string = join(
      __dirname,
      `../../Uploads/${name}-${Date.now()}-$${ext}`
    );
    const writeStream: WriteStream = await createWriteStream(serverUrl);

    stream.pipe(writeStream);

    const imageName: string = serverUrl.split("Uploads")[1];

    serverUrl = `${URL}${imageName}`;

    // upload to cloudinary
    return new Promise(async (resolve, reject) => {
      const cloudStream = await cloudinary.uploader.upload_stream(
        { upload_preset: folder_name, public_id: `${nanoid()}` },
        function (err, fileUpload) {
          // In case something hit the fan
          if (err) {
            reject(err);
          }

          // All good then display desired data
          resolve({
            serverUrl,
            secureUrl: `${fileUpload?.secure_url}`,
            public_id: `${fileUpload?.public_id}`,
            success,
          });
        }
      );

      await stream.pipe(cloudStream);
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default UploadFile;

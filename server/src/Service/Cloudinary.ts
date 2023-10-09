import { cloudinary } from "../Utils/Cloudinary.ts";
import { unlink } from "fs";

const DeleteFile = <T extends string>({
  public_id,
  imagePath,
}: {
  public_id: T;
  imagePath: T;
}) => {
  try {
    new Promise<string>(async function (resolve, reject) {
      const cloudImage = await cloudinary.uploader.destroy(`${public_id}`);
      if (cloudImage) {
        unlink(imagePath, (error) => {
          if (error) console.log(error);
        });
        resolve("file is deleted with success");
      } else {
        reject("sorry no file is deleted");
      }
    });
  } catch (error) {
    new Error(`${error}`);
  }
};

export default DeleteFile;

// handler relating to deleting images from a particular cloud or the system like
//  like mongodb Atlas or Cloudinary

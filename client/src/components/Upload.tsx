import { result, assignIn, isMatchWith, setWith } from "lodash";
import { IFile, IUpload } from "../typings/Profile";

const Matching = (valid: boolean) => {
  // if file is valid proceed on to
  if (valid) {
    return true;
  }
};

const uploadFile = (FileInfo: IFile): IUpload => {
  // retrieve the file info from file
  const files: IFile["FileInfo"] = assignIn(result(FileInfo, "FileInfo"));

  if (isMatchWith(files, { valid: true }, Matching)) {
    const uploadData: IFile["FileInfo"] = setWith(
      files,
      "ImageInfo",
      {
        previewImage: URL.createObjectURL(files.file?.[0]),
        singleFile: files.file?.[0],
      },
      Object
    );

    return uploadData;
  }
};

export default uploadFile;

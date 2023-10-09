import * as React from "react";

interface IFrame {
  openFrame: boolean;
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  Image: string;
  userId: string;
}

interface IFile {
  FileInfo: {
    file: FileList;
    valid: boolean;
    ImageInfo?: {
      singleFile: File;
      previewImage: string;
    };
  };
}

type IUpload = IFile["FileInfo"] | undefined;

export type { IFrame, IFile, IUpload };

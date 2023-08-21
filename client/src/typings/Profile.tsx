import * as React from "react";

interface IFrame {
  openFrame: boolean;
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  Image: string;
}

export type { IFrame };

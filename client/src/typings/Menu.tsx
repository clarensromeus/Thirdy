import * as React from "react";

interface IMenu {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  open: boolean;
}

export type { IMenu };

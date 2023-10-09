import * as React from "react";

interface IMenu {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ILogOutProps = {
  Icon: React.ReactElement | null;
  RouteName: string;
};

type ILogOut = {
  mode: string;
};

export type { IMenu, ILogOutProps, ILogOut };

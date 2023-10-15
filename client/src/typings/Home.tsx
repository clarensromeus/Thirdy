interface IDrawer<T> {
  Text: T;
  DrawerIcon: any;
  Path: T;
}

interface IContact<S> {
  Firstname: S;
  Lastname: S;
  Image: S;
  Date: S;
}

interface IMenuProfile {
  RouteName: string;
  Icon: React.ReactElement;
}

interface ICommentProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  PostId: string;
}

interface IpopOver {
  anchorElSearch: any | null;
  setAnchorElSearch: React.Dispatch<React.SetStateAction<any | null>>;
  search?: string;
}

export type { IDrawer, IContact, IMenuProfile, ICommentProps, IpopOver };

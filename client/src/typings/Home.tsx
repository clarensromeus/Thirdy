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

export type { IDrawer, IContact, IMenuProfile };

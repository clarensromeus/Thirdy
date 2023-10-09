interface IFriendStatus {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Iuser<S> = {
  password: S;
  email: S;
  code: S;
};

export type { IFriendStatus, Iuser };

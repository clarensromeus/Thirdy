interface IChat {
  __typename?: "chatResponse";
  _id: any;
  public_id?: string | null;
  PicturedMessage?: string | null;
  Chat?: string | null;
  createdAt?: string | null;
  To?: {
    typename?: "User";
    _id: any;
    Firstname?: string | null;
    Lastname?: string | null;
    Image?: string | null;
  } | null;
  From?: {
    typename?: "User";
    _id: any;
    Firstname?: string | null;
    Lastname?: string | null;
    Image?: string | null;
  } | null;
}

interface IUserChat {
  Chat: IChat[];
}

type IfriendData = {
  _id: string;
  Firstname: string;
  Lastname: string;
  Image: string;
  OnlineStatus: string;
};

type ContextType = {
  friendData: IfriendData | null;
};

export type { IUserChat, IfriendData, ContextType };

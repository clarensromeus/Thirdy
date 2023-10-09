interface IActions {
  Icon: any;
  Title: string;
}

interface IChat {
  __typename?: "ChatsIngroup";
  _id: any;
  Chat?: string | null;
  ChatPlacement: number;
  public_id?: string | null;
  PicturedMessage?: string | null;
  createdAt?: string | null;
  From?: {
    __typename?: "User";
    _id: any;
    Firstname?: string | null;
    Lastname?: string | null;
    Image?: string | null;
  } | null;
  To?: { __typename?: "groupData"; _id: any; GroupName?: string | null } | null;
}

interface IGroupChat {
  ChatWithFriendsInGroups: IChat[];
}

export type { IActions, IGroupChat };

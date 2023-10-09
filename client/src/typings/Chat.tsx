import React from "react";

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

interface IBottomChatProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userId: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}

interface ISendImage {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  Info: {
    from: string;
  };
  ImageInfo: {
    IsValid: boolean;
    setValid: React.Dispatch<React.SetStateAction<boolean>>;
    PreviewImage: string;
    Image: File | undefined;
  };
}

export type {
  IUserChat,
  IfriendData,
  ContextType,
  IBottomChatProps,
  ISendImage,
};

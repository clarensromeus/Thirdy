import React from "react";

interface IPostFrame {
  openFrame: boolean;
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  UserInfo: {
    _id: string;
    Firstname: string;
    Lastname: string;
    Image: string;
    Email: string;
  };
}

interface User<S> {
  _id: S;
  Firstname: S;
  Lastname: S;
  Image: S;
}

interface SharedRating {
  PostId: string;
  User: User<string>;
}

interface Likes {
  PostId: string;
  Preference: string;
  User: User<string>;
}

interface Comments {
  PostId: string;
  Body: string;
  CommentReference: string;
  User: User<string>;
}

interface Ipost<T> {
  _id: T;
  PostImage?: T;
  PostId?: T;
  PublicId?: T;
  Title?: T;
  PostReference: T;
  isRetweeted: boolean;
  User?: User<T>;
  createdAt: T;
  updatedAt: T;
  SharedRating?: SharedRating;
  Likes?: Likes;
  Comments: Comments;
}

interface PostLikes {
  __typename?: "Likes";
  _id?: any;
  PostId?: string;
  User?: {
    __typename?: "User";
    _id: any;
    Firstname?: string;
    Lastname?: string;
    Image?: string;
  };
}

interface IPostLikes {
  PostLikes: PostLikes[];
}

interface IRetweetProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  PostInfo: {
    _id: string;
    PostId: string;
    Image: string;
    Title: string;
    userId?: string;
  };
}

interface IShareDataWithFriend {
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  openFrame: boolean;
  _id: string;
  PostInfo: {
    PostId: string;
    Image: string;
    Title: string;
    userId: string;
  };
}

interface IShareDataWithGroup {
  setOpenGroupFrame: React.Dispatch<React.SetStateAction<boolean>>;
  openGroupFrame: boolean;
  id: string;
  GroupInfo: {
    _id: string;
    PostId: string;
    Title: string;
    userId: string;
  };
}

interface EditFrameProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    userId: string;
    firstname: string;
    lastname: string;
    Email: string;
    Image: string;
  };
  postInfo: {
    id: string;
    PostId: string;
    PostImage: string;
    PostTitle: string;
  };
}

interface ISendImageFrameProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface ImoreActionProps<T> {
  id: T;
  PostId: T;
  PostTitle: T;
  PostImage: T;
}

export type {
  IPostFrame,
  Ipost,
  IRetweetProps,
  IShareDataWithFriend,
  IShareDataWithGroup,
  IPostLikes,
  ISendImageFrameProps,
  EditFrameProps,
  ImoreActionProps,
};

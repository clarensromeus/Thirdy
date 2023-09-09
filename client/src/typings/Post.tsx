import React from "react";

interface IPostFrame {
  openFrame: boolean;
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  UserInfo: {
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

interface IRetweetProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

interface ISharewithData {
  setOpenFrame: React.Dispatch<React.SetStateAction<boolean>>;
  openFrame: boolean;
}

export type { IPostFrame, Ipost, IRetweetProps, ISharewithData };

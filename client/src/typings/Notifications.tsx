import React from "react";
import { NotiReference } from "../Enums";

interface INotiPopperProps {
  openNoti: boolean;
  anchorElNoti: null | HTMLElement;
  setAnchorElNoti: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

type INotiData<S> = {
  ReceiverId?: S;
  GroupUserId?: S;
  SenderInfo: S;
  isGroup?: boolean;
  isSeen?: boolean;
  NotiReference: NotiReference;
  NotiEngine: {
    GroupName: S;
    NotiText: S;
    NotiImage: S;
  };
};

type defaultNotiProp = {
  userId?: string;
};

type SendNotification = {
  __typename?: "Notifications";
  _id: any;
  isSeen?: boolean | null;
  isGroup: boolean;
  ReceiverId?: string | null;
  NotiReference?: string | null;
  createdAt?: any | null;
  SenderInfo?: {
    __typename?: "User";
    _id: any;
    Firstname?: string | null;
    Lastname?: string | null;
    Image?: string | null;
  } | null;
  NotiEngine?: {
    __typename?: "Engine";
    GroupName?: string | null;
    NotiText?: string | null;
    NotiImage?: string | null;
  } | null;
};

type INoti = {
  SendNotification: SendNotification[];
};

type IRealTimeNoti = {
  Notifications: SendNotification[];
};

interface IRealTime_Notification {
  state: INoti["SendNotification"];
  setState: React.Dispatch<React.SetStateAction<INoti["SendNotification"]>>;
}

type ICard = {
  width: number | string;
  PostId: string;
  userId?: string;
};

export type {
  INotiPopperProps,
  INotiData,
  defaultNotiProp,
  IRealTime_Notification,
  ICard,
  INoti,
  IRealTimeNoti,
};

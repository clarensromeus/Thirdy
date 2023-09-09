import { getModelForClass } from "@typegoose/typegoose";

import { User } from "./User.ts";
import { Friend } from "./Friends.ts";
import { Group } from "./Groups.ts";
import { Like } from "./Likes.ts";
import { Post } from "./Post.ts";
import { Retweeted } from "./Retweeted.ts";
import { Share } from "./Shared.ts";
import { Chat } from "./Chat.ts";
import { Comments } from "./Comments.ts";
import { GroupChat } from "./GroupChat.ts";
import { Status } from "./Status.ts";

const likeModel = getModelForClass(Like);
const userModel = getModelForClass(User);
const friendModel = getModelForClass(Friend);
const groupModel = getModelForClass(Group);
const postModel = getModelForClass(Post);
const retweetedModel = getModelForClass(Retweeted);
const sharedModel = getModelForClass(Share);
const chatModel = getModelForClass(Chat);
const commentModel = getModelForClass(Comments);
const groupChatModel = getModelForClass(GroupChat);
const statusModel = getModelForClass(Status);

export {
  likeModel,
  userModel,
  friendModel,
  groupModel,
  postModel,
  retweetedModel,
  sharedModel,
  chatModel,
  commentModel,
  groupChatModel,
  statusModel,
};

import UserResolver from "./User.ts";
import { Image } from "./image.ts";
import Post from "./Posts.ts";
import Chat from "./Chat.ts";
import Friends from "./Friends.ts";
import UserStatus from "../typeDefs/UserStatus.ts";
import Group from "./Groups.ts";
import Notifications from "./Notifications.ts";

export default [UserResolver, Image, Post, Friends, Chat, Group, Notifications];

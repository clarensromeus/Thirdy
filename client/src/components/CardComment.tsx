import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import blue from "@mui/material/colors/blue";
import { useMutation, useQuery } from "@apollo/client";
import { isUndefined, get, pick, isNil, last, isEqual, slice } from "lodash";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRecoilValue } from "recoil";
import { useReactiveVar } from "@apollo/client";
// internally crafted imports of resources
import {
  Single_PostQuery,
  Single_PostQueryVariables,
} from "../__generated__/graphql";
import { SINGLE_POST } from "../graphql/Posts.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import {
  Create_LikesMutation,
  Create_LikesMutationVariables,
  Post_LikesQuery,
  Post_LikesQueryVariables,
  Post_CommentsQuery,
  Post_CommentsQueryVariables,
} from "../__generated__/graphql";
import {
  POST_LIKES,
  ALL_POST_COMMENTS,
  ALL_POST_LIKES,
} from "../graphql/Posts.graphql";
import { IPostLikes } from "../typings/Post";
import { IMode } from "../typings/GlobalState";
import modeContext from "../store/ModeContext";
import useNotification from "../hooks/useNotifications";
import { ICard } from "../typings/Notifications";
import { NotiReference } from "../Enums";
import { Authentication } from "../Global/GlobalAuth";
import LastLikesPerson from "./LastLikesPerson";
import { ILastLIkes } from "../typings/Post";

export default function CardComment({
  width,
  PostId,
  userId,
}: ICard): JSX.Element {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const { PushNotification, CreateNotification } = useNotification(`${userId}`);
  const isAuth = useReactiveVar(Authentication);

  /*________Queries helpers___________ */
  const { data: allLikesData } = useQuery<
    Post_LikesQuery,
    Post_LikesQueryVariables
  >(ALL_POST_LIKES);

  const { data: allCommentsData } = useQuery<
    Post_CommentsQuery,
    Post_CommentsQueryVariables
  >(ALL_POST_COMMENTS);

  const { data } = useQuery<Single_PostQuery, Single_PostQueryVariables>(
    SINGLE_POST,
    { variables: { postId: PostId } }
  );

  /*________ Mutations helpers__________*/
  const [addLikes] = useMutation<
    Create_LikesMutation,
    Create_LikesMutationVariables
  >(POST_LIKES);

  /* ___________Component logics_____________ */

  // it allows to have access to actual date from dayjs
  dayjs.extend(relativeTime);

  // push real time notification
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  // only user related data
  const User = get(data?.SinglePost, "User");
  // only post related data
  const PostInfo = pick(data?.SinglePost, ["PostImage", "Title", "createdAt"]);
  // date from the time which the post was released
  const date: string = dayjs(`${PostInfo.createdAt}`).fromNow();

  // post related likes
  const likes = allLikesData?.PostLikes.filter(
    (likes) => likes.PostId === PostId
  );
  // post related comments
  const comments = allCommentsData?.PostComments.filter(
    (comments) => comments.PostId === PostId
  );

  // grab the last post comment
  const LastComment = last(comments);

  // grab the last three comments
  const LastThreeLikes = slice(likes);

  const LastLikesData: ILastLIkes = {
    likes: {
      Likes: LastThreeLikes,
    },
  };

  return (
    <>
      <Card sx={{ maxWidth: width, borderRadius: 3, mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={`${User?.Image}`}
            >
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={
            <Typography fontWeight="bold" textTransform="capitalize">
              {User?.Firstname} {User?.Lastname}
            </Typography>
          }
          subheader={date}
        />
        <CardContent sx={{ py: 0, my: 0 }}>
          <Typography sx={{ fontSize: "16px" }}>{PostInfo.Title}</Typography>
        </CardContent>
        {!isNil(PostInfo.PostImage) && (
          <CardMedia
            component="img"
            sx={{ objectFit: "cover", pt: 1 }}
            image={`${PostInfo.PostImage}`}
            alt="Paella dish"
          />
        )}

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box>
              <Avatar
                alt=""
                src="https://image.shutterstock.com/image-photo/portrait-happy-mid-adult-man-260nw-1812937819.jpg"
              />
            </Box>
            <Box
              p={2}
              sx={{
                maxWidth: 200,
                wordBreak: "break-word",
                bgcolor: isEqual(mode.mode, "light")
                  ? "#E8F0FE"
                  : "rgb(255, 255, 255, 0.2)",
                borderRadius: 3,
              }}
            >
              <Box>
                <Typography fontWeight="540" fontSize="15px">
                  {LastComment?.User?.Firstname} {LastComment?.User?.Lastname}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {LastComment?.Body}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
          <LastLikesPerson {...LastLikesData} />
        </Box>
        <Divider />
        <CardActions
          sx={{
            width: "inherit",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              ":hover": { bgcolor: "#E8F0FE" },
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              disableFocusRipple
              disableRipple
              aria-label="add to favorites"
              onClick={async (evt: React.MouseEvent<HTMLButtonElement>) => {
                try {
                  evt.preventDefault();
                  await addLikes({
                    variables: {
                      likesData: {
                        PostId,
                        Preference: "likes",
                        User: `${AuthInfo.Data?._id}`,
                      },
                    },
                    optimisticResponse: {
                      PostLikes: {
                        __typename: "Likes",
                        _id: `${nanoid()}`,
                        PostId: `${PostId}`,
                        User: {
                          _id: `${AuthInfo.Data?._id}`,
                          Firstname: `${AuthInfo.Data?.Firstname}`,
                          Lastname: `${AuthInfo.Data?.Lastname}`,
                          Image: `${AuthInfo.Data?.Image}`,
                        },
                      },
                    },
                    onCompleted: async () => {
                      try {
                        await CreateNotification({
                          ReceiverId: `${User?._id}`,
                          SenderInfo: `${AuthInfo.Data?._id}`,
                          isGroup: false,
                          isSeen: false,
                          NotiEngine: {
                            GroupName: "",
                            NotiImage: "",
                            NotiText: "likes or dislikes  your post",
                          },
                          NotiReference: likes
                            ?.map((likes) => likes?.User?._id)
                            .includes(`${AuthInfo.Data?._id}`)
                            ? NotiReference.Dislike
                            : NotiReference.Like,
                        });
                      } catch (error) {
                        throw new Error(`${error}`);
                      }
                    },
                    update: (cache, { data }) => {
                      const cacheData: IPostLikes | null = cache.readQuery({
                        query: ALL_POST_LIKES,
                      });

                      const allRelatedPosts = cacheData?.PostLikes.filter(
                        (likes) => {
                          return likes.PostId === data?.PostLikes?.PostId;
                        }
                      );

                      const isUserAlreadyLike = allRelatedPosts
                        ?.map((likes) => likes.User?._id)
                        .includes(`${AuthInfo.Data?._id}`);

                      if (isUserAlreadyLike) {
                        const userlikeId = allRelatedPosts?.filter((likes) => {
                          return (
                            likes.User?._id === `${data?.PostLikes?.User?._id}`
                          );
                        })[0];
                        // if post is already liked by the user
                        // remove the user
                        cache.writeQuery({
                          query: ALL_POST_LIKES,
                          data: {
                            PostLikes: cacheData?.PostLikes.filter((likes) => {
                              return likes._id !== userlikeId?._id;
                            }),
                          },
                        });
                      } else {
                        // else add another like
                        if (cacheData) {
                          cache.writeQuery({
                            query: ALL_POST_LIKES,
                            data: {
                              PostLikes: [
                                ...cacheData.PostLikes,
                                data?.PostLikes,
                              ],
                            },
                          });
                        }
                      }
                    },
                  });
                } catch (error) {
                  throw new Error(`${error}`);
                }
              }}
            >
              <ThumbUpOffAltIcon
                sx={{
                  color: likes
                    ?.map((likes) => likes?.User?._id)
                    .includes(`${AuthInfo.Data?._id}`)
                    ? blue[700]
                    : null,
                }}
              />
            </IconButton>
            <Typography
              sx={{
                color: likes
                  ?.map((likes) => likes?.User?._id)
                  .includes(`${AuthInfo.Data?._id}`)
                  ? blue[700]
                  : null,
              }}
              component="span"
            >
              {isUndefined(likes) || likes.length === 0 ? 0 : likes.length}k
            </Typography>
          </Box>
          <Box
            sx={{
              ":hover": { bgcolor: "#E8F0FE" },
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton disableFocusRipple disableRipple aria-label="comments">
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <span>
              {isUndefined(comments) || comments.length === 0
                ? 0
                : comments.length}
              k
            </span>
          </Box>
          <Box
            sx={{
              ":hover": { bgcolor: "#E8F0FE" },
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton disableFocusRipple disableRipple>
              <ReplyAllIcon />
            </IconButton>
            <span>23</span>
          </Box>
        </CardActions>
        <Divider />
      </Card>
    </>
  );
}

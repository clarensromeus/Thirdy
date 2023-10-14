import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { red, grey, lightBlue } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import blue from "@mui/material/colors/blue";
import { useMutation, useQuery } from "@apollo/client";
import { CircleLoader } from "react-spinners";
import {
  upperFirst,
  isUndefined,
  isNil,
  last,
  slice,
  gt,
  size,
  isBoolean,
  isEqual,
  isEmpty,
} from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
// internally crafted imports of resources
import { CssTextField } from "./MuiStyles";
import { StyledBadgeComment } from "./MuiStyles";
import {
  Create_LikesMutation,
  Create_CommentsMutation,
  Create_LikesMutationVariables,
  Create_CommentsMutationVariables,
  Post_LikesQuery,
  Post_LikesQueryVariables,
  Post_CommentsQuery,
  Post_CommentsQueryVariables,
  UserStatisticsQuery,
  UserStatisticsQueryVariables,
} from "../__generated__/graphql";
import {
  POST_COMMENTS,
  POST_LIKES,
  ALL_POST_COMMENTS,
  ALL_POST_LIKES,
} from "../graphql/Posts.graphql";
import { USER_STATISTICS } from "../graphql/User.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import randomName from "../utils/Random";
import { IRetweetProps } from "../typings/Post";
import Retweet from "./SharePost";
import { IPostLikes } from "../typings/Post";
import { ICommentProps } from "../typings/Home";
import Comment from "../routes/Comments";
import MoreAction from "./More";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import useNotification from "../hooks/useNotifications";
import { ICard } from "../typings/Notifications";
import { ImoreActionProps } from "../typings/Post";
import { NotiReference } from "../Enums";
import { Authentication } from "../Global/GlobalAuth";
import LastLikesPerson from "./LastLikesPerson";
import { ILastLIkes } from "../typings/Post";

export default function ProfileCard({ width }: ICard) {
  /* ___________Component logics_____________ */

  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const isAuth = useReactiveVar(Authentication);

  const [body, setBody] = React.useState<string>("");

  const [state, setState] = React.useState<boolean>(false);
  const [postId, setPostId] = React.useState<string>("");
  const [Info, setInfo] = React.useState<IRetweetProps["PostInfo"]>({
    _id: "",
    PostId: "",
    Image: "",
    Title: "",
  });

  // it allows to have access to actual date from dayjs
  dayjs.extend(relativeTime);

  // notification handlers
  const { CreateNotification, PushNotification } = useNotification(
    `${AuthInfo.Data?._id}`
  );

  // push real time notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  const CommentProps: ICommentProps = {
    state,
    setState,
    PostId: postId,
  };

  let { id } = useParams<{ id: string }>();

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as typeof evt.target & {
      value: { value: string };
    };

    setBody(target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const retweetData: IRetweetProps = {
    anchorEl,
    open,
    setAnchorEl,
    PostInfo: Info,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  /*______Queries helpers___________ */

  const { data, loading } = useQuery<
    UserStatisticsQuery,
    UserStatisticsQueryVariables
  >(USER_STATISTICS, {
    variables: { userStaticsUserId: `${id}` },
  });

  const { data: allLikesData } = useQuery<
    Post_LikesQuery,
    Post_LikesQueryVariables
  >(ALL_POST_LIKES);

  const { data: allCommentsData } = useQuery<
    Post_CommentsQuery,
    Post_CommentsQueryVariables
  >(ALL_POST_COMMENTS);

  /*________ Mutations helpers__________*/
  const [addLikes] = useMutation<
    Create_LikesMutation,
    Create_LikesMutationVariables
  >(POST_LIKES);

  const [addComments] = useMutation<
    Create_CommentsMutation,
    Create_CommentsMutationVariables
  >(POST_COMMENTS);

  return (
    <>
      <Retweet {...retweetData} />
      <Comment {...CommentProps} />
      {loading && isUndefined(data?.userStatics?.posts) ? (
        <Box
          sx={{
            maxWidth: width,
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <CircleLoader
            color="black"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        data?.userStatics?.posts?.map((value, index) => {
          const {
            _id,
            PostId,
            PostImage,
            User,
            Title,
            createdAt,
            isRetweeted,
            RetweetedPost,
          } = value;

          const likes = allLikesData?.PostLikes.filter(
            (likes) => likes.PostId === PostId
          );

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

          // date from the time which the post was released
          const date: string = dayjs(`${createdAt}`).fromNow();

          const moreActionData: ImoreActionProps<string> = {
            id: _id,
            PostId: PostId,
            PostTitle: `${Title}`,
            PostImage: `${PostImage}`,
          };

          return (
            <React.Fragment key={index}>
              <Card
                key={index}
                sx={{ maxWidth: width, borderRadius: 3, mb: 2 }}
                elevation={isEqual(mode.mode, "light") ? 1 : 4}
              >
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
                  action={<MoreAction {...moreActionData} />}
                  title={
                    <Typography fontWeight="bold">
                      {upperFirst(`${User?.Firstname}`)} {User?.Lastname}
                    </Typography>
                  }
                  subheader={`${date}`}
                />
                <CardContent sx={{ py: 0, my: 0 }}>
                  <Typography sx={{ fontSize: "16px" }}>{Title}</Typography>
                </CardContent>
                {isBoolean(isRetweeted) && isEqual(isRetweeted, true) ? (
                  <CardMedia
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: 2,
                        width: {
                          xs: "94%",
                          sm: "94%",
                          md: `max(${470},${300})`,
                          lg: `max(${470},${300})`,
                        },
                        boxShadow: 0,
                        m: 0,
                        p: 0,
                        border: isEqual(mode.mode, "light")
                          ? `1px solid ${grey[100]}`
                          : `1px solid ${grey[700]}`,
                        boxSizing: "border-box",
                      }}
                      elevation={4}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            src={`${RetweetedPost?.User?.Image}`}
                          />
                        }
                        title={
                          <span>
                            {`${RetweetedPost?.User?.Firstname} ${RetweetedPost?.User?.Lastname}`}
                          </span>
                        }
                        subheader={dayjs(
                          `${RetweetedPost?.createdAt}`
                        ).fromNow()}
                      />
                      <CardContent sx={{ pt: 0, my: 0 }}>
                        <Typography variant="body2" fontSize="15px">
                          {RetweetedPost?.Title}
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ objectFit: "cover" }}
                        image={`${RetweetedPost?.PostImage}`}
                        alt="Paella dish"
                      />
                      <CardActions
                        sx={{
                          display: "flex",
                          bgcolor: isEqual(mode.mode, "light")
                            ? grey[100]
                            : "rgba(255,255, 255, 0.02)",
                        }}
                      >
                        <Box sx={{ alignSelf: "flex-end" }}>
                          <Button
                            variant="contained"
                            sx={{
                              color: "white",
                              bgcolor: isEqual(mode.mode, "light")
                                ? null
                                : lightBlue[600],
                            }}
                          >
                            follow
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                  </CardMedia>
                ) : isEmpty(PostImage) && isEqual(isRetweeted, false) ? (
                  <CardMedia component="img" height="0" alt="Paella dish" />
                ) : (
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "cover", pt: 1 }}
                    image={`${PostImage}`}
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
                  {!isNil(PostImage) && (
                    <Box sx={{ display: "flex", gap: 1, width: 450 }}>
                      <Box>
                        <StyledBadgeComment
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar
                            alt="Profile"
                            src={`${AuthInfo?.Data?.Image}`}
                          />
                        </StyledBadgeComment>
                      </Box>
                      <Box sx={{ width: "inherit", borderRadius: 4 }}>
                        <form
                          onSubmit={async (
                            evt: React.FormEvent<HTMLFormElement>
                          ) => {
                            try {
                              evt.preventDefault();
                              await addComments({
                                variables: {
                                  commentsData: {
                                    PostId,
                                    Body: body,
                                    CommentReference: `${randomName}`,
                                    User: `${AuthInfo.Data?._id}`,
                                  },
                                },
                                optimisticResponse: {
                                  PostComments: {
                                    __typename: "Comments",
                                    _id: `${nanoid()}`,
                                    Body: body,
                                    PostId,
                                    CommentReference: `${AuthInfo.Data?._id}`,
                                    createdAt: `${new Date()}`,
                                    User: {
                                      __typename: "User",
                                      _id: `${AuthInfo.Data?._id}`,
                                      Firstname: `${AuthInfo.Data?.Firstname}`,
                                      Lastname: `${AuthInfo.Data?.Lastname}`,
                                      Image: `${AuthInfo.Data?.Image}`,
                                    },
                                  },
                                },
                                onCompleted: async (data) => {
                                  await CreateNotification({
                                    ReceiverId: `${User?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(false),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: "",
                                      NotiImage: `${PostImage}`,
                                      NotiText: `${Title}`,
                                    },
                                    NotiReference: NotiReference.Comment,
                                  });
                                },
                                update: (cache, { data }) => {
                                  const { PostComments }: any = cache.readQuery(
                                    {
                                      query: ALL_POST_COMMENTS,
                                    }
                                  );

                                  cache.writeQuery({
                                    query: ALL_POST_COMMENTS,
                                    data: {
                                      PostComments: [
                                        ...PostComments,
                                        data?.PostComments,
                                      ],
                                    },
                                  });
                                },
                              });
                            } catch (error) {
                              throw new Error(`${error}`);
                            }
                          }}
                        >
                          <CssTextField
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                bgcolor: isEqual(mode.mode, "light")
                                  ? "#E8F0FE"
                                  : "rgba(255, 255, 255, 0.1)",
                                color: isEqual(mode.mode, "light")
                                  ? grey[700]
                                  : grey[200],
                              },
                            }}
                            placeholder="Write short comment..."
                            onChange={changeHandler}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <SendIcon
                                    sx={{
                                      color: isEqual(mode.mode, "light")
                                        ? blue[300]
                                        : "white",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </form>
                      </Box>
                    </Box>
                  )}
                  {!isNil(LastComment) && gt(size(LastComment), 0) && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box>
                        <Avatar
                          alt="lastCommentUser"
                          src={`${LastComment?.User?.Image}`}
                        />
                      </Box>
                      <Box
                        sx={{
                          maxWidth: 200,
                        }}
                      >
                        <Box
                          px={1.5}
                          py={1}
                          sx={{
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#E8F0FE"
                              : "rgba(255, 255, 255, 0.1)",
                            borderRadius: 3,
                          }}
                        >
                          <Box>
                            <Typography fontWeight="540" fontSize="15px">
                              {LastComment.User?.Firstname}{" "}
                              {LastComment.User?.Lastname}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {LastComment?.Body}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </CardContent>
                <Box
                  mb={0.4}
                  sx={{ display: "flex", gap: 1, alignItems: "center", ml: 1 }}
                >
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
                      ":hover": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.1)",
                      },
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
                      onClick={async (
                        evt: React.MouseEvent<HTMLButtonElement>
                      ) => {
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
                            update: (cache, { data }) => {
                              const cacheData: IPostLikes | null =
                                cache.readQuery({
                                  query: ALL_POST_LIKES,
                                });

                              const allRelatedPosts =
                                cacheData?.PostLikes.filter((likes) => {
                                  return (
                                    likes.PostId === data?.PostLikes?.PostId
                                  );
                                });

                              const isUserAlreadyLike = allRelatedPosts
                                ?.map((likes) => likes.User?._id)
                                .includes(`${AuthInfo.Data?._id}`);

                              if (isUserAlreadyLike) {
                                const userlikeId = allRelatedPosts?.filter(
                                  (likes) => {
                                    return (
                                      likes.User?._id ===
                                      `${data?.PostLikes?.User?._id}`
                                    );
                                  }
                                )[0];
                                // if post is already liked by the user
                                // remove the user
                                cache.writeQuery({
                                  query: ALL_POST_LIKES,
                                  data: {
                                    PostLikes: cacheData?.PostLikes.filter(
                                      (likes) => {
                                        return likes._id !== userlikeId?._id;
                                      }
                                    ),
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

                          await CreateNotification({
                            ReceiverId: `${User?._id}`,
                            SenderInfo: `${AuthInfo.Data?._id}`,
                            isSeen: Boolean(false),
                            isGroup: Boolean(false),
                            NotiEngine: {
                              GroupName: "",
                              NotiImage: `${PostImage}`,
                              NotiText: `${Title}`,
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
                      {isUndefined(likes) || likes.length === 0
                        ? 0
                        : likes.length}
                      k
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ":hover": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.1)",
                      },
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
                      aria-label="comments"
                      onClick={() => {
                        setState((old) => !old);
                        setPostId(`${PostId}`);
                      }}
                    >
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
                      ":hover": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.1)",
                      },
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
                      onClick={(event) => {
                        handleClick(event);
                        setInfo({
                          _id,
                          PostId,
                          Image: `${PostImage}`,
                          Title: `${Title}`,
                          userId: `${User?._id}`,
                        });
                      }}
                    >
                      <ReplyAllIcon />
                    </IconButton>
                    <span>6</span>
                  </Box>
                </CardActions>
                <Divider />
              </Card>
            </React.Fragment>
          );
        })
      )}
    </>
  );
}

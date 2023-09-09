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
import InputAdornment from "@mui/material/InputAdornment";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import blue from "@mui/material/colors/blue";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { CircleLoader } from "react-spinners";
import { upperFirst, isUndefined } from "lodash";
import { useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import { gql } from "@apollo/client";
// internally crafted imports of ressources
import { CssTextField } from "./MuiStyles";
import { StyledBadgeComment } from "./MuiStyles";
import {
  GetAllPostsQuery,
  Create_LikesMutation,
  Create_CommentMutation,
  Create_LikesMutationVariables,
  Create_CommentMutationVariables,
} from "../__generated__/graphql";
import {
  Get_All_Post,
  POST_COMMENTS,
  POST_LIKES,
} from "../graphql/Posts.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import randomName from "../utils/Random";
import { IRetweetProps } from "../typings/Post";
import Retweet from "./Retweet";

interface ICard {
  width: number;
}

export default function CardPost({ width }: ICard) {
  /*______Queries helpers___________ */
  const { data, loading } = useQuery<GetAllPostsQuery>(Get_All_Post);

  /*________ Mutations helpers__________*/
  const [addLikes, { data: Likes }] = useMutation<
    Create_LikesMutation,
    Create_LikesMutationVariables
  >(POST_LIKES);

  const [addComments, { data: Comments }] = useMutation<
    Create_CommentMutation,
    Create_CommentMutationVariables
  >(POST_COMMENTS);

  /* ___________Component logics_____________ */

  const contextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [body, setBody] = React.useState<string>("");

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as typeof evt.target & {
      value: { value: string };
    };

    setBody(target.value);
  };

  console.log(Likes);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const retweetData: IRetweetProps = {
    anchorEl,
    open,
    setAnchorEl,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <Retweet {...retweetData} />
      {loading ? (
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
        data?.GetAllPosts.map((value, index) => {
          const { _id, PostId, PostImage, User, Likes, Comments } = value;

          return (
            <Card key={index} sx={{ maxWidth: width, borderRadius: 3, mb: 2 }}>
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
                  <Typography fontWeight="bold">
                    {upperFirst(`${User?.Firstname}`)} {User?.Lastname}
                  </Typography>
                }
                subheader="September 14, 2016"
              />
              <CardContent sx={{ py: 0, my: 0 }}>
                <Typography sx={{ fontSize: "16px" }}>
                  once a winner always a winner, if you love something that
                  thing makes you heart throbs so loud, you feel inspired by it
                  every single day in your life, delve head into it
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ objectFit: "cover", pt: 1 }}
                image={`${PostImage}`}
                alt="Paella dish"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1, width: 450 }}>
                  <Box>
                    <StyledBadgeComment
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt="Profile" src={`${AuthInfo?.Data?.Image}`} />
                    </StyledBadgeComment>
                  </Box>
                  <Box sx={{ width: "inherit" }}>
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
                                Post: _id,
                                User: `${AuthInfo.Data?._id}`,
                              },
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
                        placeholder="Write short comment..."
                        onChange={changeHandler}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SendIcon sx={{ color: blue[300] }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </form>
                  </Box>
                </Box>
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
                      bgcolor: "#E8F0FE",
                      borderRadius: 7,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        good i really love the you do it bro and next time i
                        wish i have
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <Box
                sx={{ display: "flex", gap: 1, alignItems: "center", ml: 1 }}
              >
                <Box>
                  <Typography component="span" style={{ color: blue[600] }}>
                    8.3k
                  </Typography>{" "}
                  <span>people,</span>
                </Box>
                <Box>
                  <span style={{ fontWeight: "bold" }}>you </span> and
                  <span style={{ fontWeight: "bold" }}> jhonny</span> likes your
                  post
                </Box>
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
                          update: (cache, likesResult) => {
                            const likes = likesResult.data?.PostLikes;

                            cache.modify({
                              fields: {
                                GetAllPosts(existingPost = []) {
                                  const newLike = cache.writeFragment({
                                    id: `PostInfo:${_id}`,
                                    data: likes,
                                    fragment: gql`
                                      fragment Newlike on GetAllPosts {
                                        _id
                                        PostId
                                        Likes {
                                          _id
                                          User {
                                            _id
                                            Firstname
                                            Lastname
                                            Image
                                          }
                                        }
                                        Comments
                                      }
                                    `,
                                  });

                                  return existingPost.concat(newLike);
                                },
                              },
                            });
                          },
                        });
                      } catch (error) {
                        throw new Error(`${error}`);
                      }
                    }}
                  >
                    <ThumbUpOffAltIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      color: Likes?.map((likes) => likes?.User?._id).includes(
                        `${AuthInfo.Data}`
                      )
                        ? blue[700]
                        : null,
                    }}
                    component="span"
                  >
                    {isUndefined(Likes) ? 0 : Likes?.length}k
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
                  <IconButton
                    disableFocusRipple
                    disableRipple
                    aria-label="comments"
                  >
                    <ChatBubbleOutlineOutlinedIcon />
                  </IconButton>
                  <span>{isUndefined(Comments) ? 0 : Comments?.length}k</span>
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
                  <IconButton
                    disableFocusRipple
                    disableRipple
                    onClick={handleClick}
                  >
                    <ReplyAllIcon />
                  </IconButton>
                  <span>980</span>
                </Box>
              </CardActions>
              <Divider />
            </Card>
          );
        })
      )}
    </>
  );
}

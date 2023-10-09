import * as React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import blue from "@mui/material/colors/blue";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import isEqual from "lodash/isEqual";
// internally crafted imports of resources
import { ICommentProps } from "../typings/Home";
import CardComment from "../components/CardComment";
import { StyledBadgeComment } from "../components/MuiStyles";
import Context from "../store/ContextApi";
import { CssTextField } from "../components/MuiStyles";
import { IAuthState } from "../typings/GlobalState";
import {
  Create_CommentsMutation,
  Create_CommentsMutationVariables,
  Post_CommentsQuery,
  Post_CommentsQueryVariables,
} from "../__generated__/graphql";
import { POST_COMMENTS, ALL_POST_COMMENTS } from "../graphql/Posts.graphql";
import randomName from "../utils/Random";
import { IMode } from "../typings/GlobalState";
import modeContext from "../store/ModeContext";
import { ICard } from "../typings/Notifications";

const Comment = ({ state, setState, PostId }: ICommentProps): JSX.Element => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  // global state user context data
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  // global state application mode
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [body, setBody] = React.useState<string>("");

  const ScrollToTheBottom = React.useRef<HTMLDivElement | null>(null);

  const [addComments] = useMutation<
    Create_CommentsMutation,
    Create_CommentsMutationVariables
  >(POST_COMMENTS);

  const { data: allCommentsData } = useQuery<
    Post_CommentsQuery,
    Post_CommentsQueryVariables
  >(ALL_POST_COMMENTS);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setBody(target.value);
  };

  // post related comments
  const comments = allCommentsData?.PostComments.filter(
    (comments) => comments.PostId === PostId
  );

  // function which role is to make the user still see the most recent message sent at the bottom of the page
  const ScrollFunc = React.useCallback(
    (behavior: ScrollBehavior | undefined) => {
      ScrollToTheBottom.current?.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    },
    []
  );

  const card: ICard = {
    width: "100%",
    PostId,
    userId: `${AuthInfo.Data?._id}`,
  };

  React.useEffect(() => {
    // scroll to the bottom of the list of messages
    ScrollFunc("smooth");
  }, [comments?.length]);

  return (
    <>
      <Drawer
        PaperProps={{
          sx: { width: 400 },
        }}
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ m: 2, pt: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography fontSize="16px" fontWeight="600">
                All Comments
              </Typography>
              <Typography fontSize="17px" color="text.secondary">
                ({comments?.length})
              </Typography>
            </Box>
            <IconButton
              sx={{
                m: 0,
                p: 0,
              }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={() => setState((old) => !old)}
            >
              <CloseIcon
                sx={{
                  color: isEqual(mode.mode, "light") ? "black" : "white",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </Box>
          <Box pt={1} pb={3}>
            <Box
              sx={{
                maxHeight: 290,
                height: 290,
                width: "100%",
                overflow: "auto",
              }}
            >
              <Box sx={{ height: "100%", mx: 1 }}>
                <CardComment {...card} />
              </Box>
            </Box>
          </Box>
          <Box
            p={0.2}
            sx={{
              maxHeight: 142,
              height: 142,
              overflowY: "auto",
              position: "relative",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1.4,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.2,
                  justifyContent: "flex-end",
                  pl: 1.2,
                }}
              >
                {comments && comments.length < 1 ? (
                  <React.Fragment>
                    <Box pl={1}>
                      <Typography
                        fontWeight="640"
                        fontSize="20px"
                        color="text.secondary"
                      >
                        Be the first to comment
                      </Typography>
                    </Box>
                  </React.Fragment>
                ) : (
                  comments?.map((comment) => {
                    return (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box>
                          <Avatar alt="" src={`${comment.User?.Image}`} />
                        </Box>
                        <Box
                          px={1.4}
                          py={1}
                          sx={{
                            maxWidth: 200,
                            wordBreak: "break-word",
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#D0E0FD"
                              : "rgba(255, 255, 255, 0.1)",
                            borderRadius: 3,
                          }}
                        >
                          <Box>
                            <Typography fontWeight="540" fontSize="15px">
                              {comment.User?.Firstname} {comment.User?.Lastname}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {comment.Body}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box ref={ScrollToTheBottom} />
            </Box>
          </Box>
          <form
            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
              try {
                event.preventDefault();
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
                  update: (cache, { data }) => {
                    const { PostComments }: any = cache.readQuery({
                      query: ALL_POST_COMMENTS,
                    });

                    cache.writeQuery({
                      query: ALL_POST_COMMENTS,
                      data: {
                        PostComments: [...PostComments, data?.PostComments],
                      },
                    });
                  },
                });
              } catch (error) {
                throw new Error(`${error}`);
              }
            }}
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                height: "8.4%",
                width: "28.6%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 0.8,
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 0.7,
                }}
              >
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
                  <CssTextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.1)",
                        borderRadius: 50,
                        border: "none",
                      },
                    }}
                    placeholder="Write a comment..."
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ p: 0, m: 0 }} type="submit">
                            <SendIcon sx={{ color: blue[300] }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default Comment;

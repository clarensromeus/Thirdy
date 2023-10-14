import * as React from "react";
import {
  Popper,
  Box,
  Typography,
  IconButton,
  Icon,
  Paper,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { IRetweetProps } from "../typings/Post";
import grey from "@mui/material/colors/grey";
import PeopleIcon from "@mui/icons-material/People";
import { useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import { useMutation } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { useReactiveVar } from "@apollo/client";
import { isEqual } from "lodash";
// internally crafted imports of resources
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import {
  RetweetPostMutation,
  RetweetPostMutationVariables,
  Create_PostMutation,
  Create_PostMutationVariables,
} from "../__generated__/graphql";
import {
  RETWEET_POST,
  Create_post,
  Get_All_Post,
} from "../graphql/Posts.graphql";
import { IShareDataWithFriend, IShareDataWithGroup } from "../typings/Post";
import SharewithFriends from "./Friends/SharewithFriends";
import SharePostWithGroup from "./Group/ShareWithGroup";
import useNotification from "../hooks/useNotifications";
import { Authentication } from "../Global/GlobalAuth";
import { NotiReference } from "../Enums";
import { IMode } from "../typings/GlobalState";
import modeContext from "../store/ModeContext";

const Retweet = ({
  anchorEl,
  open,
  setAnchorEl,
  PostInfo: { _id, PostId, Image, Title, userId },
}: IRetweetProps): JSX.Element => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const [openFrame, setOpenFrame] = React.useState<boolean>(false);
  const [openGroupFrame, setOpenGroupFrame] = React.useState<boolean>(false);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const shareData: IShareDataWithFriend = {
    openFrame,
    setOpenFrame,
    _id: `${AuthInfo.Data?._id}`,
    PostInfo: {
      PostId,
      Image,
      Title,
      userId: `${userId}`,
    },
  };

  const shareDataWithGroup: IShareDataWithGroup = {
    openGroupFrame,
    setOpenGroupFrame,
    id: `${AuthInfo.Data?._id}`,
    GroupInfo: {
      _id,
      PostId,
      Title,
      userId: `${userId}`,
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { PushNotification, CreateNotification } = useNotification();
  const isAuth = useReactiveVar(Authentication);

  const [Retweet, { loading }] = useMutation<
    RetweetPostMutation,
    RetweetPostMutationVariables
  >(RETWEET_POST);

  const [CreatePost] = useMutation<
    Create_PostMutation,
    Create_PostMutationVariables
  >(Create_post);

  // push real time notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  return (
    <>
      <SharewithFriends {...shareData} />
      <SharePostWithGroup {...shareDataWithGroup} />
      <Popper open={open} anchorEl={anchorEl}>
        <Paper sx={{ borderRadius: 4 }}>
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                p: 0,
                m: 0,
                border: "none",
                bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
              }}
              onClick={(event) => {
                setOpenFrame(true);
                handleClick(event);
              }}
              component="button"
            >
              <Box>
                <IconButton sx={{ m: 0, p: 0 }}>
                  <PeopleIcon
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    }}
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                  }}
                >
                  Share with friends
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
                border: "none",
                p: 0,
                m: 0,
              }}
              onClick={(event) => {
                setOpenGroupFrame(true);
                handleClick(event);
              }}
              component="button"
            >
              <Box>
                <IconButton
                  sx={{
                    m: 0,
                    p: 0,
                    bgcolor: isEqual(mode.mode, "light") ? "white" : grey[100],
                  }}
                >
                  <GroupsIcon
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    }}
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                  }}
                >
                  Share with groups
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                m: 0,
                p: 0,
                border: "none",
                bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
              }}
              component="button"
              onClick={async () => {
                try {
                  await Retweet({
                    variables: {
                      retweetData: {
                        Post: _id,
                        PostId,
                        RetweetedUser: `${AuthInfo.Data?._id}`,
                      },
                    },
                    refetchQueries: [Get_All_Post],
                  });

                  await CreatePost({
                    variables: {
                      postData: {
                        PostId: `${nanoid()}`,
                        PostReference: `post_${nanoid()}`,
                        User: `${AuthInfo.Data?._id}`,
                        isRetweeted: true,
                        RetweetedPost: _id,
                      },
                    },
                    onCompleted: async () => {
                      try {
                        await CreateNotification({
                          ReceiverId: `${userId}`,
                          SenderInfo: `${AuthInfo.Data?._id}`,
                          isGroup: Boolean(false),
                          isSeen: Boolean(false),
                          NotiEngine: {
                            GroupName: "",
                            NotiImage: "",
                            NotiText: Title,
                          },
                          NotiReference: NotiReference.Retweeted,
                        });
                      } catch (error) {
                        throw new Error(`${error}`);
                      }
                    },
                    refetchQueries: [Get_All_Post],
                  });
                } catch (error) {
                  throw new Error(`${error}`);
                }
              }}
            >
              <Box>
                {loading ? (
                  <ClipLoader
                    loading={loading}
                    size={16}
                    color="black"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <IconButton sx={{ m: 0, p: 0 }}>
                    <Icon
                      sx={{
                        color: isEqual(mode.mode, "light")
                          ? "black"
                          : grey[100],
                      }}
                      baseClassName="fas"
                      className="fa-thin fa-retweet"
                      fontSize="small"
                    />
                  </IconButton>
                )}
              </Box>
              <Box>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                  }}
                >
                  Just retweet
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default Retweet;

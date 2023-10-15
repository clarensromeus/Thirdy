import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Button,
} from "@mui/material";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import blue from "@mui/material/colors/blue";
import { isEqual, gt, size, debounce } from "lodash";
import grey from "@mui/material/colors/grey";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import { useReactiveVar } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ClipLoader } from "react-spinners";
// internally crafted imports of resources
import { CssTextFieldShare } from "../MuiStyles/textField";
import modeContext from "../store/ModeContext";
import { IAuthState } from "../typings/GlobalState";
import Context from "../store/ContextApi";
import { IMode } from "../typings/GlobalState";
import { AllNotifications } from "../Global/GlobalNotifications";
import useNotification from "../hooks/useNotifications";
import { Authentication } from "../Global/GlobalAuth";
import {
  ALL_FRIEND_REQUESTS,
  FOLLOW_FRIENDS_BACK,
  FRIEND_SUGGESTIONS,
  REJECT_REQUEST,
} from "../graphql/Friends.graphql";
import {
  FollowBackMutation,
  FollowBackMutationVariables,
  RejectRequestMutation,
  RejectRequestMutationVariables,
} from "../__generated__/graphql";
import { NotiReference } from "../Enums";
import { GET_NOTIFICATIONS } from "../graphql/Notifications.graphql";

dayjs.extend(relativeTime);

const Notifications = () => {
  // global app user state
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [search, setSearch] = React.useState<string>("");

  // global app mode
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const Notifications = useReactiveVar(AllNotifications);
  const isAuth = useReactiveVar(Authentication);

  const { PushNotification, CreateNotification, DeleteNotification } =
    useNotification();

  const allNotifications = Notifications.Notifications.filter(
    (notifications) => notifications.ReceiverId === `${AuthInfo.Data?._id}`
  );

  const [followBack, { loading }] = useMutation<
    FollowBackMutation,
    FollowBackMutationVariables
  >(FOLLOW_FRIENDS_BACK);

  const [RejectFriend, { loading: rejectFriendLoading }] = useMutation<
    RejectRequestMutation,
    RejectRequestMutationVariables
  >(REJECT_REQUEST);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 1000);
  }, [search]);

  // push real time notifications
  PushNotification({ isAuth: isAuth.isLoggedIn });

  React.useEffect(() => {
    return () => {
      // cleanup debounce for re-rendering prevention
      debounceSearchResult.cancel();
    };
  }, []);

  return (
    <>
      <Container>
        <Box sx={{ height: "calc(100vh - 64px)" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            <Paper
              elevation={2}
              sx={{
                maxWidth: 470,
                height: "inherit",
              }}
            >
              <Box
                px={2}
                pt={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Typography fontWeight="700" fontSize="24px">
                  Notifications
                </Typography>
                <IconButton
                  sx={{
                    bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
                    borderRadius: 50,
                  }}
                >
                  <EditNotificationsIcon
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : "white",
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                px={2}
                sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}
              >
                <Typography sx={{ color: blue[800] }}>
                  ({allNotifications.length})
                </Typography>
                <Box>
                  <CssTextFieldShare
                    placeholder="search..."
                    size="small"
                    fullWidth
                    onChange={debounceSearchResult}
                    sx={{
                      "& fieldset": { border: "none" },
                      ".MuiOutlinedInput-root": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255,255, 255, 0.1)",
                        borderRadius: 50,
                        color: isEqual(mode.mode, "light")
                          ? grey[700]
                          : grey[200],
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box pt={1} px={2}>
                <Typography fontWeight="bold">All</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.3,
                  maxHeight: "72.3%",
                  overflow: "auto",
                }}
              >
                {allNotifications
                  .filter((notifications) =>
                    search.toLowerCase() === ""
                      ? notifications
                      : notifications.SenderInfo?.Firstname?.toLowerCase().includes(
                          search.toLowerCase()
                        )
                  )
                  .map((notifications) => {
                    return (
                      <Box
                        pt={1}
                        px={2}
                        mb={2}
                        sx={{
                          height: "100%",
                          display: "flex",
                          gap: 1,
                          alignItems: isEqual(
                            notifications.NotiReference,
                            "requested"
                          )
                            ? "flex-start"
                            : "center",
                          alignContent: isEqual(
                            notifications.NotiReference,
                            "requested"
                          )
                            ? "flex-start"
                            : "center",
                        }}
                      >
                        <Box>
                          <Avatar
                            alt=""
                            src={`${notifications.SenderInfo?.Image}`}
                            sx={{ width: 62, height: 62 }}
                          />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{}}>
                            {notifications.SenderInfo?._id ===
                            `${AuthInfo.Data?._id}` ? (
                              <Typography
                                fontWeight="600"
                                fontSize="15px"
                                component="span"
                              >
                                you{" "}
                              </Typography>
                            ) : (
                              <Typography
                                fontWeight="600"
                                fontSize="15px"
                                component="span"
                              >
                                {notifications.SenderInfo?.Firstname}{" "}
                                {notifications.SenderInfo?.Lastname}
                              </Typography>
                            )}

                            <Typography color="text.secondary" component="span">
                              {" "}
                              {isEqual(notifications.NotiReference, "likes") ? (
                                <span>
                                  {notifications.SenderInfo?._id ===
                                  `${AuthInfo.Data?._id}`
                                    ? "like your post"
                                    : "likes your post"}
                                </span>
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "dislikes"
                                ) ? (
                                <span>
                                  {notifications.SenderInfo?._id ===
                                  `${AuthInfo.Data?._id}`
                                    ? "dislike your post"
                                    : "dislikes your post"}
                                </span>
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "shared"
                                ) ? (
                                "shared your post"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "commented"
                                ) ? (
                                "commented your post"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "messaged"
                                ) ? (
                                "was messaged you"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "accepted"
                                ) ? (
                                "accepted your friend request"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "unfollowed"
                                ) ? (
                                "unfollowed you"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "requested"
                                ) ? (
                                "sent you a friend request"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "removedAdminRole"
                                ) ? (
                                "removes you as admin from"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "adminRoleAdded"
                                ) ? (
                                "add you as admin in"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "retweeted"
                                ) ? (
                                "retweeted your post"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "rejected"
                                ) ? (
                                "rejected your friend request"
                              ) : isEqual(
                                  notifications.NotiReference,
                                  "added"
                                ) ? (
                                "add you in"
                              ) : (
                                ""
                              )}{" "}
                              {isEqual(
                                notifications.NotiReference,
                                "removed"
                              ) &&
                                Boolean(notifications.isGroup) && (
                                  <span
                                    style={{
                                      color: isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white",
                                      fontWeight: "600",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {notifications.NotiEngine?.GroupName}' group
                                  </span>
                                )}
                              {isEqual(notifications.NotiReference, "added") &&
                                Boolean(notifications.isGroup) && (
                                  <span
                                    style={{
                                      color: isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white",
                                      fontWeight: "600",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {notifications.NotiEngine?.GroupName}' group
                                  </span>
                                )}
                              {isEqual(
                                notifications.NotiReference,
                                "removedAdminRole"
                              ) &&
                                Boolean(notifications.isGroup) && (
                                  <span
                                    style={{
                                      color: isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white",
                                      fontWeight: "600",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {notifications.NotiEngine?.GroupName}' group
                                  </span>
                                )}
                              {isEqual(
                                notifications.NotiReference,
                                "adminRoleAdded"
                              ) &&
                                Boolean(notifications.isGroup) && (
                                  <span
                                    style={{
                                      color: isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white",
                                      fontWeight: "600",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {notifications.NotiEngine?.GroupName}' group
                                  </span>
                                )}
                              {isEqual(
                                notifications.NotiReference,
                                "commented"
                              ) &&
                                gt(
                                  size(notifications.NotiEngine?.NotiText),
                                  0
                                ) && (
                                  <span
                                    style={{
                                      color: isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white",
                                      fontWeight: "600",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {notifications.NotiEngine?.NotiText}
                                  </span>
                                )}
                              {isEqual(notifications.NotiReference, "likes") ||
                                (isEqual(
                                  notifications.NotiReference,
                                  "dislikes"
                                ) &&
                                  gt(
                                    size(notifications.NotiEngine?.NotiText),
                                    0
                                  ) &&
                                  Boolean(notifications.isGroup) && (
                                    <span
                                      style={{
                                        color: isEqual(mode.mode, "light")
                                          ? "black"
                                          : "white",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {notifications.NotiEngine?.NotiText}
                                    </span>
                                  ))}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                color: blue[700],
                                fontSize: "13px",
                                fontWeight: "600",
                              }}
                            >
                              {dayjs(`${notifications.createdAt}`).fromNow(
                                notifications.createdAt
                              )}
                            </Typography>
                          </Box>
                          {isEqual(
                            notifications.NotiReference,
                            "requested"
                          ) && (
                            <Box>
                              <Typography
                                color="text.secondary"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                {7} mutual friends
                              </Typography>
                            </Box>
                          )}
                          {isEqual(
                            notifications.NotiReference,
                            "requested"
                          ) && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                alignContent: "center",
                                gap: 1,
                                pt: 0.3,
                                width: "inherit",
                              }}
                            >
                              <Box sx={{ width: 146 }}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  sx={{
                                    fontWeight: "bold",
                                    boxShadow: "none",
                                    bgcolor: isEqual(mode.mode, "light")
                                      ? "primary"
                                      : "#0866ff",
                                    color: "white",
                                    textTransform: "capitalize",
                                  }}
                                  onClick={() => {
                                    followBack({
                                      variables: {
                                        FriendId: `${notifications.NotiEngine?.FriendRequestID}`,
                                        userRequestId: `${notifications.SenderInfo?._id}`,
                                        AcceptedId: `${AuthInfo.Data?._id}`,
                                      },
                                      refetchQueries: [
                                        FRIEND_SUGGESTIONS,
                                        ALL_FRIEND_REQUESTS,
                                        GET_NOTIFICATIONS,
                                      ],
                                      onCompleted: async () => {
                                        try {
                                          // delete the friend request from the list of notifications
                                          await DeleteNotification({
                                            notiId: notifications._id,
                                            userId: `${AuthInfo.Data?._id}`,
                                          });
                                          // create new notification to alert the user whether the friend request
                                          // accepted or rejected
                                          await CreateNotification({
                                            ReceiverId: `${notifications.SenderInfo?._id}`,
                                            SenderInfo: `${AuthInfo.Data?._id}`,
                                            isGroup: Boolean(false),
                                            isSeen: Boolean(false),
                                            NotiEngine: {
                                              GroupName: "",
                                              NotiImage: "",
                                              NotiText: "accepted your request",
                                            },
                                            NotiReference:
                                              NotiReference.Accepted,
                                          });
                                        } catch (error) {
                                          throw new Error(`${error}`);
                                        }
                                      },
                                    });
                                  }}
                                >
                                  {loading ? (
                                    <ClipLoader
                                      loading={loading}
                                      size={20}
                                      color="white"
                                      aria-label="Loading Spinner"
                                      data-testid="loader"
                                    />
                                  ) : (
                                    "Accept"
                                  )}
                                </Button>
                              </Box>
                              <Box sx={{ width: 146 }}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    bgcolor: isEqual(mode.mode, "light")
                                      ? "#E8F0FE"
                                      : "rgba(255, 255, 255, 0.1)",
                                    boxShadow: "none",
                                    textTransform: "capitalize",
                                  }}
                                  fullWidth
                                  onClick={() => {
                                    RejectFriend({
                                      variables: {
                                        rejectRequestFriendId: `${notifications.NotiEngine?.FriendRequestID}`,
                                      },
                                      refetchQueries: [
                                        FRIEND_SUGGESTIONS,
                                        ALL_FRIEND_REQUESTS,
                                        GET_NOTIFICATIONS,
                                      ],
                                      onCompleted: async () => {
                                        try {
                                          // delete the friend request from the list of notifications
                                          await DeleteNotification({
                                            notiId: notifications._id,
                                            userId: `${AuthInfo.Data?._id}`,
                                          });
                                          // create new notification to alert the user whether the friend request
                                          // accepted or rejected
                                          await CreateNotification({
                                            ReceiverId: `${notifications.SenderInfo?._id}`,
                                            SenderInfo: `${AuthInfo.Data?._id}`,
                                            isGroup: Boolean(false),
                                            isSeen: Boolean(false),
                                            NotiEngine: {
                                              GroupName: "",
                                              NotiImage: "",
                                              NotiText:
                                                "reject your friend request",
                                            },
                                            NotiReference: NotiReference.Reject,
                                          });
                                        } catch (error) {
                                          throw new Error(`${error}`);
                                        }
                                      },
                                    });
                                  }}
                                >
                                  <Typography
                                    fontWeight="bold"
                                    color={
                                      isEqual(mode.mode, "light")
                                        ? "primary"
                                        : "white"
                                    }
                                  >
                                    {rejectFriendLoading ? (
                                      <ClipLoader
                                        loading={rejectFriendLoading}
                                        size={20}
                                        color="white"
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    ) : (
                                      "reject"
                                    )}
                                  </Typography>
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Notifications;

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  IconButton,
  Divider,
} from "@mui/material";
import { upperFirst, isEqual, filter, property, map } from "lodash";
import grey from "@mui/material/colors/grey";
import lightBlue from "@mui/material/colors/lightBlue";
import blue from "@mui/material/colors/blue";
import { useMutation, useQuery } from "@apollo/client";
import { ClipLoader, CircleLoader } from "react-spinners";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useReactiveVar } from "@apollo/client";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import {
  ALL_FRIEND_REQUESTS,
  FRIEND_SUGGESTIONS,
  ALL_FRIENDS,
  FOLLOW_FRIENDS,
  FOLLOW_FRIENDS_BACK,
  UNFOLLOW_FRIENDS,
  REJECT_REQUEST,
} from "../graphql/Friends.graphql";
import {
  AllFriendsRequestsQuery,
  AllFriendsRequestsQueryVariables,
  FriendSuggestionsQuery,
  FriendSuggestionsQueryVariables,
  AllFriendsQuery,
  AllFriendsQueryVariables,
  UnFollowMutation,
  UnFollowMutationVariables,
  FollowBackMutation,
  FollowBackMutationVariables,
  FollowMutation,
  FollowMutationVariables,
  RejectRequestMutation,
  RejectRequestMutationVariables,
} from "../__generated__/graphql";
import { IAuthState } from "../typings/GlobalState";
import Context from "../store/ContextApi";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import useNotification from "../hooks/useNotifications";
import { IFriend } from "../typings/Friends";
import { Authentication } from "../Global/GlobalAuth";
import { NotiReference } from "../Enums";

const Friends = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { CreateNotification, PushNotification } = useNotification(
    `${AuthInfo.Data?._id}`
  );

  const isAuth = useReactiveVar(Authentication);

  const { data: allFriends, loading: allFriendsLoading } = useQuery<
    AllFriendsRequestsQuery,
    AllFriendsRequestsQueryVariables
  >(ALL_FRIEND_REQUESTS, {
    variables: { allFriendRequestsId: `${AuthInfo.Data?._id}` },
  });

  const { data: friendSuggestions, loading: friendSuggestionsLoading } =
    useQuery<FriendSuggestionsQuery, FriendSuggestionsQueryVariables>(
      FRIEND_SUGGESTIONS,
      {
        variables: { friendSuggestionsId: `${AuthInfo.Data?._id}` },
      }
    );

  const { data: userFriends, loading: userFriendsLoading } = useQuery<
    AllFriendsQuery,
    AllFriendsQueryVariables
  >(ALL_FRIENDS, { variables: { FriendId: `${AuthInfo.Data?._id}` } });

  const [follow, { loading: followLoading }] = useMutation<
    FollowMutation,
    FollowMutationVariables
  >(FOLLOW_FRIENDS);

  const [followBack, { loading: followBackLoading }] = useMutation<
    FollowBackMutation,
    FollowBackMutationVariables
  >(FOLLOW_FRIENDS_BACK);

  const [unfollow, { loading: unfollowLoading }] = useMutation<
    UnFollowMutation,
    UnFollowMutationVariables
  >(UNFOLLOW_FRIENDS);

  const [rejectRequest] = useMutation<
    RejectRequestMutation,
    RejectRequestMutationVariables
  >(REJECT_REQUEST);

  const [followBackDiff, setFollowBackDiff] = React.useState<string>("");
  const [unfollowDiff, setUnfollowDiff] = React.useState<string>("");
  const [followDiff, setFollowDiff] = React.useState<string>("");

  // get friends info in case the active user sent the friend request
  const sentFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.RequestId === `${AuthInfo.Data?._id}`;
  });

  // get user info in case the active acceptedId the friend request
  const receivedFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.AcceptedId === `${AuthInfo.Data?._id}`;
  });

  // merge sent and received friend requests
  const AllFriends = [
    ...map(receivedFriends, property("User")),
    ...map(sentFriends, property("Receiver")),
  ] as IFriend<string>[];

  // push real time notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  return (
    <>
      <Container>
        <Box sx={{ pt: 2 }}>
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="1.3rem"
              sx={{ color: isEqual(mode.mode, "light") ? "black" : "white" }}
            >
              Friend Requests ({allFriends?.allFriendRequests?.length})
            </Typography>
          </Box>
          {allFriendsLoading ? (
            <Box
              sx={{
                width: "100%",
                py: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <CircleLoader
                  loading={true}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            </Box>
          ) : (
            <Box pt={2} sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {allFriends?.allFriendRequests?.map((friends) => {
                return (
                  <Box
                    sx={{
                      width: 200,
                      borderRadius: 3,
                      overflow: "hidden",
                      bgcolor: isEqual(mode.mode, "light")
                        ? "white"
                        : "rgba(255, 255, 255, 0.1)",
                      border: isEqual(mode.mode, "light")
                        ? `1px solid ${grey[200]}`
                        : "rgba(255, 255, 255, 0.1)",
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Box sx={{ p: 0, m: 0, width: "inherit" }}>
                      <img
                        alt=""
                        src={`${friends.User?.Image}`}
                        style={{ width: 200, height: 210, objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      pt={1.2}
                      px={1.1}
                      sx={{
                        bgcolor: isEqual(mode.mode, "light")
                          ? "white"
                          : "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        gap: 0.1,
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        component="span"
                        fontWeight="bold"
                        fontSize="17px"
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? "black"
                            : "white",
                        }}
                      >
                        {upperFirst(`${friends.User?.Firstname}`)}{" "}
                        {friends.User?.Lastname}
                      </Typography>
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <AvatarGroup max={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9x2TavVXpVYzf6ImNncDrsETlNW82kJHT4g&usqp=CAU"
                            sx={{ width: 17, height: 17 }}
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="data:image/jpeg;base64,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"
                            sx={{ width: 17, height: 17 }}
                          />
                        </AvatarGroup>
                        <Typography color="text.secondary">
                          2 mutual friends
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          boxShadow: "none",
                          bgcolor: isEqual(mode.mode, "dark")
                            ? lightBlue[500]
                            : "",
                        }}
                        fullWidth
                        onClick={() => {
                          followBack({
                            variables: {
                              FriendId: `${friends._id}`,
                              userRequestId: `${friends.User?._id}`,
                              AcceptedId: `${AuthInfo.Data?._id}`,
                            },
                            refetchQueries: [ALL_FRIENDS, ALL_FRIEND_REQUESTS],
                            onCompleted: async () => {
                              try {
                                await CreateNotification({
                                  ReceiverId: `${friends.User?._id}`,
                                  SenderInfo: `${AuthInfo.Data?._id}`,
                                  isGroup: Boolean(false),
                                  isSeen: Boolean(false),
                                  NotiEngine: {
                                    GroupName: "",
                                    NotiImage: "",
                                    NotiText: "accepted your request",
                                  },
                                  NotiReference: NotiReference.Accepted,
                                });
                              } catch (error) {
                                throw new Error(`${error}`);
                              }
                            },
                          });
                          setFollowBackDiff(`${friends._id}`);
                        }}
                      >
                        {followBackLoading && friends._id === followBackDiff ? (
                          <ClipLoader
                            loading={true}
                            size={20}
                            color="white"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          "Accept"
                        )}
                      </Button>
                      <Box pt={0.4} mb={1}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#E8F0FE"
                              : "rgba(255, 255, 255, 0.1)",
                            boxShadow: "none",
                            ":hover": {
                              bgcolor: isEqual(mode.mode, "light")
                                ? "#E8F0FE"
                                : "rgba(255, 255, 255, 0.1)",
                              boxShadow: "none",
                              color: isEqual(mode.mode, "light")
                                ? "primary"
                                : "white",
                            },
                          }}
                          fullWidth
                          onClick={() => {
                            rejectRequest({
                              variables: {
                                rejectRequestFriendId: `${friends._id}`,
                              },
                              refetchQueries: [
                                FRIEND_SUGGESTIONS,
                                ALL_FRIEND_REQUESTS,
                              ],
                              onCompleted: async () => {
                                try {
                                  await CreateNotification({
                                    ReceiverId: `${friends.User?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(false),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: "",
                                      NotiImage: "",
                                      NotiText: "reject your friend request",
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
                              isEqual(mode.mode, "light") ? "primary" : "white"
                            }
                          >
                            Reject
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
          {allFriends && (
            <Box
              p={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography fontWeight="bold" sx={{ color: blue[800] }}>
                Browse more
              </Typography>
              <IconButton>
                <ArrowDropDownIcon sx={{ color: blue[800] }} />
              </IconButton>
            </Box>
          )}
          <Divider />
          <Box p={1}>
            <Typography
              fontWeight="bold"
              fontSize="1.2rem"
              sx={{ color: isEqual(mode.mode, "light") ? "black" : "white" }}
            >
              People you may know (
              {friendSuggestions?.FriendSuggestions?.length})
            </Typography>
          </Box>
          {friendSuggestionsLoading ? (
            <Box
              sx={{
                width: "100%",
                py: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <CircleLoader
                  loading={true}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            </Box>
          ) : (
            <Box pt={1} sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {friendSuggestions?.FriendSuggestions?.map((suggestions) => {
                return (
                  <Box
                    sx={{
                      width: 200,
                      borderRadius: 3,
                      overflow: "hidden",
                      border: isEqual(mode.mode, "light")
                        ? `1px solid ${grey[200]}`
                        : "",
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Box sx={{ p: 0, m: 0, width: "inherit" }}>
                      <img
                        alt=""
                        src={`${suggestions?.Image}`}
                        style={{ width: 200, height: 210, objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      pt={1.2}
                      px={1.1}
                      sx={{
                        bgcolor: isEqual(mode.mode, "light")
                          ? "white"
                          : "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        gap: 0.1,
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        component="span"
                        fontWeight="bold"
                        fontSize="17px"
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? "black"
                            : "white",
                        }}
                      >
                        {suggestions?.Firstname} {suggestions?.Lastname}
                      </Typography>
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <AvatarGroup max={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9x2TavVXpVYzf6ImNncDrsETlNW82kJHT4g&usqp=CAU"
                            sx={{ width: 17, height: 17 }}
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="data:image/jpeg;base64,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"
                            sx={{ width: 17, height: 17 }}
                          />
                        </AvatarGroup>
                        <Typography color="text.secondary">
                          4 mutual friends
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          boxShadow: "none",
                          bgcolor: isEqual(mode.mode, "light")
                            ? ""
                            : lightBlue[500],
                        }}
                        fullWidth
                        onClick={() => {
                          follow({
                            variables: {
                              followRequestData: {
                                RequestId: `${AuthInfo.Data?._id}`,
                                User: `${AuthInfo.Data?._id}`,
                                _id: `${suggestions?._id}`,
                              },
                            },
                            refetchQueries: [
                              FRIEND_SUGGESTIONS,
                              ALL_FRIEND_REQUESTS,
                            ],
                            onCompleted: async (data) => {
                              try {
                                await CreateNotification({
                                  ReceiverId: `${suggestions?._id}`,
                                  SenderInfo: `${AuthInfo.Data?._id}`,
                                  isGroup: Boolean(false),
                                  isSeen: Boolean(false),
                                  NotiEngine: {
                                    GroupName: "",
                                    NotiImage: "",
                                    NotiText: "sent you a friend request",
                                    FriendRequestID: `${data.follow.message}`,
                                  },
                                  NotiReference: NotiReference.Request,
                                });
                              } catch (error) {
                                throw new Error(`${error}`);
                              }
                            },
                          });

                          setFollowDiff(`${suggestions?._id}`);
                        }}
                      >
                        {followLoading && followDiff === suggestions?._id ? (
                          <ClipLoader
                            loading={followLoading}
                            size={20}
                            color="white"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          "Add Friend"
                        )}
                      </Button>
                      <Box pt={0.4} mb={1}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#E8F0FE"
                              : "rgba(255, 255, 255, 0.1)",
                            boxShadow: "none",
                            ":hover": {
                              bgcolor: isEqual(mode.mode, "light")
                                ? "#E8F0FE"
                                : "rgba(255, 255, 255, 0.1)",
                              boxShadow: "none",
                              color: isEqual(mode.mode, "light")
                                ? "primary"
                                : "white",
                            },
                          }}
                          fullWidth
                          onClick={async () => {
                            try {
                              await CreateNotification({
                                ReceiverId: `${suggestions?._id}`,
                                SenderInfo: `${AuthInfo.Data?._id}`,
                                isGroup: Boolean(false),
                                isSeen: Boolean(false),
                                NotiEngine: {
                                  GroupName: "",
                                  NotiImage: "",
                                  NotiText: "tagged you",
                                },
                                NotiReference: NotiReference.Tag,
                              });
                            } catch (error) {
                              throw new Error(`${error}`);
                            }
                          }}
                        >
                          <Typography
                            fontWeight="bold"
                            color={
                              isEqual(mode.mode, "light") ? "primary" : "white"
                            }
                          >
                            Tag Friend
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
          {friendSuggestions && (
            <Box
              p={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography fontWeight="bold" sx={{ color: blue[800] }}>
                Browse more
              </Typography>
              <IconButton>
                <ArrowDropDownIcon sx={{ color: blue[800] }} />
              </IconButton>
            </Box>
          )}
          <Divider />
          <Box py={2}>
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="1.2rem"
                sx={{ color: isEqual(mode.mode, "light") ? "black" : "white" }}
              >
                All of your friends ({userFriends?.AllFriends?.length})
              </Typography>
            </Box>
          </Box>
          {userFriendsLoading ? (
            <Box
              sx={{
                width: "100%",
                py: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <CircleLoader
                  loading={true}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            </Box>
          ) : (
            <Box py={1} sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {AllFriends.map((friends, ind) => {
                const GetRequestId = map(
                  userFriends?.AllFriends?.filter(
                    (value, index) => index === ind
                  ),
                  property("_id")
                )[0];

                return (
                  <Box
                    sx={{
                      width: 200,
                      borderRadius: 3,
                      overflow: "hidden",
                      border: isEqual(mode.mode, "light")
                        ? `1px solid ${grey[200]}`
                        : "black",
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Box sx={{ p: 0, m: 0, width: "inherit" }}>
                      <img
                        alt=""
                        src={`${friends.Image}`}
                        style={{ width: 200, height: 210, objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      pt={1.2}
                      px={1.1}
                      sx={{
                        bgcolor: isEqual(mode.mode, "light")
                          ? "white"
                          : "rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        gap: 0.1,
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        component="span"
                        fontWeight="bold"
                        fontSize="17px"
                        sx={{
                          color: isEqual(mode.mode, "light") ? "dark" : "white",
                        }}
                      >
                        {friends.Firstname} {friends.Lastname}
                      </Typography>
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <AvatarGroup max={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9x2TavVXpVYzf6ImNncDrsETlNW82kJHT4g&usqp=CAU"
                            sx={{ width: 17, height: 17 }}
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="data:image/jpeg;base64,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"
                            sx={{ width: 17, height: 17 }}
                          />
                        </AvatarGroup>
                        <Typography color="text.secondary">
                          4 mutual friends
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          boxShadow: "none",
                          bgcolor: isEqual(mode.mode, "light")
                            ? ""
                            : lightBlue[500],
                        }}
                        fullWidth
                        onClick={() => {
                          unfollow({
                            variables: {
                              unFollowUserId: `${AuthInfo.Data?._id}`,
                              friendId: `${friends._id}`,
                              unFollowId: `${GetRequestId}`,
                            },
                            onCompleted: async () => {
                              try {
                                await CreateNotification({
                                  ReceiverId: `${friends._id}`,
                                  SenderInfo: `${AuthInfo.Data?._id}`,
                                  isGroup: Boolean(false),
                                  isSeen: Boolean(false),
                                  NotiEngine: {
                                    GroupName: "",
                                    NotiImage: "",
                                    NotiText: "unfollowed you ",
                                  },
                                  NotiReference: NotiReference.unfollowed,
                                });
                              } catch (error) {
                                throw new Error(`${error}`);
                              }
                            },
                            refetchQueries: [ALL_FRIENDS, ALL_FRIEND_REQUESTS],
                          });
                          setUnfollowDiff(`${friends._id}`);
                        }}
                      >
                        {unfollowLoading && unfollowDiff === friends._id ? (
                          <ClipLoader
                            loading={followLoading}
                            size={20}
                            color="white"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          "unfollow"
                        )}
                      </Button>
                      <Box pt={0.4} mb={1}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#E8F0FE"
                              : "rgba(255, 255, 255, 0.1)",
                            boxShadow: "none",
                            ":hover": {
                              bgcolor: isEqual(mode.mode, "light")
                                ? "#E8F0FE"
                                : "rgba(255, 255, 255, 0.1)",
                              boxShadow: "none",
                              color: isEqual(mode.mode, "light")
                                ? "primary"
                                : "white",
                            },
                          }}
                          fullWidth
                        >
                          <Typography
                            fontWeight="bold"
                            color={
                              isEqual(mode.mode, "light") ? "primary" : "white"
                            }
                          >
                            Mute friend
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Friends;

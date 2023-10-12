import * as React from "react";
import {
  Box,
  Divider,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemButton,
  InputAdornment,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import {
  Outlet,
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  isEqual,
  debounce,
  findLastIndex,
  get,
  slice,
  gt,
  size,
  filter,
  property,
  map,
} from "lodash";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import Context from "../store/ContextApi";
import { CssTextFieldShare } from "../MuiStyles/textField";
import { IAuthState } from "../typings/GlobalState";
import {
  AllFriendsQuery,
  AllFriendsQueryVariables,
  UserFriendChatQuery,
  UserFriendChatQueryVariables,
} from "../__generated__/graphql";
import { ALL_FRIENDS } from "../graphql/Friends.graphql";
import { USER_FRIENDS_CHAT } from "../graphql/Chat.graphql";
import { upperFirst } from "lodash";
import { IfriendData, ContextType } from "../typings/Chat";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { IFriend } from "../typings/Friends";
import useWindowSize from "../hooks/useWindowSize";

dayjs.extend(relativeTime);

const Chat = () => {
  const ContextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [search, setSearch] = React.useState<string>("");

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };

    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 100);
  }, [search]);

  const [friendData, setFriendData] = React.useState<IfriendData | null>(null);
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const locationLogic: string[] = location.pathname.split("/");
  const { width, height } = useWindowSize();

  const { data: userFriends } = useQuery<
    AllFriendsQuery,
    AllFriendsQueryVariables
  >(ALL_FRIENDS, { variables: { FriendId: `${AuthInfo.Data?._id}` } });

  const { data } = useQuery<UserFriendChatQuery, UserFriendChatQueryVariables>(
    USER_FRIENDS_CHAT,
    {
      variables: {
        userFriendChatUserId: `${AuthInfo.Data?._id}`,
      },
    }
  );

  // get friends info in case the active user sent the friend request
  const sentFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.RequestId === `${AuthInfo.Data?._id}`;
  });

  // get user info in case the active acceptedId the friend request
  const receivedFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.AcceptedId === `${AuthInfo.Data?._id}`;
  });

  // merge sent and received friend requests
  const allFriends = [
    ...map(receivedFriends, property("User")),
    ...map(sentFriends, property("Receiver")),
  ] as IFriend<string>[];

  React.useEffect(() => {
    return () => {
      // cleanup debounce for the cause of rendering prevention
      debounceSearchResult.cancel();
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          className="container"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {(width && width > 720) ||
            (locationLogic.length === 3 && (
              <Box
                pb={{ xs: 3.8, sm: 3.8 }}
                sx={{
                  flex: 1,
                  borderRight: isEqual(mode.mode, "light")
                    ? `1px solid ${grey[400]}`
                    : `1px solid ${grey[800]}`,
                }}
              >
                <Box
                  sx={{
                    height: "10%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    px: 2,
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight="bold"
                      fontSize="1.6em"
                      sx={{
                        color: isEqual(mode.mode, "light") ? "black" : "white",
                      }}
                    >
                      Chats
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      algnItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        p: 0.7,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.3)",
                        borderRadius: "50%",
                      }}
                    >
                      <IconButton
                        sx={{ p: 0, m: 0 }}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                      >
                        <MoreHorizIcon
                          sx={{
                            color: isEqual(mode.mode, "light")
                              ? "black"
                              : grey[100],
                          }}
                        />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        p: 0.7,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.3)",
                        borderRadius: "100%",
                      }}
                    >
                      <IconButton
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx={{
                          p: 0,
                          m: 0,
                        }}
                      >
                        <EditIcon
                          sx={{
                            color: isEqual(mode.mode, "light")
                              ? "black"
                              : grey[100],
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    px: 2,
                  }}
                >
                  <CssTextFieldShare
                    sx={{
                      "& fieldset": {
                        border: "none",
                      },
                      "& .MuiOutlinedInput-root": {
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.2)",
                        borderRadius: 50,
                        border: "none",
                      },
                    }}
                    fullWidth
                    size="small"
                    placeholder="Search friends..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={debounceSearchResult}
                  />
                </Box>
                <Box sx={{ height: "calc(100% - 20.3%)", overflow: "auto" }}>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: "100%",
                      maxWidth: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    {allFriends
                      .filter((friends) =>
                        search.toLowerCase() === ""
                          ? friends
                          : friends.Firstname?.toLowerCase().includes(
                              `${search.toLowerCase()}`
                            )
                      )
                      .map((friends, index) => {
                        const chats = get(data, "UserFriendChat");

                        const lastUserMessage = chats
                          ?.map((chats) => chats?.From?._id)
                          .includes(`${friends._id}`);

                        const chatIndex =
                          chats?.[
                            findLastIndex(chats, {
                              From: { _id: `${friends._id}` },
                            })
                          ];

                        return (
                          <ListItem
                            sx={{ px: 0, mb: 2 }}
                            disablePadding
                            key={index}
                          >
                            <ListItemButton
                              onClick={(evt: React.MouseEvent) => {
                                evt.preventDefault();
                                navigate(`${friends._id}`);
                                setFriendData({
                                  _id: `${friends._id}`,
                                  Firstname: `${friends.Firstname}`,
                                  Lastname: `${friends.Lastname}`,
                                  Image: `${friends.Image}`,
                                  OnlineStatus: "online",
                                });
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ width: 54, height: 54 }}
                                  src={`${friends.Image}`}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography
                                    fontWeight="bold"
                                    color={
                                      isEqual(mode.mode, "light")
                                        ? "black"
                                        : "white"
                                    }
                                  >
                                    {upperFirst(`${friends.Firstname}`)}{" "}
                                    {friends.Lastname}
                                  </Typography>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography fontSize="14px">
                                      {lastUserMessage &&
                                      gt(size(chatIndex?.Chat), 0) ? (
                                        <span>
                                          {`" ${chatIndex?.Chat?.slice(
                                            0,
                                            40
                                          )} `}
                                          .
                                          <span style={{ fontWeight: "bold" }}>
                                            {` ${slice(
                                              dayjs(`${chatIndex?.createdAt}`)
                                                .fromNow(true)
                                                .replaceAll(/a\s/g, "1"),
                                              0,
                                              2
                                            )} `.replaceAll(",", "")}
                                          </span>
                                          "
                                        </span>
                                      ) : lastUserMessage &&
                                        gt(
                                          size(chatIndex?.PicturedMessage),
                                          0
                                        ) ? (
                                        <span>
                                          {" "}
                                          " sent you a photo .
                                          <span style={{ fontWeight: "bold" }}>
                                            {` ${slice(
                                              dayjs(`${chatIndex?.createdAt}`)
                                                .fromNow(true)
                                                .replaceAll(/a\s/g, "1"),
                                              0,
                                              2
                                            )} `.replaceAll(",", "")}{" "}
                                          </span>{" "}
                                          "
                                        </span>
                                      ) : (
                                        ' " no message " '
                                      )}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </Box>
              </Box>
            ))}

          {(width && width >= 720) ||
            (locationLogic.length === 4 && (
              <Box sx={{ flex: width && width < 720 ? 1 : 2.5 }}>
                <Outlet context={{ friendData } satisfies ContextType} />
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Chat;

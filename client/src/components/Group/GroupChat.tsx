import * as React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import grey from "@mui/material/colors/grey";
import blue from "@mui/material/colors/blue";
import CollectionsIcon from "@mui/icons-material/Collections";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { EventNoteOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import isEqual from "lodash/isEqual";
import { SyncLoader } from "react-spinners";
import { upperFirst } from "lodash";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
// internally crafted imports of resources
import { CssTextFieldShare } from "../../MuiStyles/textField";
import {
  RealTimeChatInGroupSubscription,
  ChatInGroupsQueryVariables,
  SendChatInGroupMutationVariables,
  SendChatInGroupMutation,
  GroupUsersQuery,
  GroupUsersQueryVariables,
  GroupInfoQuery,
  GroupInfoQueryVariables,
} from "../../__generated__/graphql";
import {
  REAL_TIME_CHAT_IN_GROUP,
  CHAT_IN_GROUP,
  GET_CHAT_IN_GROUP,
  GROUP_USERS,
  GROUP_INFO,
} from "../../graphql/Groups.graphql";
import { IGroupChat } from "../../typings/Groups";
import Context from "../../store/ContextApi";
import { IAuthState } from "../../typings/GlobalState";
import { IMode } from "../../typings/GlobalState";
import modeContext from "../../store/ModeContext";
import useNotification from "../../hooks/useNotifications";
import { Authentication } from "../../Global/GlobalAuth";
import { ALL_FRIENDS } from "../../graphql/Friends.graphql";
import { NotiReference } from "../../Enums";
import useWindowSize from "../../hooks/useWindowSize";

// it allows to have access to actual date from dayjs
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const GroupChat = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const [chats, setChats] = React.useState<
    IGroupChat["ChatWithFriendsInGroups"]
  >([]);

  let { groupname } = useParams<{ groupname: string }>();
  const isAuth = useReactiveVar(Authentication);

  const [text, setText] = React.useState<string>("");
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { PushNotification, CreateNotification } = useNotification(
    `${AuthInfo.Data?._id}`
  );

  // automatically determine user group chats placement
  const textPlacement: number = Math.floor(Math.random() * 20);

  const ScrollToTheBottom = React.useRef<HTMLDivElement | null>(null);
  const { width, height } = useWindowSize()

  const [sendChat, { loading }] = useMutation<
    SendChatInGroupMutation,
    SendChatInGroupMutationVariables
  >(CHAT_IN_GROUP);

  const { data: groupUsersData } = useQuery<
    GroupUsersQuery,
    GroupUsersQueryVariables
  >(GROUP_USERS, {
    variables: {
      groupUsersGroupId: `${groupname?.split("-")[1]}`,
      groupUsersGroupName: `${groupname?.split("-")[0]}`,
    },
  });

  const { data: GroupInfo } = useQuery<GroupInfoQuery, GroupInfoQueryVariables>(
    GROUP_INFO,
    {
      variables: {
        groupId: `${groupname?.split("-")[1]}`,
        groupName: `${groupname?.split("-")[0]}`,
      },
    }
  );

  const { data } = useQuery<IGroupChat, ChatInGroupsQueryVariables>(
    GET_CHAT_IN_GROUP,
    {
      variables: {
        chatWithFriendsInGroupsGroupId: `${groupname?.split("-")[1]}`,
      },
    }
  );

  React.useEffect(() => {
    if (!data) return;
    if (!data.ChatWithFriendsInGroups) return;

    if (data && data.ChatWithFriendsInGroups) {
      setChats(data.ChatWithFriendsInGroups);
    }
  }, [data]);

  // push real time notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  // Creating subscription for chats
  useSubscription<RealTimeChatInGroupSubscription>(REAL_TIME_CHAT_IN_GROUP, {
    onSubscriptionData: (subscriptionData) => {
      // This function will get triggered once a publish event is being triggered by the server
      // when new chat is being added
      if (subscriptionData?.subscriptionData?.data?.ChatWithFriendsInGroups) {
        // we are updating the state of chats
        setChats([
          ...chats,
          subscriptionData.subscriptionData.data.ChatWithFriendsInGroups,
        ]);
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };

    setText(target.value);
  };

  // function which role is to make the user still see the most recent message sent at the bottom of the page
  const ScrollFunc = React.useCallback(
    (behavior: ScrollBehavior | undefined) => {
      ScrollToTheBottom.current?.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    },
    [groupname?.split("-")[1]]
  );

  React.useEffect(() => {
    // scroll to the bottom of the list of messages
    ScrollFunc("smooth");
  }, [groupname?.split("-")[1], chats.length, loading]);

  return (
    <>
      <Box sx={{ height: 520 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", height: "inherit" }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Stack direction="row" spacing={1.1} sx={{ maxWidth: "100%" }}>
                {groupUsersData?.GroupUsers?.map((users) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.2,
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <Box>
                        <Avatar
                          alt="userPicture"
                          src={`${users?.Image}`}
                          sx={{ width: 65, height: 65 }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography fontSize="14px" sx={{ color: "black" }}>
                          {upperFirst(`${users?.Firstname}`)} {users?.Lastname}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              flex: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "calc(100% - 13.8%)",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  maxHeight: "100%",
                  height: "100%",
                  width: "inherit",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    minHeight: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: 17,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      pt: 2,
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Avatar
                        alt=""
                        src={`${GroupInfo?.GroupInfo?.GroupCoverImage}`}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="span" fontWeight="bold">
                        {GroupInfo?.GroupInfo?.GroupName}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        component="span"
                        fontSize="0.8rem"
                      >
                        the goal of {GroupInfo?.GroupInfo?.GroupName} group is
                        to foster informations
                      </Typography>
                      <Typography
                        color="text.secondary"
                        component="span"
                        fontSize="0.8rem"
                      >
                        we say no to discrimination all rights are equal
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, pt: "2px" }}>
                        <EventNoteOutlined />
                        <Typography>
                          created on{" "}
                          {dayjs(`${GroupInfo?.GroupInfo?.createdAt}`).format(
                            "MMMM D, YYYY"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mx={2}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        textAlign: "center",
                      }}
                    >
                      {chats?.map((value, index) => {
                        // display date when any message is sent
                        const date = dayjs(`${value?.createdAt}`).fromNow();

                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignSelf:
                                value.ChatPlacement % 2 === 0 ? "end" : "start",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  order: "flex-start",
                                }}
                              >
                                <Avatar
                                  alt="chatProfile"
                                  src={`${value.From?.Image}`}
                                />
                              </Box>
                              <Box sx={{ maxWidth: 220 }}>
                                <Box
                                  p={1}
                                  sx={{
                                    bgcolor:
                                      value?.From?._id ===
                                      `${AuthInfo.Data?._id}`
                                        ? blue[700]
                                        : "#d0e0fd",
                                    borderRadius: 2,
                                    order:
                                      value.ChatPlacement % 2 === 0 ? "1" : "2",
                                    AlignText: "start",
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color:
                                        value?.From?._id ===
                                        `${AuthInfo.Data?._id}`
                                          ? "#fafafa"
                                          : null,
                                    }}
                                  >
                                    {value?.Chat}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                alignSelf: "flex-end",
                              }}
                            >
                              <Typography
                                variant="body1"
                                color="text.secondary"
                                fontSize="0.7em"
                              >
                                {date}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box
                      py={1}
                      sx={{
                        display: loading ? "flex" : "none",
                        justifyContent:
                          textPlacement % 2 === 0 ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box sx={{ pr: 6.5 }}>
                        <SyncLoader
                          color="#1e88e5"
                          loading={loading}
                          size={16}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </Box>
                    </Box>
                    <Box ref={ScrollToTheBottom} />
                  </Box>
                  {/* end */}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: "12%",
                borderTop: `1px solid ${grey[400]}`,
                width: "100%",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "inherit",
                  boxSizing: "border-box",
                }}
              >
                <form
                  onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    try {
                      event.preventDefault();
                      setText("");
                      await sendChat({
                        variables: {
                          dataFeed: {
                            Chat: text,
                            ChatPlacement: textPlacement,
                            From: `${AuthInfo.Data?._id}`,
                            To: `${groupname?.split("-")[1]}`,
                            GroupId: `${groupname?.split("-")[1]}`,
                          },
                        },
                        onCompleted: async () => {
                          try {
                            await CreateNotification({
                              ReceiverId: `${groupname?.split("-")[1]}`,
                              SenderInfo: `${AuthInfo.Data?._id}`,
                              isGroup: Boolean(true),
                              isSeen: Boolean(false),
                              NotiEngine: {
                                GroupName: `${groupname?.split("-")[0]}`,
                                NotiImage: "",
                                NotiText: text,
                              },
                              NotiReference: NotiReference.Chat,
                            });
                          } catch (error) {
                            throw new Error(`${error}`);
                          }
                        },
                        refetchQueries: [ALL_FRIENDS],
                      });
                    } catch (error) {
                      throw new Error(`${error}`);
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "space-between",
                      gap: 0.5,
                    }}
                  >
                    <IconButton>
                      <CollectionsIcon sx={{ color: blue[700] }} />
                    </IconButton>
                    <IconButton>
                      <EmojiEmotionsIcon sx={{ color: blue[700] }} />
                    </IconButton>
                    <CssTextFieldShare
                      size="small"
                      fullWidth
                      sx={{
                        "& fieldset": { border: "none" },
                        ".MuiOutlinedInput-root": {
                          bgcolor: isEqual(mode.mode, "light")
                            ? "#E8F0FE"
                            : "rgba(255,255, 255, 0.2)",
                          borderRadius: 50,
                          color: isEqual(mode.mode, "light")
                            ? grey[700]
                            : grey[200],
                        },
                      }}
                      placeholder="write a message..."
                      onChange={handleChange}
                    />
                    <IconButton type="submit">
                      <SendIcon sx={{ color: blue[700] }} />
                    </IconButton>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default GroupChat;

import * as React from "react";
import { Box, Typography, Avatar, IconButton, Divider } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { blue, grey } from "@mui/material/colors";
import { EventNoteOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isUndefined, gt, size, isEqual, upperFirst } from "lodash";
import { useOutletContext } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { SyncLoader } from "react-spinners";
// internally crafted imports of resources
import {
  UserChatsQueryVariables,
  ChatWithFriendsMutation,
  ChatWithFriendsMutationVariables,
} from "../__generated__/graphql";
import { USER_CHATS } from "../graphql/Chat.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { InstantUserChatsSubscription } from "../__generated__/graphql";
import { INSTANT_USER_CHATS, CHAT_WITH_FRIENDS } from "../graphql/Chat.graphql";
import { IUserChat, ContextType } from "../typings/Chat";
import { IBottomChatProps } from "../typings/Chat";
import BottomChat from "../components/BottomChat";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { USER_FRIENDS_CHAT } from "../graphql/Chat.graphql";
import { NotiReference } from "../Enums";
import { Authentication } from "../Global/GlobalAuth";
import useNotification from "../hooks/useNotifications";
import { ALL_FRIENDS } from "../graphql/Friends.graphql";

const ChatSpace = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  // it allows to have access to actual date from dayjs
  dayjs.extend(relativeTime);

  const { friendData } = useOutletContext<ContextType>();
  const [text, setText] = React.useState<string>("");

  const ScrollToTheBottom = React.useRef<HTMLDivElement | null>(null);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const isAuth = useReactiveVar(Authentication);
  const { CreateNotification, PushNotification } = useNotification();

  const { id }: { id?: string } = useParams<{ id: string }>();

  const { data } = useQuery<IUserChat, UserChatsQueryVariables>(USER_CHATS, {
    variables: {
      chatUserInfo: {
        friendId: `${id}`,
        activeUserId: `${AuthInfo.Data?._id}`,
      },
    },
  });

  const [chatwithfriends, { loading: chatLoading }] = useMutation<
    ChatWithFriendsMutation,
    ChatWithFriendsMutationVariables
  >(CHAT_WITH_FRIENDS);

  // creating local state for chats, so that once we get subscription event for
  // new chat, we can update the state and see the latest chat on the UI
  const [chats, setChats] = React.useState<IUserChat["Chat"]>([]);

  React.useEffect(() => {
    if (!data) return;
    if (!data.Chat) return;
    if (data && data.Chat) {
      // if chat data is not null or undefined add it to the state of chats
      setChats(data.Chat);
    }
  }, [data]);

  // push real time notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  // Creating subscription for chats
  useSubscription<InstantUserChatsSubscription>(INSTANT_USER_CHATS, {
    onSubscriptionData: (subscriptionData) => {
      // This function will get triggered once a publish event is being triggered by the server
      // when new chat is being added
      if (subscriptionData?.subscriptionData?.data?.Chat) {
        // we are updating the state of chats
        setChats([...chats, subscriptionData.subscriptionData.data.Chat]);
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
    [id]
  );

  React.useEffect(() => {
    // scroll to the bottom of the list of messages
    ScrollFunc("smooth");
  }, [id, chats.length, chatLoading]);

  const bottomData: IBottomChatProps = {
    handleChange,
    userId: `${AuthInfo.Data?._id}`,
    setText,
    text,
  };

  return (
    <>
      <Box
        sx={{
          height: "13%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: 1,
          }}
        >
          <Avatar
            alt="userPicture"
            src={`${friendData?.Image}`}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="span" fontWeight="bold">
              {upperFirst(`${friendData?.Firstname}`)}{" "}
              {upperFirst(`${friendData?.Lastname}`)}
            </Typography>
            <Typography component="span" color="text.secondary">
              last seen, 2 hours ago
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Typography component="span" color="text.secondary">
            not active now
          </Typography>
          <IconButton
            sx={{
              bgcolor: isEqual(mode.mode, "light")
                ? "#E8F0FE"
                : "rgba(255, 255, 255, 0.3)",
            }}
          >
            <AccountCircleOutlinedIcon
              sx={{ color: isEqual(mode.mode, "light") ? "black" : grey[100] }}
            />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: "calc(100% - 27%)", overflowY: "auto" }}>
        <Box
          sx={{
            maxHeight: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              minHeight: "inherit",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 20,
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
                  src={`${friendData?.Image}`}
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
                  {friendData?.Firstname} {friendData?.Lastname}
                </Typography>
                <Typography
                  color="text.secondary"
                  component="span"
                  fontSize="0.8rem"
                >
                  you and {friendData?.Firstname} {friendData?.Lastname} are
                  friends on Thirdy
                </Typography>
                <Typography
                  color="text.secondary"
                  component="span"
                  fontSize="0.8rem"
                >
                  super model and administrator
                </Typography>
                <Box sx={{ display: "flex", gap: 1, pt: "2px" }}>
                  <EventNoteOutlined />
                  <Typography>Join on Jannuary 12, 2010</Typography>
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
                  const isGuest: boolean =
                    value.From?._id === AuthInfo.Data?._id;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf:
                          value?.From?._id === AuthInfo.Data?._id
                            ? "end"
                            : "start",
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
                            order: isGuest ? "2" : "1",
                          }}
                        >
                          <Avatar
                            alt="chatProfile"
                            src={`${value.From?.Image}`}
                          />
                        </Box>
                        <Box
                          p={1}
                          sx={{
                            bgcolor:
                              value?.From?._id === AuthInfo.Data?._id
                                ? blue[700]
                                : value.From?._id !== AuthInfo.Data?._id &&
                                  isEqual(mode.mode, "dark")
                                ? "rgba(255,255, 255, 0.2)"
                                : "#d0e0fd",
                            borderRadius: 2,
                            order: isGuest ? "1" : "2",
                            AlignText: "center",
                          }}
                        >
                          {!isUndefined(value.Chat) &&
                            gt(value?.Chat?.length, 1) &&
                            isEqual(value.PicturedMessage, "") && (
                              <Typography
                                variant="body1"
                                sx={{
                                  color:
                                    value?.From?._id === AuthInfo.Data?._id
                                      ? "#fafafa"
                                      : value?.From?._id !== AuthInfo.Data &&
                                        isEqual(mode.mode, "dark")
                                      ? "white"
                                      : null,
                                }}
                              >
                                {value?.Chat}
                              </Typography>
                            )}
                          {!isUndefined(value.PicturedMessage) &&
                            gt(value?.PicturedMessage?.length, 1) &&
                            isEqual(value.Chat, "") && (
                              <img
                                style={{ width: 200, height: 140 }}
                                alt={`${value.From?._id}`}
                                src={`${value.PicturedMessage}`}
                              />
                            )}
                          {!isUndefined(value.PicturedMessage) &&
                            gt(size(value?.PicturedMessage), 1) &&
                            gt(size(value?.Chat), 1) &&
                            !isUndefined(value?.Chat) && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Box sx={{ width: 200, height: 140 }}>
                                  <img
                                    style={{
                                      width: "inherit",
                                      height: "inherit",
                                    }}
                                    alt={`${value.PicturedMessage}`}
                                    src={`${value.PicturedMessage}`}
                                  />
                                </Box>
                                <Box
                                  p={1}
                                  sx={{
                                    bgcolor: grey[200],
                                    alignText: "center",
                                    maxWidth: 185,
                                  }}
                                >
                                  <Typography>{value?.Chat}</Typography>
                                </Box>
                              </Box>
                            )}
                        </Box>
                      </Box>
                      <Box
                        sx={{ alignSelf: isGuest ? "flex-start" : "flex-end" }}
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
                  display: chatLoading ? "flex" : "none",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ pr: 6.5 }}>
                  <SyncLoader
                    color="#1e88e5"
                    loading={chatLoading}
                    size={16}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </Box>
              </Box>
              <Box ref={ScrollToTheBottom} />
            </Box>
          </Box>
        </Box>
      </Box>
      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
            setText("");
            await chatwithfriends({
              variables: {
                chatInfo: {
                  Chat: text,
                  From: `${AuthInfo.Data?._id}`,
                  To: `${friendData?._id}`,
                },
              },
              refetchQueries: [USER_FRIENDS_CHAT, ALL_FRIENDS],
              onCompleted: async () => {
                try {
                  await CreateNotification({
                    ReceiverId: `${friendData?._id}`,
                    SenderInfo: `${AuthInfo.Data?._id}`,
                    isGroup: Boolean(false),
                    isSeen: Boolean(false),
                    NotiEngine: {
                      GroupName: "",
                      NotiImage: "",
                      NotiText: text,
                    },
                    NotiReference: NotiReference.Chat,
                  });
                } catch (error) {
                  throw new Error(`${error}`);
                }
              },
            });
          } catch (error) {
            throw new Error(`${error}`);
          }
        }}
      >
        <Box
          sx={{
            height: "10%",
            position: "fixed",
            bottom: 0,
            borderTop: isEqual(mode.mode, "light")
              ? `1px solid ${grey[400]}`
              : `1px solid ${grey[800]}`,
            width: "100%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
          }}
        >
          <BottomChat {...bottomData} />
        </Box>
      </form>
    </>
  );
};

export default ChatSpace;

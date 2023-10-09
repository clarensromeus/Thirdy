import * as React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { ArrowBack, Send } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { isEqual } from "lodash";
// internally crafted import resources
import {
  ChatWithFriendsMutation,
  ChatWithFriendsMutationVariables,
} from "../__generated__/graphql";
import { CHAT_WITH_FRIENDS, USER_CHATS } from "../graphql/Chat.graphql";
import { ISendImage } from "../typings/Chat";
import { IMode } from "../typings/GlobalState";
import modeContext from "../store/ModeContext";
import useNotification from "../hooks/useNotifications";
import { IS_AUTH } from "../LocalQueries/isAuth";
import { IAuthentication } from "../typings/Authentication";
import { NotiReference } from "../Enums";

const SendImageFrame = ({
  setState,
  state,
  ImageInfo: { PreviewImage, Image, setValid, IsValid },
  Info: { from },
}: ISendImage) => {
  const { id }: { id?: string } = useParams<{ id: string }>();

  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [ChatWithFriend, { loading }] = useMutation<
    ChatWithFriendsMutation,
    ChatWithFriendsMutationVariables
  >(CHAT_WITH_FRIENDS);

  // query with local only field
  const { data } = useQuery<IAuthentication>(IS_AUTH);

  const { CreateNotification, PushNotification } = useNotification();

  // push Real time notifications
  PushNotification({ isAuth: Boolean(data?.isLoggedIn.isLoggedIn) });

  return (
    <>
      <Box
        sx={{
          display: IsValid ? "block" : "none",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(0,0,0,0.7)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
            width: 550,
            height: 440,
          }}
        >
          <Box sx={{ bgcolor: blueGrey[100] }}>
            <IconButton
              onClick={() => {
                setValid(false);
              }}
            >
              <ArrowBack sx={{ fonSize: "1.3em", color: "black" }} />
            </IconButton>
          </Box>
          <Box
            mt={-2}
            sx={{
              width: "inherit",
              height: "inherit",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: 300,
                width: 370,
                border: "1px solid grey",
                alignText: "center",
              }}
            >
              <img
                style={{ width: "inherit", height: "inherit" }}
                alt="PicturedMessage"
                src={PreviewImage}
              />
            </Box>
            <Box>
              <Button
                endIcon={<Send />}
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: isEqual(mode.mode, "light") ? "" : "#0866ff",
                }}
                onClick={async () => {
                  try {
                    await ChatWithFriend({
                      variables: {
                        chatWithFriendsPicture: Image,
                        chatInfo: {
                          From: from,
                          To: `${id}`,
                          Chat: "",
                        },
                      },
                      onCompleted: async () => {
                        try {
                          await CreateNotification({
                            ReceiverId: `${id}`,
                            SenderInfo: from,
                            isGroup: Boolean(false),
                            isSeen: Boolean(false),
                            NotiEngine: {
                              GroupName: "",
                              NotiImage: "Image",
                              NotiText: "",
                            },
                            NotiReference: NotiReference.photo,
                          });
                        } catch (error) {
                          throw new Error(`${error}`);
                        }
                      },
                      refetchQueries: [USER_CHATS],
                    });
                  } catch (error) {
                    throw new Error(`${error}`);
                  }
                }}
              >
                {loading ? (
                  <ClipLoader
                    color="#fafafa"
                    loading={loading}
                    size={12}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "send"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SendImageFrame;

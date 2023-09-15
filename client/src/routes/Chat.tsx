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
import { CssTextFieldShare } from "../MuiStyles/textField";
import { Outlet, useNavigate, NavigateFunction } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
// internally crafted imports of ressources
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import {
  AllFriendsQuery,
  AllFriendsQueryVariables,
} from "../__generated__/graphql";
import { ALL_FRIENDS } from "../graphql/Friends.graphql";
import { upperFirst } from "lodash";
import { IfriendData, ContextType } from "../typings/Chat";

const Chat = () => {
  const ContextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);

  const [friendData, setFriendData] = React.useState<IfriendData | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const { data: userFriends } = useQuery<
    AllFriendsQuery,
    AllFriendsQueryVariables
  >(ALL_FRIENDS, { variables: { FriendId: `${AuthInfo.Data?._id}` } });

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
          <Box sx={{ flex: 1, border: `1px solid ${grey[400]}` }}>
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
                <Typography fontWeight="bold" fontSize="1.6em">
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
                    bgcolor: "#E8F0FE",
                    borderRadius: "50%",
                  }}
                >
                  <IconButton
                    sx={{ p: 0, m: 0 }}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    <MoreHorizIcon sx={{ color: "black" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    p: 0.7,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#E8F0FE",
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
                    <EditIcon sx={{ color: "black" }} />
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
                sx={{ "& fieldset": { border: "none" } }}
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
                {userFriends?.AllFriends?.map((friends, index) => {
                  return (
                    <ListItem sx={{ px: 0, mb: 2 }} disablePadding key={index}>
                      <ListItemButton
                        onClick={(evt: React.MouseEvent) => {
                          evt.preventDefault();
                          navigate(`${friends.User?._id}`);
                          setFriendData({
                            _id: `${friends.User?._id}`,
                            Firstname: `${friends.User?.Firstname}`,
                            Lastname: `${friends.User?.Lastname}`,
                            Image: `${friends.User?.Image}`,
                            OnlineStatus: "online",
                          });
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{ width: 54, height: 54 }}
                            src={`${friends.User?.Image}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight="bold">
                              {upperFirst(`${friends.User?.Firstname}`)}{" "}
                              {friends.User?.Lastname}
                            </Typography>
                          }
                          secondary="Jan 9, 2014"
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
          {/* spaceChat */}
          <Box sx={{ flex: 2.5 }}>
            <Outlet context={{ friendData } satisfies ContextType} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Chat;

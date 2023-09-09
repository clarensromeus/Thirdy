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
import { grey, blue } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CssTextFieldShare } from "../MuiStyles/textField";
import SearchIcon from "@mui/icons-material/Search";
import { EventNoteOutlined } from "@mui/icons-material";
import CollectionsIcon from "@mui/icons-material/Collections";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useRecoilValue } from "recoil";
// internally crafted imports of ressources
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

const Chat = () => {
  const ContextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);
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
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmyVBbnUXzsoYUTYYw5lLTbgW6mGE-Eb3a_A-4v2zEoEV5FU5TJQ4bqr1tpOgsxSn34I&usqp=CAU"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">
                          Georges virgin
                        </Typography>
                      }
                      secondary="Jan 9, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://i.pinimg.com/236x/c1/5d/02/c15d020633bd1f59d15979ae9219912c.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">
                          Orilla rosenie
                        </Typography>
                      }
                      secondary="Jan 7, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEoedAxAu2ud-GKkMSy03HBAxaMgQfPYquaSBaAEC7pXNq5EdV16W06MBwK1YyHqDaidA&usqp=CAU"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">Paul Baubrun</Typography>
                      }
                      secondary="July 20, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEoedAxAu2ud-GKkMSy03HBAxaMgQfPYquaSBaAEC7pXNq5EdV16W06MBwK1YyHqDaidA&usqp=CAU"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">Roselin peter</Typography>
                      }
                      secondary="July 20, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://www.procopio.com/static/ee6af0881ebf1148a7746bed03444e63/aab3c/Sara-Neva-profile.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">
                          Romeus hervelange
                        </Typography>
                      }
                      secondary="July 20, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://i.pinimg.com/originals/f4/b1/50/f4b150b1c5bad7d9b539eace794886b4.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">Ladiga fatima</Typography>
                      }
                      secondary="July 20, 2014"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 54, height: 54 }}
                        src="https://i.mdel.net/i/db/2018/8/950522/950522-800w.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">Jhon kerry</Typography>
                      }
                      secondary="July 20, 2014"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box sx={{ flex: 2.5 }}>
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
                  src="https://www.procopio.com/static/ee6af0881ebf1148a7746bed03444e63/aab3c/Sara-Neva-profile.jpg"
                  sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography component="span" fontWeight="bold">
                    romeus hervelange
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
                <IconButton sx={{ bgcolor: "#E8F0FE" }}>
                  <AccountCircleOutlinedIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ height: "calc(100% - 27%)", overflowY: "auto" }}>
              <Box
                sx={{
                  maxHeight: "100%",
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
                      src="https://www.procopio.com/static/ee6af0881ebf1148a7746bed03444e63/aab3c/Sara-Neva-profile.jpg"
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
                      Romeus hervelange
                    </Typography>
                    <Typography
                      color="text.secondary"
                      component="span"
                      fontSize="0.8rem"
                    >
                      you and hervelange are friends on Thirdy
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
                <Box
                  px={2}
                  sx={{
                    pt: "20%",
                    display: "flex",
                    justifyContent: "space-between",
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
                    <Box>
                      <Avatar
                        alt="guestImage"
                        src="https://www.procopio.com/static/ee6af0881ebf1148a7746bed03444e63/aab3c/Sara-Neva-profile.jpg"
                      />
                    </Box>
                    <Box sx={{ maxWidth: 280 }}>
                      <Box
                        sx={{
                          wordBreak: "break-all",
                          bgcolor: "#d0e0fd",
                          p: 1.6,
                          borderRadius: 10,
                        }}
                      >
                        <Typography fontWeight="bold">
                          hello! how are doing?
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    pt={5}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ maxWidth: 280 }}>
                      <Box
                        sx={{
                          wordBreak: "break-all",
                          p: 1.6,
                          borderRadius: 10,
                          bgcolor: blue[700],
                        }}
                      >
                        <Typography fontWeight="bold" sx={{ color: "#fafafa" }}>
                          doing fine, what about you?
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Avatar
                        alt="activeUserImage"
                        src={`${AuthInfo.Data?.Image}`}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: "10%",
                position: "fixed",
                bottom: 0,
                borderTop: `1px solid ${grey[400]}`,
                width: "100%",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                bgcolor: "white",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "71%",
                  boxSizing: "border-box",
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
                    sx={{ "& fieldset": { border: "none" } }}
                    placeholder="write a message..."
                  />
                  <IconButton>
                    <SendIcon sx={{ color: blue[700] }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Chat;

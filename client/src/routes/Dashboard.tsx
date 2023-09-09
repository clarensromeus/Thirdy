import * as React from "react";
// internall imports of ressources
import { Box, Divider, Typography, Paper, Button } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Avatar from "@mui/material/Avatar";
import blue from "@mui/material/colors/blue";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
// internally crafted imports of ressources
import { CssTextField, TextFieldWrapper } from "../MuiStyles/textField";
import StatusSwiper from "./StatusSwiper";
import CardPost from "../components/Card";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { IPostFrame } from "../typings/Post";
import PostFrame from "../components/PostFrame";
import { ContactList, UserContacts } from "../components/Contact";
import { IContact } from "../typings/Home";

const Dashboard = (): JSX.Element => {
  const ContextData = React.useContext(Context);
  // grab connected user info from the global state
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);

  const [openFrame, setOpenFrame] = React.useState<boolean>(false);
  const [seeAll, setSeeAll] = React.useState<number>(3);

  const PostData: IPostFrame = {
    openFrame,
    setOpenFrame,
    UserInfo: {
      Firstname: `${AuthInfo.Data?.Firstname}`,
      Lastname: `${AuthInfo.Data?.Lastname}`,
      Email: `${AuthInfo.Data?.Email}`,
      Image: `${AuthInfo.Data?.Image}`,
    },
  };

  const cardWidth: { width: number } = {
    width: 500,
  };

  const Contacts: IContact<string>[] = UserContacts(ContactList, seeAll);
  return (
    <>
      <PostFrame {...PostData} />
      <Box sx={{ display: "flex", gap: 5, py: 3 }}>
        <Box
          sx={{
            width: "max(30%, 70%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Paper sx={{ borderRadius: 2 }}>
            <Box
              className="stories"
              sx={{ p: 3, width: 450, bgcolor: "white", borderRadius: 2 }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box pt="4px">
                  <Typography fontWeight="bold" textTransform="capitalize">
                    story
                  </Typography>
                </Box>
                <Box>
                  <AutoStoriesIcon
                    sx={{ color: blue[600], fontSize: "1.9rem" }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box sx={{ height: 195, width: "inherit", pt: 1 }}>
                <StatusSwiper />
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ borderRadius: 2 }}>
            <Box
              px={3}
              py={2}
              sx={{
                width: 450,
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <Avatar alt="profile" src={`${AuthInfo.Data?.Image}`}></Avatar>
              </Box>
              <Box sx={{ width: "inherit" }}>
                <TextFieldWrapper>
                  <CssTextField
                    fullWidth
                    placeholder="What's on your mind?"
                    onFocus={() => setOpenFrame(true)}
                  />
                </TextFieldWrapper>
              </Box>
              <Box pt={1}>
                <CameraAltIcon sx={{ color: blue[700] }} />
              </Box>
            </Box>
          </Paper>
          <Box>
            <CardPost {...cardWidth} />
          </Box>
        </Box>
        <Box>
          <Box className="suggestion" sx={{ position: "sticky", top: "80px" }}>
            <Box>
              <Typography fontWeight="bold" color="text.secondary">
                Friend requests
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, py: 2 }}>
              <Box>
                <Avatar
                  alt="people"
                  src="data:image/jpeg;base64,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"
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>
                  <Typography fontWeight="bold">Jhon Williams</Typography>
                </Box>
                <Box sx={{ alignSelf: "flex-start", display: "flex", gap: 1 }}>
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
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    sx={{
                      boxShadow: "none",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      borderRadius: 30,
                      bgcolor: blue[700],
                      color: "white",
                      px: 2,
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{
                      boxShadow: "none",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      borderRadius: 30,
                      bgcolor: "#E8F0FE",
                      color: "black",
                      px: 2,
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box pt={2} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <IconButton sx={{ bgcolor: "#E8F0FE" }}>
                <AddIcon sx={{ color: "black" }} />
              </IconButton>
              <Box>
                <Typography fontWeight="bold">Create new group</Typography>
              </Box>
            </Box>
            <Box
              pt="6px"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography fontWeight="bold" color="text.secondary">
                  Contacts
                </Typography>
              </Box>
              <Box>
                <IconButton
                  sx={{ mt: 1, px: 0 }}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={() => setSeeAll(ContactList.length + 1)}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <List
                sx={{
                  width: "100%",
                  m: 0,
                  p: 0,
                  maxWidth: 300,
                  bgcolor: "rgba(232,240,254, 0.1)",
                }}
              >
                {Contacts.map((value, index) => {
                  const { Firstname, Lastname, Image, Date } = value;
                  return (
                    <ListItem key={index} sx={{ px: 0, py: 0, m: 0 }}>
                      <ListItemButton sx={{ px: 0, py: 0, m: 0 }}>
                        <ListItemAvatar>
                          <Avatar alt="Friends" src={Image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight="bold">
                              {Firstname} {Lastname}
                            </Typography>
                          }
                          secondary={Date}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

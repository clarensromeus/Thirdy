import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import GroupsIcon from "@mui/icons-material/Groups";
import Icon from "@mui/material/Icon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { loadCSS } from "fg-loadcss";
import {
  useLocation,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import blue from "@mui/material/colors/blue";
import isNil from "lodash/isNil";
import isEqual from "lodash/isEqual";
import grey from "@mui/material/colors/grey";
import isUndefined from "lodash/isUndefined";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import { StyledBadge } from "./MuiStyles";
import { IDrawer } from "../typings/Home";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";

const AppDrawer = () => {
  const drawerWidth: number = 300;

  const location: Location = useLocation();

  const navigate: NavigateFunction = useNavigate();

  const ContextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const DrawerInfo: IDrawer<string>[] = [
    {
      Text: "Thirdy",
      DrawerIcon: HomeIcon,
      Path: "thirdy",
    },
    {
      Text: "Friends",
      DrawerIcon: PeopleIcon,
      Path: "friends",
    },
    {
      Text: "Notifications",
      DrawerIcon: NotificationsIcon,
      Path: "notifications",
    },
    {
      Text: "Chat",
      DrawerIcon: "",
      Path: "chat",
    },
    {
      Text: "Groups",
      DrawerIcon: GroupsIcon,
      Path: "groups",
    },
    {
      Text: "New status",
      DrawerIcon: AddIcon,
      Path: "status",
    },
  ];

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css"
      // Inject before JSS
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  const ischatRoom: boolean = location.pathname.split("/").includes("chat");

  return (
    <>
      <Drawer
        variant={ischatRoom ? "temporary" : "permanent"}
        color="rgba(232,240,254, 0.2)"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          pt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box pl={6}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                onClick={() => {
                  navigate(`profile/${AuthInfo.Data?._id}`);
                }}
                alt="Profile"
                src={`${AuthInfo.Data?.Image}`}
                sx={{ width: 57, height: 57 }}
              />
            </StyledBadge>
          </Box>
          <Box pl={4}>
            <Typography
              fontFamily="Times New Roman, serif"
              variant="body2"
              sx={{
                color: isEqual(mode.mode, "light") ? "black" : "white",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {AuthInfo.Data?.Firstname} {AuthInfo.Data?.Lastname}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {DrawerInfo.map((info) => {
              const [__, second, third]: string[] =
                location.pathname.split("/");

              const { Path, DrawerIcon } = info;

              const isMatch: boolean = !isNil(third) && third === Path;
            
              return (
                <ListItem
                  key={info.Text}
                  disablePadding
                  sx={{
                    bgcolor:
                      isMatch && isEqual(mode.mode, "light")
                        ? "#E8F0FE"
                        : (isMatch && isEqual(mode.mode, "dark")) ||
                          (isUndefined(third) &&
                            second === Path &&
                            isEqual(mode.mode, "dark"))
                        ? "rgba(255,255, 255, 0.2)"
                        : isUndefined(third) &&
                          second === Path &&
                          isEqual(mode.mode, "light")
                        ? "#E8F0FE"
                        : null,
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      navigate(`${Path}`);
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          p: 1,
                          bgcolor:
                            isMatch && isEqual(mode.mode, "light")
                              ? blue[600]
                              : !isMatch &&
                                isEqual(mode.mode, "light") &&
                                second !== Path
                              ? "#E8F0FE"
                              : !isMatch &&
                                isUndefined(third) &&
                                second === Path &&
                                isEqual(mode.mode, "light")
                              ? blue[600]
                              : !isMatch &&
                                !isUndefined(third) &&
                                second === Path &&
                                isEqual(mode.mode, "light")
                              ? "#E8F0FE"
                              : "",
                          backgroundImage:
                            isMatch && isEqual(mode.mode, "light")
                              ? blue[600]
                              : isMatch && isEqual(mode.mode, "dark")
                              ? "linear-gradient(black, white)"
                              : !isMatch && isEqual(mode.mode, "dark")
                              ? "linear-gradient(black, white)"
                              : isUndefined(third) &&
                                second === Path &&
                                isEqual(mode.mode, "dark")
                              ? "linear-gradient(black, white)"
                              : "linear-gradient(blue)",
                          borderRadius: 50,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {Path === "chat" ? (
                          <Icon
                            sx={{
                              color:
                                isMatch && isEqual(mode.mode, "light")
                                  ? "white"
                                  : isMatch && isEqual(mode.mode, "dark")
                                  ? grey[100]
                                  : !isMatch && isEqual(mode.mode, "dark")
                                  ? "white"
                                  : isUndefined(third) &&
                                    second === Path &&
                                    isEqual(mode.mode, "light")
                                  ? "white"
                                  : isUndefined(third) &&
                                    second === Path &&
                                    isEqual(mode.mode, "dark")
                                  ? grey[100]
                                  : "black",
                            }}
                            baseClassName="fas"
                            className="fa-solid fa-comment"
                            fontSize="small"
                          />
                        ) : (
                          <DrawerIcon
                            sx={{
                              color:
                                isMatch && isEqual(mode.mode, "light")
                                  ? "white"
                                  : isMatch && isEqual(mode.mode, "dark")
                                  ? grey[100]
                                  : isUndefined(third) &&
                                    second === Path &&
                                    isEqual(mode.mode, "light")
                                  ? "white"
                                  : !isMatch && isEqual(mode.mode, "dark")
                                  ? "white"
                                  : isUndefined(third) &&
                                    second === Path &&
                                    isEqual(mode.mode, "dark")
                                  ? grey[100]
                                  : "black",
                            }}
                          />
                        )}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: isEqual(mode.mode, "light")
                          ? "black"
                          : grey[100],
                      }}
                      primary={
                        <Typography fontWeight="570" fontSize="16px">
                          {info.Text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppDrawer;

import * as React from "react";
// external imports of resources
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import blue from "@mui/material/colors/blue";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Divider from "@mui/material/Divider";
import grey from "@mui/material/colors/grey";
import Icon from "@mui/material/Icon";
import { Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useJwt } from "react-jwt";
import { isEqual } from "lodash";
import { useReactiveVar } from "@apollo/client";
import { CircleLoader } from "react-spinners";
// internally crafted imports of resources
import AppDrawer from "../components/Drawer";
import { IMenu } from "../typings/Menu";
import ProfileMenu from "../components/Menu";
import { Get_UserData } from "../graphql/User.graphql";
import Context from "../store/ContextApi";
import { IAuthState, IMode } from "../typings/GlobalState";
import {
  UserDataQuery,
  UserDataQueryVariables,
} from "../__generated__/graphql";
import { serializeUserData } from "../utils";
import { INotiPopperProps } from "../typings/Notifications";
import NotiPopper from "../components/NotificationPopper";
import IsOnline from "../components/OnlineOfflineStatus";
import OnlineLayer from "../components/OnlineLayer";
import useNotification from "../hooks/useNotifications";
import modeContext from "../store/ModeContext";
import SearchBar from "../components/MainSearch";
import useWindowSize from "../hooks/useWindowSize";
import { AllNotifications } from "../Global/GlobalNotifications";

const Home = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // notifications popper state
  const [openNoti, setOpenNoti] = React.useState(false);
  const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(
    null
  );

  const notifications = useReactiveVar(AllNotifications);

  // event handler notifications popper
  const handleClickNoti = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNoti(event.currentTarget);
    setOpenNoti((previousOpen) => !previousOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const ContextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  // decode the token stored in the browser
  const { decodedToken }: any = useJwt(
    `${localStorage.getItem("TOKEN")} ` ?? ""
  );

  const setState = useSetRecoilState<Partial<IAuthState>>(
    ContextData.AuthState
  );

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { ReadNotification } = useNotification(`${AuthInfo.Data?._id}`);

  const Notifications = ReadNotification({});

  const Menu: IMenu = {
    anchorEl,
    setAnchorEl,
    open,
    setOpen,
  };

  const NotificationsData: INotiPopperProps = {
    openNoti,
    setAnchorElNoti,
    anchorElNoti,
  };

  const { data, loading } = useQuery<
    Omit<UserDataQuery, "__typename">,
    UserDataQueryVariables
  >(Get_UserData, {
    onCompleted: (data: Omit<UserDataQuery, "__typename">) => {
      const userData = serializeUserData({
        _id: `${data.userData?._id}`,
        Firstname: `${data.userData?.Firstname}`,
        Lastname: `${data.userData?.Lastname}`,
        Email: `${data.userData?.Email}`,
        Password: `${data.userData?.Password}`,
        Image: `${data.userData?.Image}`,
        DOB: `${data.userData?.DOB}`,
        Sex: `${data.userData?.Sex}`,
        Bio: `${data.userData?.Bio}`,
      });

      setState({ Data: userData });
    },
    variables: {
      _id: `${decodedToken?._id}`,
    },
  });

  React.useEffect(() => {
    // notifications is undefined return nothing
    if (!Notifications) return;
    if (!Notifications.GetNotifications) return;
    AllNotifications({ Notifications: Notifications.GetNotifications });
  }, [Notifications?.GetNotifications?.length]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            with: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
          }}
        >
          <CircleLoader
            color="black"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <NotiPopper {...NotificationsData} />
          <AppBar
            elevation={isEqual(mode.mode, "light") ? 0 : 5}
            position="fixed"
            sx={{
              bgcolor: isEqual(mode.mode, "light") ? "white" : "",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <Typography
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    fontFamily: "Roboto",
                    fontStyle: "italic",
                    textTransform: "capitalize",
                    fontSize: "1.9em",
                    color: blue[600],
                  },
                }}
              >
                thirdy
              </Typography>
              <SearchBar />
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <IconButton
                  size="small"
                  aria-label="show 4 new mails"
                  disableRipple
                  disableFocusRipple
                >
                  <Box
                    sx={{
                      p: "13px",
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: isEqual(mode.mode, "light")
                        ? "#E8F0FE"
                        : "rgba(255, 255, 255, 0.1)",
                      borderRadius: 40,
                    }}
                  >
                    <Badge badgeContent={4} color="error">
                      <Icon
                        baseClassName="fas"
                        className="fa-solid fa-comment"
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? "black"
                            : grey[200],
                        }}
                        fontSize="small"
                      />
                    </Badge>
                  </Box>
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="show 17 new notifications"
                  disableRipple
                  disableFocusRipple
                  onClick={handleClickNoti}
                >
                  <Box
                    sx={{
                      p: "13px",
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: isEqual(mode.mode, "light")
                        ? "#E8F0FE"
                        : "rgba(255, 255, 255, 0.1)",
                      borderRadius: 40,
                    }}
                  >
                    <Badge
                      badgeContent={
                        notifications.Notifications.filter((notification) =>
                          notification.ReceiverId?.includes(
                            `${AuthInfo.Data?._id}`
                          )
                        ).length ?? 0
                      }
                      color="error"
                    >
                      <NotificationsIcon
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? "black"
                            : grey[200],
                        }}
                      />
                    </Badge>
                  </Box>
                </IconButton>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  disableFocusRipple
                  disableRipple
                >
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt=""
                    src={`${data?.userData?.Image}`}
                  />
                </IconButton>
                <ProfileMenu {...Menu} />
              </Box>
            </Toolbar>
            <Divider />
          </AppBar>
          <AppDrawer />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Outlet />
          </Box>
          {/* <OnlineLayer>{(userId: string) => IsOnline({ userId })}</OnlineLayer> */}
        </Box>
      )}
    </>
  );
};

export default Home;

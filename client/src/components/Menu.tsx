import * as React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { uniqueId, upperFirst, isEqual } from "lodash";
import { useRecoilValue, useSetRecoilState } from "recoil";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
// internally crafted imports of resources
import { IMenu } from "../typings/Menu";
import { IMenuProfile } from "../typings/Home";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import LogOut from "./LogOut";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { ILogOut } from "../typings/Menu";

const ProfileMenu = ({
  anchorEl,
  setAnchorEl,
  open,
  setOpen,
}: IMenu): JSX.Element => {
  const [index, setIndex] = React.useState<number>(0);

  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const navigate: NavigateFunction = useNavigate();

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);
  const setMode = useSetRecoilState<IMode>(modeContextData.AppMode);

  const handleClickAway = () => {
    setOpen((old) => !old);
  };

  const MenuInfo: IMenuProfile[] = [
    {
      RouteName: "Profile",
      Icon: (
        <PersonIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ),
    },
    {
      RouteName: "Language",
      Icon: (
        <LanguageIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ),
    },
    {
      RouteName: "Settings",
      Icon: (
        <SettingsIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ),
    },
    {
      RouteName: isEqual(mode.mode, "light") ? "Dark Mode" : "Light mode",
      Icon: isEqual(mode.mode, "light") ? (
        <NightlightIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ) : (
        <NightlightOutlinedIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ),
    },
    {
      RouteName: "Log Out",
      Icon: (
        <PowerSettingsNewIcon
          sx={{
            fontWeight: "bold",
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      ),
    },
  ];

  const logOutData: ILogOut = {
    mode: mode.mode,
  };

  return (
    <>
      <Popper
        id={uniqueId()}
        open={open}
        anchorEl={anchorEl}
        sx={{
          width: "340px",
          borderRadius: 4,
          zIndex: (theme) => theme.zIndex.appBar + 4,
        }}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={4} sx={{ borderRadius: 3 }}>
            <Box sx={{ p: 2, borderRadius: 2 }}>
              <Paper elevation={4} sx={{ borderRadius: 3 }}>
                <Box
                  px={2}
                  pt={2}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Avatar alt="" src={`${AuthInfo.Data?.Image}`} />
                  </Box>
                  <Box>
                    <Typography fontSize="17px" fontWeight="600">
                      {upperFirst(AuthInfo.Data?.Firstname)}{" "}
                      {upperFirst(AuthInfo.Data?.Lastname)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mx: 2, pt: 1 }} />
                <Box sx={{ px: 2, py: 1 }}>
                  <IconButton
                    sx={{ p: 0, m: 0 }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={() => navigate(`profile/${AuthInfo.Data?._id}`)}
                  >
                    <Typography
                      fontSize="15px"
                      fontWeight="600"
                      sx={{ color: blue[700] }}
                    >
                      view profile
                    </Typography>
                  </IconButton>
                </Box>
              </Paper>
            </Box>
            <Box pt={1.4} pb={2} px={2}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {MenuInfo.map((info, ind) => {
                  const { RouteName, Icon } = info;
                  return (
                    <React.Fragment key={ind}>
                      {RouteName !== "Log Out" && (
                        <Box
                          key={ind}
                          sx={{
                            py: 1,
                            display: "flex",
                            gap: 7,
                            alignItems: "center",
                            alignContent: "center",
                            bgcolor:
                              isEqual(index, ind) && isEqual(mode.mode, "light")
                                ? grey[200]
                                : isEqual(index, ind) &&
                                  isEqual(mode.mode, "dark")
                                ? "rgba(255, 255, 255, 0.1)"
                                : !isEqual(index, ind) &&
                                  isEqual(mode.mode, "dark")
                                ? "black"
                                : "white",
                            border: 0,
                            ":hover": {
                              bgcolor: isEqual(mode.mode, "light")
                                ? grey[200]
                                : "rgba(255,255, 255, 0.1)",
                            },
                          }}
                          component="button"
                          onClick={() => {
                            setIndex(ind);
                            if (isEqual(ind, 0)) {
                              navigate(`profile/${AuthInfo.Data?._id}`);
                            }

                            // add dark mode to the app
                            if (
                              isEqual(ind, 3) &&
                              isEqual(mode.mode, "light")
                            ) {
                              setMode({ mode: "dark" });
                            }
                            // add light mode the app
                            if (isEqual(ind, 3) && isEqual(mode.mode, "dark")) {
                              setMode({ mode: "light" });
                            }
                          }}
                        >
                          <Box>
                            <IconButton
                              sx={{
                                bgcolor: isEqual(mode.mode, "light")
                                  ? "#d0e0fd"
                                  : "rgba(255, 255, 255, 0.3)",
                                borderRadius: 50,
                              }}
                            >
                              {Icon}
                            </IconButton>
                          </Box>
                          <Box>
                            <Typography
                              fontSize="16px"
                              fontWeight="bold"
                              sx={{
                                color: isEqual(mode.mode, "light")
                                  ? "black"
                                  : "white",
                              }}
                            >
                              {RouteName}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {RouteName === "Log Out" && (
                        <Box
                          sx={{
                            m: 0,
                            p: 0,
                            border: 0,
                            bgcolor:
                              isEqual(index, ind) && isEqual(mode.mode, "light")
                                ? grey[200]
                                : isEqual(index, ind) &&
                                  isEqual(mode.mode, "dark")
                                ? "rgba(255, 255, 255, 0.2)"
                                : !isEqual(index, ind) &&
                                  isEqual(mode.mode, "dark")
                                ? "black"
                                : "white",
                          }}
                          component="button"
                        >
                          <LogOut {...logOutData} />
                        </Box>
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ProfileMenu;

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
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { uniqueId, upperFirst } from "lodash";
import { useRecoilValue } from "recoil";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import { isEqual } from "lodash";
// internally crafted imports of ressources
import { IMenu } from "../typings/Menu";
import { IMenuProfile } from "../typings/Home";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

const MenuInfo: IMenuProfile[] = [
  {
    RouteName: "Profile",
    Icon: <PersonIcon sx={{ fontWeight: "bold", color: "black" }} />,
  },
  {
    RouteName: "Language",
    Icon: <LanguageIcon sx={{ fontWeight: "bold", color: "black" }} />,
  },
  {
    RouteName: "Settings",
    Icon: <SettingsIcon sx={{ fontWeight: "bold", color: "black" }} />,
  },
  {
    RouteName: "dark Mode",
    Icon: <NightlightIcon sx={{ fontWeight: "bold", color: "black" }} />,
  },
  {
    RouteName: "Log Out",
    Icon: <PowerSettingsNewIcon sx={{ fontWeight: "bold", color: "black" }} />,
  },
];

const ProfileMenu = ({ anchorEl, setAnchorEl, open }: IMenu): JSX.Element => {
  const [index, setIndex] = React.useState<number>(0);

  const contextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  return (
    <>
      <Popper
        id={uniqueId()}
        open={open}
        anchorEl={anchorEl}
        sx={{ width: "340px", borderRadius: 4 }}
        placement="bottom-end"
      >
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
                  <Box
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 7,
                      alignItems: "center",
                      alignContent: "center",
                      bgcolor: isEqual(index, ind) ? grey[200] : "white",
                      border: 0,
                      ":hover": {
                        bgcolor: grey[200],
                      },
                    }}
                    component="button"
                    onClick={() => {
                      setIndex(ind);
                    }}
                  >
                    <Box>
                      <IconButton sx={{ bgcolor: "#d0e0fd", borderRadius: 50 }}>
                        {Icon}
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography fontSize="16px" fontWeight="bold">
                        {RouteName}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default ProfileMenu;

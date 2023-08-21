import * as React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Divider from "@mui/material/Divider";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled, alpha } from "@mui/material/styles";
import { IMenu } from "../typings/Menu";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    width: 290,
    maxWidth: 300,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ProfileMenu = ({ anchorEl, setAnchorEl, open }: IMenu): JSX.Element => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box>
              <Avatar
                alt="profile"
                src="https://cutewallpaper.org/21/handsome-boy-picture/Wow..-Very-handsome-in-2019-Stylish-boys-Handsome-boys-.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </Box>
            <Box>
              <span style={{}}>Romeus clarens</span>
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <PersonIcon sx={{ fontWeight: "bold" }} />
          <span style={{ fontWeight: "bold" }}>Profile</span>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <LanguageIcon sx={{ fontWeight: "bold" }} />
          <span style={{ fontWeight: "bold" }}>Language</span>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SettingsIcon sx={{ fontWeight: "bold" }} />
          <span style={{ fontWeight: "bold" }}>Settings</span>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <NightlightIcon sx={{ fontWeight: "bold" }} />
          <span style={{ fontWeight: "bold" }}>dark mode</span>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} disableRipple>
          <PowerSettingsNewIcon sx={{ fontWeight: "bold" }} />
          <span style={{ fontWeight: "bold" }}>Log Out</span>
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default ProfileMenu;

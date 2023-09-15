import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { red, blue } from "@mui/material/colors";
import { Search } from "@mui/icons-material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// internally crafted imports of resources
import { IActions } from "../typings/Groups";
import { CssTextFieldShare } from "../MuiStyles/textField";
import BootstrapTooltip from "./BootstrapTooltip";

interface IGroupPrivacyProps {}

const Actions: IActions[] = [
  {
    Icon: <DeleteIcon sx={{ color: "black", fontSize: "12px" }} />,
    Title: "Remove",
  },
  {
    Icon: <PersonAddIcon sx={{ color: "black", fontSize: "12px" }} />,
    Title: "Add",
  },
  {
    Icon: <ManageAccountsIcon sx={{ color: "black", fontSiz: "12px" }} />,
    Title: "Admin role",
  },
];

const GroupPrivacy = () => {
  const [index, setIndex] = React.useState<number | undefined>();
  return (
    <>
      <Box>
        <Box>
          <Typography fontWeight="580" fontSize="17px">
            Facebook Commumity
          </Typography>
        </Box>
        <Box sx={{ width: 600, pt: 0.5 }}>
          <Typography fontSize="16px" color="text.secondary">
            here's all operations possible on the group to perform only with an
            administrator's right, feel free and make actions your own
          </Typography>
        </Box>
        <Box pt={1}>
          <Typography fontWeight="560" fontSize="17px">
            Group actions
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContext: "center",
            gap: 2,
          }}
          pt={1}
        >
          {Array.from(Actions, (val, ind) => {
            return (
              <Box>
                <Button
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  startIcon={val.Icon}
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    bgcolor: "#e8f0fe",
                    color: "black",
                    boxShadow: "none",
                    ":hover": {
                      bgcolor: "#e8f0fe",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => setIndex(ind)}
                >
                  <Typography fontSize="15px" fontWeight="600">
                    {val.Title}
                  </Typography>
                </Button>
              </Box>
            );
          })}
        </Box>
        <Box pt={1.8}>
          <Typography fontSize="17px" fontWeight="540">
            Group users & admins
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 380 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Avatar
                alt=""
                src="https://www.liveabout.com/thmb/Oc4aZqRllyO_Rvbmz9boo-GBokI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/-120-battements-par-minutes--120-beats-per-minute---red-carpet-arrivals---the-70th-annual-cannes-film-festival-685987724-596b75f93df78c57f4a8bd55.jpg"
              />
              <Box>
                <Typography fontWeight="500" fontSize="16px">
                  Rolina versine
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <IconButton sx={{ p: 0, m: 0 }}>
                  <PersonRemoveIcon sx={{ color: blue[700] }} />
                </IconButton>
              </Box>
              <Box>
                <IconButton sx={{ p: 0, m: 0 }}>
                  <DeleteIcon sx={{ color: red[700] }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                alt=""
                src="https://stylesatlife.com/wp-content/uploads/2023/01/Prettiest-Bar-Refaeli.jpg"
              />
              <Box>
                <Typography fontWeight="500" fontSize="16px">
                  Carolina makdev
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <BootstrapTooltip title="remove admin role">
                  <IconButton sx={{ p: 0, m: 0 }}>
                    <PersonRemoveIcon sx={{ color: blue[700] }} />
                  </IconButton>
                </BootstrapTooltip>
              </Box>
              <Box>
                <BootstrapTooltip title="delete admin from the group">
                  <IconButton sx={{ p: 0, m: 0 }}>
                    <DeleteIcon sx={{ color: red[700] }} />
                  </IconButton>
                </BootstrapTooltip>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                alt="User"
                src="https://menshaircuts.com/wp-content/uploads/2022/06/male-models-jon-kortajarena-683x1024.jpg"
              />
              <Box>
                <Typography fontWeight="500" fontSize="16px">
                  Vandam roshvenk
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  sx={{ p: 0, m: 0 }}
                >
                  <ManageAccountsIcon sx={{ color: blue[700] }} />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  sx={{ p: 0, m: 0 }}
                >
                  <DeleteIcon sx={{ color: red[700] }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* suggestions */}
          <Box pt={1}>
            <Typography fontSize="17px" fontWeight="540">
              Suggestions
            </Typography>
          </Box>
          <Box
            pt={1}
            sx={{ display: "flex", flexDirection: "column", width: 380 }}
          >
            <Box>
              <CssTextFieldShare
                variant="outlined"
                sx={{ "& fieldset": { border: "none" } }}
                fullWidth
                placeholder="search..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  alt="User"
                  src="https://www.industryfreak.com/wp-content/uploads/2019/05/Doutzen-Kroes-001-1024x681.jpg"
                />
                <Box>
                  <Typography fontWeight="500" fontSize="16px">
                    Virgina rosenti
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box>
                  <IconButton sx={{ p: 0, m: 0 }}>
                    <PersonAddIcon sx={{ color: blue[700] }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  alt="User"
                  src="https://static01.nyt.com/images/2019/08/04/books/review/04Sullivan1/04Sullivan1-videoSixteenByNineJumbo1600-v2.jpg"
                />
                <Box>
                  <Typography fontWeight="500" fontSize="16px">
                    Thomas sancara
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box>
                  <IconButton sx={{ p: 0, m: 0 }}>
                    <PersonAddIcon sx={{ color: blue[700] }} />
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

export default GroupPrivacy;

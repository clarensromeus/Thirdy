import * as React from "react";
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import { isEqual } from "lodash";
import PublicIcon from "@mui/icons-material/Public";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CssTextFieldShare } from "../../MuiStyles/textField";
// internally crafted imports of resources
import {
  GroupInfoQuery,
  GroupInfoQueryVariables,
} from "../../__generated__/graphql";
import { GROUP_INFO } from "../../graphql/Groups.graphql";
import Context from "../../store/ContextApi";
import { IAuthState } from "../../typings/GlobalState";
import CardPost from "../Card";
import modeContext from "../../store/ModeContext";
import { ICard } from "../../typings/Notifications";
import { IMode } from "../../typings/GlobalState";

const GroupPosts = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  let { groupname } = useParams<{ groupname: string }>();

  const { data } = useQuery<GroupInfoQuery, GroupInfoQueryVariables>(
    GROUP_INFO,
    {
      variables: {
        groupId: `${groupname?.split("-")[1]}`,
        groupName: `${groupname?.split("-")[0]}`,
      },
    }
  );

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const cardWidth: ICard = {
    width: 540,
    PostId: "",
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box
          sx={{
            borderRadius: 4,
            flex: 1.3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Paper elevation={isEqual(mode.mode, "light") ? 1 : 5}>
            <Box
              py={2}
              mx={2.7}
              sx={{
                width: 450,
                borderRadius: 4,
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Avatar alt="profile" src={`${AuthInfo.Data?.Image}`}></Avatar>
              </Box>
              <Box sx={{ width: "inherit" }}>
                <CssTextFieldShare
                  size="small"
                  sx={{
                    "& fieldset": {
                      border: "none",
                    },
                    ".MuiOutlinedInput-root": {
                      bgcolor: isEqual(mode.mode, "light")
                        ? "#E8F0FE"
                        : "rgba(255,255, 255, 0.1)",
                      borderRadius: 50,
                      color: isEqual(mode.mode, "light")
                        ? grey[700]
                        : grey[200],
                    },
                  }}
                  fullWidth
                  placeholder="What's on your mind?"
                  // onFocus={() => setOpenFrame(true)}
                />
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
        <Box sx={{ flex: 1 }}>
          <Box>
            <Paper elevation={isEqual(mode.mode, "light") ? 1 : 5}>
              <Box pt={2} px={2}>
                <Box>
                  <Typography fontWeight="600" fontSize="17px">
                    About
                  </Typography>
                </Box>
                <Box pt={1.5}>
                  <Typography fontWeight="510" fontSize="15px">
                    share, message and communicate with other people in{" "}
                    {data?.GroupInfo?.GroupName}' group
                  </Typography>
                </Box>
                <Box pt={1}>
                  <Typography fontWeight="510" fontSize="15px">
                    {data?.GroupInfo?.GroupName} as a good place for people
                    reunion, feel free to express your feeling
                  </Typography>
                </Box>
                <Box pt={2} sx={{ display: "flex", gap: 1 }}>
                  <Box>
                    <PublicIcon />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box>
                      <Typography
                        fontSize="17px"
                        component="span"
                        fontWeight="520"
                      >
                        Public
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize="15px">
                        the group is public to everyone and any action can
                        perform in
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* second */}
                <Box pt={2} sx={{ display: "flex", gap: 1 }}>
                  <Box>
                    <VisibilityIcon />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box>
                      <Typography
                        fontSize="17px"
                        component="span"
                        fontWeight="520"
                      >
                        Visible
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize="15px">
                        all contents of {data?.GroupInfo?.GroupName} can be seen
                        by anyone including guests
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box py={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      border: 0,
                      textTransform: "capitalize",
                      boxShadow: "none",
                    }}
                  >
                    <Typography component="span">learn more</Typography>
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GroupPosts;

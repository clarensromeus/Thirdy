import * as React from "react";
import { Box, Avatar, Button, Typography, Divider } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import blue from "@mui/material/colors/blue";
import { useRecoilValue } from "recoil";
import DateRangeIcon from "@mui/icons-material/DateRange";
import upperFirst from "lodash/upperFirst";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
// externally crafted imports of ressources
import CardPost from "../components/Card";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { IFrame } from "../typings/Profile";
import UploadFrame from "../components/UploadFrame";

const Profile = () => {
  const contextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [openFrame, setOpenFrame] = React.useState<boolean>(false);
  // state that detects whether user wants to change image cover or profile
  const [isCover, setCover] = React.useState<boolean>(false);

  const Frame: IFrame = {
    openFrame,
    setOpenFrame,
    Image: `${AuthInfo.Data?.Image}`,
  };

  const cardWidth: { width: number } = {
    width: 500,
  };

  return (
    <>
      <UploadFrame {...Frame} />
      <Box sx={{ width: "100%", height: "100vh", p: 0, m: 0 }}>
        <Box
          sx={{
            width: "inherit",
            height: 200,
            bgcolor: "#f1f6fe",
            position: "relative",
          }}
        >
          <img
            style={{ objectFit: "cover" }}
            width="100%"
            height="200px"
            alt="backgroundImage"
            src="https://teachyourkidscode.com/wp-content/uploads/2022/02/best-coding-language-for-games.jpg"
          />
          <Box sx={{ p: 2, position: "absolute", zIndex: 2, top: 0, left: 0 }}>
            <input hidden type="file" accept="/*" id="edit_cover" />
            <label htmlFor="edit_cover">
              <Button
                variant="contained"
                sx={{ borderRadius: 20 }}
                startIcon={<EditIcon />}
                component="span"
              >
                <Typography
                  fontWeight="bold"
                  sx={{ color: "white", textTransform: "lowercase" }}
                >
                  Edit cover
                </Typography>
              </Button>
            </label>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "55%",
              left: "10%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 172,
                height: 172,
                bgcolor: "white",
                borderRadius: "50%",
              }}
            >
              <Avatar
                sx={{ width: 160, height: 160, zIdex: 2 }}
                alt="profile picture"
                src={`${AuthInfo.Data?.Image}`}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                zIndex: 4,
                top: 118,
                left: 123,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#E8F0FE",
                borderRadius: 50,
              }}
            >
              <IconButton
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => setOpenFrame(true)}
              >
                <CameraAltIcon sx={{ color: blue[700] }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box pl={36} pt={1} sx={{ bgcolor: "white" }}>
            <Box>
              <Typography
                fontWeight="bold"
                fontFamily="Roboto"
                fontSize="1.9rem"
              >
                {upperFirst(`${AuthInfo?.Data?.Firstname}`)}{" "}
                {AuthInfo.Data?.Lastname}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography>followers</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    12k
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography>followings</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    1.8k
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: 1, alignItems: "center" }}>
              <Box>
                <DateRangeIcon />
              </Box>
              <Box>
                <Typography color="text.secondary">
                  jannuary 29, 1998
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: 1, alignItems: "center" }}>
              <Box>
                <Typography fontWeight="bold">Bio</Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  i am a software engineer
                </Typography>
              </Box>
              <Box pl={5}>
                <IconButton>
                  <EditIcon sx={{ color: blue[600] }} />
                </IconButton>
              </Box>
            </Box>
            <Divider />
          </Box>
        </Box>
        <Box pl={36} sx={{ bgcolor: "white" }}>
          <Box
            pt={1}
            sx={{
              display: "flex",
              gap: "5px",
              borderBottom: `1px solid ${blue[500]}`,
              maxWidth: 180,
            }}
          >
            <Typography fontWeight="bold" sx={{ color: blue[800] }}>
              122
            </Typography>
            <Typography fontWeight="bold">posts</Typography>
            <Typography color="text.secondary">made by you</Typography>
          </Box>
          <Divider />
        </Box>
        <Box pl={36} pt={1}>
          <CardPost {...cardWidth} />
        </Box>
      </Box>
    </>
  );
};

export default Profile;

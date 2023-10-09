import * as React from "react";
import { Box, Avatar, Button, Typography, Divider } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import blue from "@mui/material/colors/blue";
import DateRangeIcon from "@mui/icons-material/DateRange";
import upperFirst from "lodash/upperFirst";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue } from "recoil";
import grey from "@mui/material/colors/grey";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery } from "@apollo/client";
// externally crafted imports of resources
import CardPost from "../components/Card";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { IFrame } from "../typings/Profile";
import UploadFrame from "../components/UploadFrame";
import {
  Change_CoverMutation,
  Change_CoverMutationVariables,
  UserStatisticsQuery,
  UserStatisticsQueryVariables,
} from "../__generated__/graphql";
import { CHANGE_COVER_IMAGE, USER_STATISTICS } from "../graphql/User.graphql";
import uploadFile from "../components/Upload";
import { IUpload } from "../typings/Profile";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { isEqual } from "lodash";
import { ICard } from "../typings/Notifications";

const Profile = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(
    contextData?.GetAuthInfo
  );

  let { id } = useParams<{ id: string }>();

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const [openFrame, setOpenFrame] = React.useState<boolean>(false);

  const Frame: IFrame = {
    openFrame,
    setOpenFrame,
    Image: `${AuthInfo.Data?.Image}`,
    userId: `${AuthInfo.Data?._id}`,
  };

  const uploadCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validity = e.target.validity;
    const selectedFile = e.target.files as FileList;

    if (validity && validity.valid) {
      const FileData = uploadFile({
        FileInfo: { file: selectedFile, valid: validity.valid },
      }) satisfies IUpload;

      setValid(Boolean(FileData?.valid));
      setImage(FileData?.ImageInfo?.singleFile);
      setPreviewImage(`${FileData?.ImageInfo?.previewImage}`);
    }
  };

  // change background image of the user
  const [ChangeCover] = useMutation<
    Change_CoverMutation,
    Change_CoverMutationVariables
  >(CHANGE_COVER_IMAGE);

  const { data, loading } = useQuery<
    UserStatisticsQuery,
    UserStatisticsQueryVariables
  >(USER_STATISTICS, { variables: { userStaticsUserId: `${id}` } });

  const cardWidth: ICard = {
    width: 500,
    PostId: "",
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
            src={
              isValid
                ? previewImage
                : "https://teachyourkidscode.com/wp-content/uploads/2022/02/best-coding-language-for-games.jpg"
            }
          />
          <Box sx={{ p: 2, position: "absolute", zIndex: 2, top: 0, left: 0 }}>
            <input
              hidden
              type="file"
              accept="/*"
              id="edit_cover"
              onChange={uploadCoverImage}
            />
            <label htmlFor="edit_cover">
              <Button
                variant="contained"
                sx={{
                  borderRadius: 20,
                  bgcolor: isEqual(mode.mode, "light") ? "primary" : "#0866ff",
                }}
                startIcon={
                  <EditIcon
                    sx={{
                      color: isEqual(mode.mode, "light") ? "dark" : "white",
                    }}
                  />
                }
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
          <Box
            pl={36}
            pt={1}
            sx={{ bgcolor: isEqual(mode.mode, "white") ? "white" : "dark" }}
          >
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
                  <Typography
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    }}
                  >
                    followers
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    {data?.userStatics?.follower}k
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    }}
                  >
                    followings
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    {data?.userStatics?.following}k
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: 1, alignItems: "center" }}>
              <Box>
                <DateRangeIcon
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                  }}
                />
              </Box>
              <Box>
                <Typography color="text.secondary">
                  jannuary 29, 1998
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: 1, alignItems: "center" }}>
              <Box>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                  }}
                >
                  Bio
                </Typography>
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
        <Box
          pl={36}
          sx={{ bgcolor: isEqual(mode.mode, "light") ? "white" : "dark" }}
        >
          <Box
            pt={1}
            sx={{
              display: "flex",
              gap: "5px",
              borderBottom: `1px solid ${blue[500]}`,
              maxWidth: 275,
            }}
          >
            <Typography fontWeight="bold" sx={{ color: blue[800] }}>
              {data?.userStatics?.posts}
            </Typography>
            <Typography
              fontWeight="bold"
              sx={{ color: isEqual(mode.mode, "light") ? "black" : grey[100] }}
            >
              posts
            </Typography>
            <Typography color="text.secondary">
              made by you on this platform
            </Typography>
          </Box>
          <Divider />
        </Box>
        <Box pl={36} pt={2}>
          <CardPost {...cardWidth} />
        </Box>
      </Box>
    </>
  );
};

export default Profile;

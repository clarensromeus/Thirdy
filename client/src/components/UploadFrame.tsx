import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@apollo/client";
import isEqual from "lodash/isEqual";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";
// internally crafted imports of resources
import {
  Change_User_ProfileMutation,
  Change_User_ProfileMutationVariables,
} from "../__generated__/graphql";
import { IFrame } from "../typings/Profile";
import { CHANGE_USER_PROFILE } from "../graphql/User.graphql";
import uploadFile from "./Upload";
import { IUpload } from "../typings/Profile";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";

const UploadFrame = ({ openFrame, setOpenFrame, Image, userId }: IFrame) => {
  const modeContextData = React.useContext(modeContext);

  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [ChangeProfile, { loading }] = useMutation<
    Change_User_ProfileMutation,
    Change_User_ProfileMutationVariables
  >(CHANGE_USER_PROFILE);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: openFrame ? "block" : "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(0,0,0,0.7)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            border: isEqual(mode.mode, "light")
              ? "light"
              : `1px solid ${grey[900]}`,
            transform: "translate(-50%, -50%)",
            bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
            width: 550,
            height: 440,
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "absolute", top: 80, left: 130 }}>
              <input hidden type="file" id="change_profile" onChange={upload} />
              <label htmlFor="change_profile">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 50,
                    bgcolor: isEqual(mode.mode, "light")
                      ? "primary"
                      : "#0866ff",
                    color: "white",
                  }}
                  startIcon={<CloudUploadIcon />}
                  component="span"
                >
                  choose a picture
                </Button>
              </label>
            </Box>
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="1.7rem"
                sx={{ color: "white" }}
              >
                Upload your picture
              </Typography>
            </Box>
            <Box>
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() => setOpenFrame(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.8,
              width: "inherit",
            }}
          >
            <Box>
              <img
                width="300"
                height="300"
                alt="profile"
                src={isValid ? previewImage : Image}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    if (!isValid) return;
                    await ChangeProfile({
                      variables: {
                        changeUserProfileFile: image,
                        changeUserProfileId: `${userId}`,
                      },
                      onCompleted: () => {
                        // close the frame upload is success
                        setOpenFrame(false);
                      },
                    });
                  } catch (error) {
                    throw new Error(`${error}`);
                  }
                }}
                sx={{
                  borderRadius: 20,
                  color: "white",
                  bgcolor: isEqual(mode.mode, "light")
                    ? "black"
                    : "rgba(255, 255, 255, 0.2)",
                  ":hover": {
                    bgcolor: isEqual(mode.mode, "light")
                      ? "black"
                      : "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {loading ? (
                  <Box px={2} pt="4px">
                    <ClipLoader
                      color="white"
                      loading={loading}
                      size={22}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                ) : (
                  "Upload"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UploadFrame;

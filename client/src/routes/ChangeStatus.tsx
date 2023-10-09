import * as React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useRecoilValue } from "recoil";
import grey from "@mui/material/colors/grey";
import blueGrey from "@mui/material/colors/blueGrey";
import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { ClipLoader } from "react-spinners";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { isEqual } from "lodash";
// internally crafted imports of resources
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { ADD_STATUS, GET_USER_STATUS } from "../graphql/Status.graphql";
import {
  AddStatusMutation,
  AddStatusMutationVariables,
} from "../__generated__/graphql";
import uploadFile from "../components/Upload";
import { IUpload } from "../typings/Profile";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

const ChangeStatus = (): JSX.Element => {
  // global state context
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  // global app mode
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [image, setImage] = React.useState<File | undefined>();
  const navigate: NavigateFunction = useNavigate();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

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

  // mutation for adding new status
  const [CreateStatus, { loading }] = useMutation<
    AddStatusMutation,
    AddStatusMutationVariables
  >(ADD_STATUS);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ pt: 15 }}>
          <Paper
            sx={{ borderRadius: 3 }}
            elevation={isEqual(mode.mode, "light") ? 0 : 2}
          >
            <Box
              sx={{
                width: 500,
                height: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(blue, white)",
                borderRadius: 3,
              }}
            >
              {isValid && (
                <img
                  alt="statusPicture"
                  src={previewImage}
                  style={{
                    width: 500,
                    height: 207,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              )}
              {!isValid && (
                <Paper sx={{ borderRadius: 50, bgcolor: "white" }}>
                  <Box sx={{ p: 1.8 }}>
                    <label htmlFor="addStatus">
                      <input
                        hidden
                        type="file"
                        id="addStatus"
                        onChange={upload}
                      />

                      <Box
                        sx={{
                          borderRadius: 50,
                          width: "inherit",
                          height: "inherit",
                        }}
                        component="span"
                      >
                        <CollectionsIcon sx={{ color: "black" }} />
                      </Box>
                    </label>
                  </Box>
                </Paper>
              )}
              {!isValid && (
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="20px"
                    sx={{ color: "white" }}
                  >
                    Create photo story
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
          {isValid && (
            <Box
              pt={3}
              sx={{ display: "flex", gap: 2, justifyContent: "space-around" }}
            >
              <Box sx={{ width: 180 }}>
                <Button
                  fullWidth
                  sx={{
                    bgcolor: isEqual(mode.mode, "light")
                      ? blueGrey[50]
                      : "rgba(255, 255, 255, 0.2)",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    px: 2,
                    ":hover": {
                      bgcolor: isEqual(mode.mode, "light")
                        ? blueGrey[50]
                        : "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                  onClick={() => setValid(false)}
                >
                  discard
                </Button>
              </Box>
              <Box sx={{ width: 180 }}>
                <Button
                  fullWidth
                  sx={{
                    bgcolor: "#0866ff",
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    ":hover": {
                      bgcolor: "#0866ff",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    CreateStatus({
                      variables: {
                        addStatusId: `status_${nanoid()}`,
                        addStatusPicture: image,
                        addStatusUserId: `${AuthInfo.Data?._id}`,
                      },
                      refetchQueries: [GET_USER_STATUS],
                      onCompleted: () => {
                        navigate("/thirdy");
                      },
                    });
                  }}
                >
                  {loading ? (
                    <Box>
                      <ClipLoader
                        loading={true}
                        size={20}
                        color="white"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Box>
                  ) : (
                    "add to story"
                  )}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChangeStatus;

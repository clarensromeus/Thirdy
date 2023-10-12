import * as React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { isEqual, isNil } from "lodash";
import { grey, yellow, blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import MoodIcon from "@mui/icons-material/Mood";
import { useMutation } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import modeContext from "../../store/ModeContext";
import {
  EditPostMutation,
  EditPostMutationVariables,
} from "../../__generated__/graphql";
import { IMode } from "../../typings/GlobalState";
import { EditFrameProps } from "../../typings/Post";
import { IUpload } from "../../typings/Profile";
import uploadFile from "../Upload";
import { EDIT_POST, Get_All_Post } from "../../graphql/Posts.graphql";
import useWindowSize from "../../hooks/useWindowSize";

const EditFrame = ({
  open,
  setOpen,
  user: { userId, firstname, lastname, Email, Image },
  postInfo: { PostId, PostImage, PostTitle },
}: EditFrameProps) => {
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [title, setTitle] = React.useState<string>(PostTitle ?? "");

  const [image, setImage] = React.useState<File | undefined>();
  const { width, height } = useWindowSize();

  const [EditPost, { loading }] = useMutation<
    EditPostMutation,
    EditPostMutationVariables
  >(EDIT_POST);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setTitle(target.value);
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
          display: open ? "block" : "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(0,0,0,0.8)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
            width: width && width <= 645 ? "100%" : 550,
            height: width && width <= 645 ? "100%" : 510,
          }}
        >
          <Box
            sx={{
              width: "inherit",
              height: "inherit",
              border: isEqual(mode.mode, "light")
                ? "none"
                : `1px solid ${grey[800]}`,
              bgcolor: isEqual(mode.mode, "light")
                ? "white"
                : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box>
              <Box
                py={1}
                px={3}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box />
                <Box>
                  <Typography
                    fontWeight="bold"
                    fontFamily="Roboto"
                    fontSize="1.6rem"
                  >
                    Edit Post
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    sx={{
                      bgcolor: isEqual(mode.mode, "light")
                        ? "rgba(232,240,254, 0.8)"
                        : "rgba(255, 255, 255, 0.2)",
                    }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={() => {
                      setOpen(false);
                      setValid(false);
                    }}
                  >
                    <CloseIcon
                      sx={{
                        color: isEqual(mode.mode, "light") ? "black" : "light",
                        fontSize: "1.5rem",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box px={3}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={2}
                  value={title}
                  sx={{
                    "& fieldset": {
                      border: "none",
                    },
                  }}
                  placeholder="What's on your mind?"
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box sx={{ height: 200, pt: 1, px: 4 }}>
              {isNil(PostImage) || isEqual(PostImage, "") ? (
                <Box
                  sx={{
                    width: "inherit",
                    height: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `1px solid ${grey[100]}`,
                  }}
                >
                  <Box>
                    <CollectionsIcon sx={{ fontSize: "50px", color: "grey" }} />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    border: isEqual(mode.mode, "light")
                      ? `1px solid ${grey[100]}`
                      : `1px solid ${grey[700]}`,
                  }}
                >
                  <img
                    alt="PostImage"
                    width="100%"
                    height="210"
                    src={isValid ? previewImage : PostImage}
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ width: "inherit" }}>
              <Paper elevation={2} sx={{ m: 4, my: 3, borderRadius: 3 }}>
                <Box
                  px={2}
                  py="10px"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">add to post</Typography>
                  </Box>
                  <Box sx={{ display: "flex", pt: "5px" }}>
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      component="label"
                    >
                      <CollectionsIcon sx={{ color: blue[700] }} />
                      <input
                        hidden
                        accept="/*"
                        type="file" /* onChange={upload}  */
                        onChange={upload}
                      />
                    </IconButton>
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                    >
                      <MoodIcon sx={{ color: yellow[700] }} />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Box>
            <Box mx={4}>
              <Button
                disabled={
                  typeof title === "string" && title.length >= 1 ? false : true
                }
                onClick={async () => {
                  try {
                    await EditPost({
                      variables: {
                        editData: {
                          PostId,
                          Picture: !isNil(image) ? image : undefined,
                          Title: title,
                        },
                      },
                      refetchQueries: [Get_All_Post],
                      onCompleted: () => {
                        setOpen(false);
                      },
                    });
                  } catch (error) {
                    throw new Error(`${error}`);
                  }
                }}
                variant="contained"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  bgcolor: blue[700],
                }}
              >
                {loading ? (
                  <Box px={2}>
                    <ClipLoader
                      color="white"
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                ) : (
                  "Edit post"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditFrame;

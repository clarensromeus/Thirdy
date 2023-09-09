import * as React from "react";
import {
  Box,
  Divider,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { startCase } from "lodash";
import CollectionsIcon from "@mui/icons-material/Collections";
import MoodIcon from "@mui/icons-material/Mood";
import blue from "@mui/material/colors/blue";
import yellow from "@mui/material/colors/yellow";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { ClipLoader } from "react-spinners";
// import * as casual from "casual";
// internally crafted imports of ressources
import { IPostFrame } from "../typings/Post";
import uploadFile from "./Upload";
import { IUpload } from "../typings/Profile";
import {
  Create_PostMutation,
  Create_PostMutationVariables,
} from "../__generated__/graphql";
import { Create_post } from "../graphql/Posts.graphql";

const PostFrame = ({
  openFrame,
  setOpenFrame,
  UserInfo: { Firstname, Lastname, Image, Email },
}: IPostFrame) => {
  const [Title, setTitle] = React.useState<string>("");
  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as typeof e.target & { value: { value: string } };
    setTitle(target.value);
  };

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

  const [createPost, { loading }] = useMutation<
    Create_PostMutation,
    Create_PostMutationVariables
  >(Create_post);

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
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: 550,
            height: 440,
          }}
        >
          <Box>
            <Box
              py={1}
              px={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alingItems: "center",
              }}
            >
              <Box />
              <Box>
                <Typography
                  fontWeight="bold"
                  fontFamily="Roboto"
                  fontSize="1.6rem"
                >
                  Create post
                </Typography>
              </Box>
              <Box>
                <IconButton
                  sx={{ bgcolor: "rgba(232,240,254, 0.8)" }}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={() => setOpenFrame(false)}
                >
                  <CloseIcon sx={{ color: "black", fontSize: "1.5rem" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            px={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="profile" src={Image} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">
                      {startCase(Firstname)} {Lastname}
                    </Typography>
                  }
                  secondary={Email}
                />
              </ListItem>
            </Box>
            <IconButton
              sx={{ py: 0 }}
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() => {
                setValid(false);
                setImage(undefined);
              }}
            >
              {isValid && <EditIcon sx={{ color: blue[600] }} />}
            </IconButton>
          </Box>
          {isValid ? (
            <Box sx={{ height: 256 }}>
              <Box px={4}>
                <img
                  alt="PostImage"
                  width="480"
                  height="230"
                  src={previewImage}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          ) : (
            <Box>
              <Box px={4}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={5}
                  placeholder="What's on your mind?"
                  onChange={handleChangeText}
                />
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
                          type="file"
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
            </Box>
          )}
          <Box mx={4}>
            <Button
              disabled={
                typeof Title === "string" && Title.length >= 1 ? false : true
              }
              onClick={async () => {
                try {
                  if (!isValid) return;

                  await createPost({
                    variables: {
                      picture: image,
                      postData: {
                        Title,
                        PostId: `${nanoid}`,
                        PostReference: `post${nanoid}`,
                      },
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
                "Make a post"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostFrame;

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputLabel,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Lock } from "@mui/icons-material";
import blue from "@mui/material/colors/blue";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import grey from "@mui/material/colors/grey";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate, NavigateFunction } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { isEqual } from "lodash";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@apollo/client";
// internally crafted imports of resources
import Invitation from "../components/Invitation";
import {
  GetAllGroupsQuery,
  JoinGroupMutation,
  JoinGroupMutationVariables,
  LeaveGroupMutation,
  LeaveGroupMutationVariables,
} from "../__generated__/graphql";
import {
  GET_ALL_GROUPS,
  LEAVE_GROUPS,
  JOIN_GROUPS,
} from "../graphql/Groups.graphql";
import uploadFile from "../components/Upload";
import { IUpload } from "../typings/Profile";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

dayjs.extend(localizedFormat);

const Groups = () => {
  const [age, setAge] = React.useState<string>("");
  const contextData = React.useContext(Context);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [JoinGroup] = useMutation<
    JoinGroupMutation,
    JoinGroupMutationVariables
  >(JOIN_GROUPS);

  const [LeaveGroup] = useMutation<
    LeaveGroupMutation,
    LeaveGroupMutationVariables
  >(LEAVE_GROUPS);

  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const { data, loading } = useQuery<GetAllGroupsQuery>(GET_ALL_GROUPS);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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

  return (
    <>
      <Container>
        <Box>
          <Box
            sx={{
              textAlign: "center",
              pt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography fontWeight="bold" fontSize="1.7rem" component="span">
              Create a group
            </Typography>
            <Typography color="text.secondary" component="span">
              enter below informations for group creation
            </Typography>
          </Box>
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ width: 500 }}>
              <form>
                <Box sx={{}}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="medium"
                        label="Group name"
                        placeholder="enter the group name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose privacy
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Choose Privacy"
                          onChange={handleChange}
                        >
                          <MenuItem
                            value="Public"
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <Box>
                              <IconButton
                                sx={{ bgcolor: "#E8F0FE" }}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                              >
                                <PublicIcon sx={{ color: "black" }} />
                              </IconButton>
                            </Box>
                            <Box>
                              <Typography fontWeight="bold">Public</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            value="Private"
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <Box>
                              <IconButton sx={{ bgcolor: "#E8F0FE" }}>
                                <Lock sx={{ color: "black" }} />
                              </IconButton>
                            </Box>
                            <Box>
                              <Typography fontWeight="bold">Private</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Invitation />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
            <Box
              sx={{
                width: 500,
                position: "relative",
                boxSizing: "boxSizing",
                border: `1px solid ${grey[300]}`,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "4.6%",
                  zIndex: 2,
                }}
              >
                <input
                  hidden
                  type="file"
                  id="change_profile"
                  onChange={upload}
                />
                <label htmlFor="change_profile">
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      boxShadow: 0,
                      ":hover": {
                        boxShadow: 0,
                      },
                    }}
                    startIcon={<CloudUploadIcon />}
                    component="span"
                  >
                    <Typography fontWeight="bold" textTransform="lowercase">
                      Select a picture
                    </Typography>
                  </Button>
                </label>
              </Box>
              <Box p={2}>
                <Box
                  sx={{
                    height: 200,
                    border: `1px solid ${grey[300]}`,
                  }}
                >
                  <img
                    width=""
                    height="inherit"
                    style={{
                      width: "466px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt="imageSample"
                    src={
                      isEqual(previewImage, "")
                        ? "https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg"
                        : previewImage
                    }
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 2,
                  mb: 0.6,
                }}
              >
                <Typography fontWeight="bold" fontSize="0.9rem">
                  Group Privacy :
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.7rem"
                  color="text.secondary"
                >
                  image uploaded by the group creator won't share with anyone
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 500 }}>
              <Button fullWidth disabled variant="contained">
                create
              </Button>
            </Box>
          </Box>
          <Divider />
          {/* list of groups */}
          <Box pt={2}>
            <Typography fontWeight="bold" fontSize="1.2rem">
              Scour over all groups to Join or Leave (
              {data?.GetAllGroups?.length})
            </Typography>
          </Box>
          <Box
            py={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              "& > .GroupBox": {
                width: 400,
                border: `1px solid ${grey[100]}`,
                bgcolor: "white",
                borderRadius: 4,
              },
            }}
          >
            {data?.GetAllGroups?.map((groups) => {
              const {
                _id,
                GroupName,
                GroupCoverImage,
                Privacy,
                createdAt,
                GroupUsers,
              } = groups;
              const date = dayjs(createdAt).format("MMMM D, YYYY");

              const isUserIngroup: boolean | undefined = GroupUsers?.map(
                (users) => users?._id
              ).includes(`${AuthInfo.Data?._id}`);

              return (
                <Box className="GroupBox">
                  <Box
                    p={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      alignContent: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ border: `1px solid ${grey[300]}` }}>
                      <img
                        alt=""
                        src={`${GroupCoverImage}`}
                        style={{ width: 70, height: 80, objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography fontWeight="bold">{GroupName}</Typography>
                      <Typography color="text.secondary">
                        created on {date}
                      </Typography>
                      <Typography color="text.secondary" fontSize="15px">
                        members ({GroupUsers?.length})
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    px={2}
                    pb={1.5}
                    sx={{
                      display: "flex",
                      gap: 0.8,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 0,
                        boxShadow: "none",
                        bgcolor: "#E8F0FE",
                        fontWeight: "bold",
                        ":hover": {
                          borderRadius: 0,
                          boxShadow: "none",
                          bgcolor: "#E8F0FE",
                        },
                      }}
                      onClick={async () => {
                        try {
                          if (isUserIngroup) {
                            await LeaveGroup({
                              variables: {
                                leaveGroupId: `${_id}`,
                                Id: `${AuthInfo.Data?._id}`,
                              },
                              refetchQueries: [GET_ALL_GROUPS],
                            });
                          } else {
                            await JoinGroup({
                              variables: {
                                groupId: `${_id}`,
                                id: `${AuthInfo.Data?._id}`,
                              },
                              refetchQueries: [GET_ALL_GROUPS],
                            });
                          }
                        } catch (error) {
                          throw new Error(`${error}`);
                        }
                      }}
                    >
                      <Typography fontWeight="bold" color="primary">
                        {isUserIngroup ? "Leave" : "Join"}
                      </Typography>
                    </Button>
                    <IconButton
                      onClick={(evt: React.MouseEvent) => {
                        evt.preventDefault();
                        navigate(`${GroupName?.trim()}-${_id}`);
                      }}
                      sx={{ bgcolor: "#E8F0FE", borderRadius: 0 }}
                    >
                      <RemoveRedEyeIcon sx={{ color: blue[700] }} />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Groups;

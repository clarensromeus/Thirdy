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
  FormHelperText,
  OutlinedInput,
  Avatar,
  Chip,
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
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClipLoader } from "react-spinners";
// internally crafted imports of resources
import { CREATE_GROUP } from "../graphql/Groups.graphql";
import {
  GetAllGroupsQuery,
  JoinGroupMutation,
  JoinGroupMutationVariables,
  LeaveGroupMutation,
  LeaveGroupMutationVariables,
  CreateGroupMutation,
  CreateGroupMutationVariables,
  AllUserQuery,
  AllUserQueryVariables,
} from "../__generated__/graphql";
import {
  GET_ALL_GROUPS,
  LEAVE_GROUPS,
  JOIN_GROUPS,
} from "../graphql/Groups.graphql";
import { ALL_USERS } from "../graphql/User.graphql";
import uploadFile from "../components/Upload";
import { IUpload } from "../typings/Profile";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import validateGroupCreation from "../validators/GroupCreation";
import { getStyles } from "../components/Friends/Invitation";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import useNotification from "../hooks/useNotifications";
import useWindowSize from "../hooks/useWindowSize";

// it allows to have access to local related time
dayjs.extend(localizedFormat);

const ITEM_HEIGHT: number = 48;
const ITEM_PADDING_TOP: number = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Groups = () => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const { width, height } = useWindowSize();

  const theme = useTheme();
  // unique identifier
  const ID: string = React.useId();

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { CreateNotification, PushNotification } = useNotification();

  const [JoinGroup] = useMutation<
    JoinGroupMutation,
    JoinGroupMutationVariables
  >(JOIN_GROUPS);

  const [LeaveGroup] = useMutation<
    LeaveGroupMutation,
    LeaveGroupMutationVariables
  >(LEAVE_GROUPS);

  const [CreateGroup, { loading: createGroupLoading }] = useMutation<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >(CREATE_GROUP);

  const [image, setImage] = React.useState<File | undefined>();
  const [userId, setUserId] = React.useState<string[]>([]);

  const [personName, setPersonName] = React.useState<string[]>([]);

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const { data } = useQuery<GetAllGroupsQuery>(GET_ALL_GROUPS);

  const { data: GroupusersData } = useQuery<
    AllUserQuery,
    AllUserQueryVariables
  >(ALL_USERS, {
    variables: { allUsersId: `${AuthInfo.Data?._id}` },
  });

  const handleChangeId = (event: React.MouseEvent, Id: string) => {
    setUserId((old) => {
      if (old.includes(Id)) {
        return old.filter((userid) => userid !== Id);
      }

      return [...old, Id];
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

  const navigate: NavigateFunction = useNavigate();
  // infer type from group creation validation schema
  type formData = yup.InferType<typeof validateGroupCreation>;

  const { handleSubmit, control, formState } = useForm<formData>({
    defaultValues: {
      GroupName: "",
      GroupPrivacy: "",
    },
    resolver: yupResolver(validateGroupCreation),
  });

  const onSubmit = async (data: formData) => {
    try {
      await CreateGroup({
        variables: {
          createData: {
            GroupName: data.GroupName,
            Privacy: data.GroupPrivacy,
            Users: userId,
            Administrators: [`${AuthInfo.Data?._id}`],
          },
          file: image,
        },
        refetchQueries: [GET_ALL_GROUPS],
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const [disable, setDisable] = React.useState<boolean>(true);

  React.useEffect(() => {
    setDisable(formState.isValid);
  }, [formState.isValid]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Box sx={{ width: width && width <= 720 ? "100%" : 500 }}>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="GroupName"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            fullWidth
                            id={`GroupName_${ID}`}
                            helperText={error ? error.message : null}
                            error={!!error}
                            size="medium"
                            label="Group name"
                            placeholder="enter the group name"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="GroupPrivacy"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl fullWidth error={!!error}>
                            <InputLabel id="demo-simple-select-label">
                              Choose privacy
                            </InputLabel>
                            <Select
                              labelId="privacy-select"
                              id={`Privacy_${ID}`}
                              value={value}
                              sx={{ display: "flex" }}
                              label="Choose Privacy"
                              onChange={onChange}
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
                                  <Typography fontWeight="bold">
                                    Public
                                  </Typography>
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
                                  <Typography fontWeight="bold">
                                    Private
                                  </Typography>
                                </Box>
                              </MenuItem>
                            </Select>
                            {error && <FormHelperText>required</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Invite friends (personal)
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="users-selection"
                          id={`Users_${ID}`}
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Invite friends (personal)"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {GroupusersData?.allUsers?.map((users) => (
                            <MenuItem
                              key={users?.Firstname}
                              value={users?.Firstname}
                              style={getStyles(
                                `${users?._id}`,
                                personName,
                                theme
                              )}
                              onClick={(event) =>
                                handleChangeId(event, users?._id)
                              }
                            >
                              <Box sx={{ display: "flex", gap: 0.3 }}>
                                <Avatar alt="" src={`${users?.Image}`} />
                                <Typography>{users?.Firstname}</Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                sx={{
                  width: width && width <= 720 ? "100%" : 500,
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
                        bgcolor: isEqual(mode.mode, "light")
                          ? "primary"
                          : "#0866ff",
                        boxShadow: 0,
                        ":hover": {
                          boxShadow: 0,
                        },
                      }}
                      startIcon={<CloudUploadIcon sx={{ color: "white" }} />}
                      component="span"
                    >
                      <Typography
                        fontWeight="bold"
                        textTransform="lowercase"
                        sx={{ color: "white" }}
                      >
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
                        width: width && width <= 720 ? "100%" : "466px",
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
              <Box sx={{ width: width && width <= 720 ? "100%" : 500 }}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isEqual(disable, false) ? true : false}
                  variant="contained"
                  sx={{ boxShadow: "none" }}
                >
                  {createGroupLoading ? (
                    <ClipLoader
                      loading={true}
                      size={20}
                      color="white"
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "create"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
          <Divider />
          <Box pt={2}>
            <Typography
              fontWeight="bold"
              fontSize="1.2rem"
              sx={{ color: isEqual(mode.mode, "light") ? "black" : "white" }}
            >
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
                width: width && width <= 720 ? "100%" : 400,
                border: isEqual(mode.mode, "light")
                  ? `1px solid ${grey[100]}`
                  : `1px solid ${grey[800]}`,
                bgcolor: isEqual(mode.mode, "light")
                  ? "white"
                  : "rgba(255, 255, 255, 0.2)",
                borderRadius: 4,
              },
            }}
          >
            {data?.GetAllGroups?.map((groups) => {
              const { _id, GroupName, GroupCoverImage, createdAt, GroupUsers } =
                groups;
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
                    <Box sx={{}}>
                      <img
                        alt=""
                        src={`${GroupCoverImage}`}
                        style={{
                          width: 70,
                          height: 80,
                          objectFit: "cover",
                          border: `1px solid ${grey[300]}`,
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        fontWeight="bold"
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? "black"
                            : "white",
                        }}
                      >
                        {GroupName}
                      </Typography>
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
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(8,102,255, 0.1)",
                        fontWeight: "bold",
                        ":hover": {
                          borderRadius: 0,
                          boxShadow: "none",
                          bgcolor: isEqual(mode.mode, "light")
                            ? "#E8F0FE"
                            : "rgba(8,102,255, 0.3)",
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
                      <Typography
                        fontWeight="bold"
                        textTransform="capitalize"
                        color={
                          isEqual(mode.mode, "light") ? "primary" : blue[100]
                        }
                      >
                        {isUserIngroup ? "Leave" : "Join"}
                      </Typography>
                    </Button>
                    <IconButton
                      onClick={(evt: React.MouseEvent) => {
                        evt.preventDefault();
                        navigate(`${GroupName?.trim()}-${_id}`);
                      }}
                      sx={{
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#E8F0FE"
                          : "rgba(255, 255, 255, 0.1)",
                        borderRadius: 0,
                      }}
                    >
                      <RemoveRedEyeIcon
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? blue[700]
                            : "white",
                        }}
                      />
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

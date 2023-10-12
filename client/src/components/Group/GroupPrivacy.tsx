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
import { useParams } from "react-router-dom";
import grey from "@mui/material/colors/grey";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { isEqual, debounce } from "lodash";
import { ClipLoader } from "react-spinners";
// internally crafted imports of resources
import {
  AddUserMutation,
  AddUserMutationVariables,
  RemoveAdminRoleMutation,
  AddAdminRoleMutation,
  AddAdminRoleMutationVariables,
  RemoveAdminRoleMutationVariables,
  ExcludeUserMutation,
  ExcludeUserMutationVariables,
  GroupUsersQuery,
  GroupUsersQueryVariables,
  GroupUserSuggestionQuery,
  GroupUserSuggestionQueryVariables,
  GroupInfoQuery,
  GroupInfoQueryVariables,
  ExcludeAdminMutation,
  ExcludeAdminMutationVariables,
} from "../../__generated__/graphql";
import {
  ADD_USER,
  REMOVE_ADMIN_ROLE,
  Add_ADMIN_ROLE,
  EXCLUDE_USER_FROM_GROUP,
  GROUP_USERS,
  GROUP_USER_SUGGESTION,
  GROUP_INFO,
  EXCLUDE_ADMIN_FROM_GROUP,
} from "../../graphql/Groups.graphql";
import { IActions } from "../../typings/Groups";
import { CssTextFieldShare } from "../../MuiStyles/textField";
import BootstrapTooltip from "../BootstrapTooltip";
import Context from "../../store/ContextApi";
import { IAuthState } from "../../typings/GlobalState";
import { IMode } from "../../typings/GlobalState";
import modeContext from "../../store/ModeContext";
import useNotification from "../../hooks/useNotifications";
import { NotiReference } from "../../Enums";
import { Authentication } from "../../Global/GlobalAuth";
import useWindowSize from "../../hooks/useWindowSize";

const Actions: IActions[] = [
  {
    Icon: DeleteIcon,
    Title: "Remove",
  },
  {
    Icon: PersonAddIcon,
    Title: "Add",
  },
  {
    Icon: ManageAccountsIcon,
    Title: "Admin role",
  },
];

const GroupPrivacy = (): JSX.Element => {
  const ContextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);

  const [search, setSearch] = React.useState<string>("");

  const { enqueueSnackbar } = useSnackbar();
  // state for delaying per-user action
  const [isLoading, setLoading] = React.useState<string>("");

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);
  let { groupname } = useParams<{ groupname: string }>();

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const isAuth = useReactiveVar(Authentication);
  const { width, height } = useWindowSize();

  const { PushNotification, CreateNotification } = useNotification();

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };

    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 200);
  }, [search]);

  /* ---------------------->Queries<---------------------------- */
  const { data } = useQuery<GroupUsersQuery, GroupUsersQueryVariables>(
    GROUP_USERS,
    {
      variables: {
        groupUsersGroupId: `${groupname?.split("-")[1]}`,
        groupUsersGroupName: `${groupname?.split("-")[0]}`,
      },
    }
  );

  const { data: suggestionData } = useQuery<
    GroupUserSuggestionQuery,
    GroupUserSuggestionQueryVariables
  >(GROUP_USER_SUGGESTION, {
    variables: {
      groupUserSuggestionsGroupId: `${groupname?.split("-")[1]}`,
    },
  });

  const { data: Info } = useQuery<GroupInfoQuery, GroupInfoQueryVariables>(
    GROUP_INFO
  );

  /* ---------------------->Mutations<--------------------------- */

  const [addUser, { loading: addUserLoading }] = useMutation<
    AddUserMutation,
    AddUserMutationVariables
  >(ADD_USER);

  const [addAdminRole, { loading: addAdminRoleLoading }] = useMutation<
    AddAdminRoleMutation,
    AddAdminRoleMutationVariables
  >(Add_ADMIN_ROLE);

  const [removeAdminRole, { loading: removeAdminRoleLoading }] = useMutation<
    RemoveAdminRoleMutation,
    RemoveAdminRoleMutationVariables
  >(REMOVE_ADMIN_ROLE);

  const [ExcludeUser, { loading: ExcludeUserLoading }] = useMutation<
    ExcludeUserMutation,
    ExcludeUserMutationVariables
  >(EXCLUDE_USER_FROM_GROUP);

  const [ExcludeAdmin, { loading: ExcludeAdminLoading }] = useMutation<
    ExcludeAdminMutation,
    ExcludeAdminMutationVariables
  >(EXCLUDE_ADMIN_FROM_GROUP);

  // push realtime notifications
  PushNotification({ isAuth: Boolean(isAuth.isLoggedIn) });

  React.useEffect(() => {
    return () => {
      // cleanup debounce for re-rendering prevention
      debounceSearchResult.cancel();
    };
  });

  return (
    <>
      <Box>
        <Box>
          <Typography
            fontWeight="580"
            fontSize="17px"
            color={isEqual(mode.mode, "light") ? "black" : grey[100]}
          >
            Facebook Commumity
          </Typography>
        </Box>
        <Box sx={{ width: width && width <= 720 ? "100%" : 600, pt: 0.5 }}>
          <Typography fontSize="16px" color="text.secondary">
            here's all operations possible on the group to perform only with an
            administrator's right, feel free and make actions your own
          </Typography>
        </Box>
        <Box pt={1}>
          <Typography
            fontWeight="560"
            fontSize="17px"
            color={isEqual(mode.mode, "light") ? "black" : grey[100]}
          >
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
            const { Icon } = val;
            return (
              <Box>
                <Button
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  startIcon={
                    <Icon
                      sx={{
                        color: isEqual(mode.mode, "light")
                          ? "black"
                          : grey[100],
                        fontSize: "12px",
                      }}
                    />
                  }
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    bgcolor: isEqual(mode.mode, "light")
                      ? "#e8f0fe"
                      : "#0866ff",
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    boxShadow: "none",
                    ":hover": {
                      bgcolor: isEqual(mode.mode, "light")
                        ? "#e8f0fe"
                        : "#0866ff",
                      color: isEqual(mode.mode, "light") ? "black" : grey[100],
                      boxShadow: "none",
                    },
                  }}
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
          <Typography
            fontSize="17px"
            fontWeight="540"
            sx={{ color: isEqual(mode.mode, "light") ? "black" : grey[100] }}
          >
            Group users & admins
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 380 }}>
          {data?.GroupUsers?.map((users) => {
            // logic that determines administrator role
            const isAdmin: boolean | undefined =
              Info?.GroupInfo?.Administrators?.map(
                (admins) => admins?._id
              ).includes(`${users?._id}`);

            return (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar alt={`${users?.Image}`} src={`${users?.Image}`} />
                  <Box>
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      textTransform="capitalize"
                    >
                      {users?.Firstname} {users?.Lastname}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box>
                    <IconButton
                      sx={{ p: 0, m: 0 }}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      onClick={async () => {
                        try {
                          setLoading(`${users?._id}`);
                          isAdmin
                            ? await removeAdminRole({
                                variables: {
                                  removeAdminRoleAdminId: `${AuthInfo.Data?._id}`,
                                  removeAdminRoleGroupId: `${
                                    groupname?.split("-")[1]
                                  }`,
                                  removeAdminRoleUserId: users?._id,
                                },
                                refetchQueries: [
                                  GROUP_USERS,
                                  GROUP_USER_SUGGESTION,
                                ],
                                onCompleted: async (data) => {
                                  enqueueSnackbar(
                                    <Typography
                                      sx={{
                                        color: grey[800],
                                        fontS1ize: "1rem",
                                      }}
                                    >
                                      {data.RemoveAdminRole?.message}
                                    </Typography>,
                                    {
                                      anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                      },
                                      variant: isEqual(
                                        data.RemoveAdminRole?.success,
                                        true
                                      )
                                        ? "success"
                                        : "error",
                                      preventDuplicate: true, // prevent noti with the same message to display multiple times
                                    }
                                  );

                                  await CreateNotification({
                                    ReceiverId: `${users?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(true),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: `${groupname?.split("-")[0]}`,
                                      NotiImage: "",
                                      NotiText: "remove admin role",
                                    },
                                    NotiReference: NotiReference.removedAdmin,
                                  });
                                },
                              })
                            : await addAdminRole({
                                variables: {
                                  addAdminRoleAdminId: `${AuthInfo.Data?._id}`,
                                  addAdminRoleGroupId: `${
                                    groupname?.split("-")[1]
                                  }`,
                                  userId: `${users?._id}`,
                                },
                                refetchQueries: [
                                  GROUP_USERS,
                                  GROUP_USER_SUGGESTION,
                                ],
                                onCompleted: async (data) => {
                                  enqueueSnackbar(
                                    <Typography
                                      sx={{
                                        color: grey[800],
                                        fontSize: "1rem",
                                      }}
                                    >
                                      {data.AddAdminRole?.message}
                                    </Typography>,
                                    {
                                      anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                      },
                                      variant: isEqual(
                                        data.AddAdminRole?.success,
                                        true
                                      )
                                        ? "success"
                                        : "error",
                                      preventDuplicate: true, // prevent noti Stack with the same message to display multiple times
                                    }
                                  );

                                  await CreateNotification({
                                    ReceiverId: `${users?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(true),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: `${groupname?.split("-")[0]}`,
                                      NotiImage: "",
                                      NotiText: "",
                                    },
                                    NotiReference: NotiReference.addAdmin,
                                  });
                                },
                              });
                        } catch (error) {
                          throw new Error(`${error}`);
                        }
                      }}
                    >
                      {isAdmin ? (
                        <React.Fragment>
                          {removeAdminRoleLoading &&
                          isEqual(isLoading, `${users?._id}`) ? (
                            <ClipLoader
                              color="#000000"
                              loading={removeAdminRoleLoading}
                              size={14}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <BootstrapTooltip title="remove admin role">
                              <PersonRemoveIcon sx={{ color: blue[700] }} />
                            </BootstrapTooltip>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {addAdminRoleLoading &&
                          isEqual(isLoading, `${users?._id}`) ? (
                            <ClipLoader
                              color="#000000"
                              loading={addAdminRoleLoading}
                              size={14}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <BootstrapTooltip title="add admin role">
                              <PersonAddIcon sx={{ color: blue[700] }} />
                            </BootstrapTooltip>
                          )}
                        </React.Fragment>
                      )}
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      sx={{ p: 0, m: 0 }}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      onClick={async () => {
                        setLoading(`${users?._id}`);
                        try {
                          isAdmin
                            ? await ExcludeAdmin({
                                variables: {
                                  adminRoleId: `${users?._id}`,
                                  excludeAdminAdminId: `${AuthInfo.Data?._id}`,
                                  excludeAdminGroupId: `${
                                    groupname?.split("-")[1]
                                  }`,
                                },
                                refetchQueries: [
                                  GROUP_USERS,
                                  GROUP_USER_SUGGESTION,
                                ],
                                onCompleted: async (data) => {
                                  enqueueSnackbar(
                                    <Typography
                                      sx={{
                                        color: grey[800],
                                        fontSize: "1rem",
                                      }}
                                    >
                                      {data.ExcludeAdmin?.message}
                                    </Typography>,
                                    {
                                      anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                      },
                                      variant: isEqual(
                                        data.ExcludeAdmin?.success,
                                        true
                                      )
                                        ? "success"
                                        : "error",
                                      preventDuplicate: true, // prevent noti with the same message to display multiple times
                                    }
                                  );

                                  await CreateNotification({
                                    ReceiverId: `${users?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(true),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: `${groupname?.split("-")[0]}`,
                                      NotiImage: "",
                                      NotiText: "remove you from the group",
                                    },
                                    NotiReference: NotiReference.removed,
                                  });
                                },
                              })
                            : await ExcludeUser({
                                variables: {
                                  excludeUserAdminId: `${AuthInfo.Data?._id}`,
                                  excludeUserGroupId: `${
                                    groupname?.split("-")[1]
                                  }`,
                                  excludeUserGuestId: `${users?._id}`,
                                },
                                refetchQueries: [
                                  GROUP_USERS,
                                  GROUP_USER_SUGGESTION,
                                ],
                                onCompleted: async (data) => {
                                  enqueueSnackbar(
                                    <Typography
                                      sx={{
                                        color: grey[800],
                                        fontSeize: "0.6rem",
                                      }}
                                    >
                                      {data.ExcludeUser?.message}
                                    </Typography>,
                                    {
                                      anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                      },
                                      variant: isEqual(
                                        data.ExcludeUser?.success,
                                        true
                                      )
                                        ? "success"
                                        : "error",
                                      preventDuplicate: true, // prevent noti with the same message to display multiple times
                                    }
                                  );
                                  await CreateNotification({
                                    ReceiverId: `${users?._id}`,
                                    SenderInfo: `${AuthInfo.Data?._id}`,
                                    isGroup: Boolean(true),
                                    isSeen: Boolean(false),
                                    NotiEngine: {
                                      GroupName: `${groupname?.split("-")[0]}`,
                                      NotiImage: "",
                                      NotiText: "remove you from the group",
                                    },
                                    NotiReference: NotiReference.removed,
                                  });
                                },
                              });
                        } catch (error) {
                          throw new Error(`${error}`);
                        }
                      }}
                    >
                      {isAdmin &&
                      ExcludeAdminLoading &&
                      isEqual(isLoading, `${users?._id}`) ? (
                        <ClipLoader
                          color="#000000"
                          loading={ExcludeAdminLoading}
                          size={14}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : !isAdmin &&
                        ExcludeUserLoading &&
                        isEqual(isLoading, `${users?._id}`) ? (
                        <ClipLoader
                          color="#000000"
                          loading={ExcludeUserLoading}
                          size={14}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        <React.Fragment>
                          <BootstrapTooltip
                            title={
                              isAdmin
                                ? "remove admin from the group"
                                : "remove user from the group"
                            }
                          >
                            <DeleteIcon
                              sx={{
                                color: isEqual(mode.mode, "light")
                                  ? red[700]
                                  : red[400],
                              }}
                            />
                          </BootstrapTooltip>
                        </React.Fragment>
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
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
                sx={{
                  "& fieldset": {
                    border: "none",
                  },
                  ".MuiOutlinedInput-root": {
                    bgcolor: isEqual(mode.mode, "light")
                      ? "#E8F0FE"
                      : "rgba(255,255, 255, 0.2)",
                    borderRadius: 50,
                    color: isEqual(mode.mode, "light") ? grey[700] : grey[200],
                  },
                }}
                onChange={debounceSearchResult}
                fullWidth
                placeholder="search..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? grey[700]
                            : grey[500],
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {suggestionData?.GroupUserSuggestions?.filter((suggestion) =>
              search.toLowerCase() === ""
                ? suggestion
                : suggestion?.Firstname?.toLowerCase().includes(
                    search.toLowerCase()
                  )
            ).map((userSuggestion) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar alt="User" src={`${userSuggestion?.Image}`} />
                    <Box>
                      <Typography
                        fontWeight="500"
                        fontSize="16px"
                        textTransform="capitalize"
                        color={
                          isEqual(mode.mode, "light") ? "black" : grey[100]
                        }
                      >
                        {userSuggestion?.Firstname} {userSuggestion?.Lastname}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <IconButton
                        sx={{ p: 0, m: 0 }}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        onClick={async () => {
                          try {
                            setLoading(`${userSuggestion?._id}`);
                            await addUser({
                              variables: {
                                guestId: `${userSuggestion?._id}`,
                                addUserGroupId: `${groupname?.split("-")[1]}`,
                                adminId: `${AuthInfo.Data?._id}`,
                              },
                              refetchQueries: [
                                GROUP_USER_SUGGESTION,
                                GROUP_USERS,
                              ],
                              onCompleted: async (data) => {
                                enqueueSnackbar(
                                  <Typography
                                    sx={{
                                      color: grey[800],
                                      fontSeize: "1rem",
                                    }}
                                  >
                                    {data.AddUser?.message}
                                  </Typography>,
                                  {
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "right",
                                    },
                                    variant: isEqual(
                                      data.AddUser?.success,
                                      true
                                    )
                                      ? "success"
                                      : "error",
                                    preventDuplicate: true, // prevent noti with the same message to display multiple times
                                  }
                                );

                                await CreateNotification({
                                  ReceiverId: `${userSuggestion?._id}`,
                                  SenderInfo: `${AuthInfo.Data?._id}`,
                                  isGroup: Boolean(true),
                                  isSeen: Boolean(false),
                                  NotiEngine: {
                                    GroupName: `${groupname?.split("-")[0]}`,
                                    NotiImage: "",
                                    NotiText: "add you into the group",
                                  },
                                  NotiReference: NotiReference.Invitation,
                                });
                              },
                            });
                          } catch (error) {
                            throw new Error(`${error}`);
                          }
                        }}
                      >
                        {addUserLoading &&
                        isEqual(isLoading, `${userSuggestion?._id}`) ? (
                          <ClipLoader
                            color="#000000"
                            loading={addUserLoading}
                            size={14}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <BootstrapTooltip title="add a user">
                            <PersonAddIcon sx={{ color: blue[700] }} />
                          </BootstrapTooltip>
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GroupPrivacy;

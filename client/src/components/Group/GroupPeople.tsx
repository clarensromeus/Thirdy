import {
  Box,
  Paper,
  Divider,
  Typography,
  InputAdornment,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import grey from "@mui/material/colors/grey";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PersonAddAlt1 } from "@mui/icons-material";
import { isEqual, debounce } from "lodash";
import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import {
  GroupInfoQuery,
  GroupInfoQueryVariables,
} from "../../__generated__/graphql";
import { GROUP_INFO } from "../../graphql/Groups.graphql";
import { CssTextFieldShare } from "../../MuiStyles/textField";
import Context from "../../store/ContextApi";
import { IAuthState } from "../../typings/GlobalState";
import {
  FollowMutation,
  FollowMutationVariables,
} from "../../__generated__/graphql";
import { FOLLOW_FRIENDS } from "../../graphql/Friends.graphql";
import modeContext from "../../store/ModeContext";
import { IMode } from "../../typings/GlobalState";
import useNotification from "../../hooks/useNotifications";
import { IS_AUTH } from "../../LocalQueries/isAuth";
import { IAuthentication } from "../../typings/Authentication";
import { NotiReference } from "../../Enums";

const GroupPeople = (): JSX.Element => {
  const contextData = React.useContext(Context);
  const modeContextData = React.useContext(modeContext);
  const [followDiff, setFollowDiff] = React.useState<string>("");

  const [search, setSearch] = React.useState<string>("");

  let { groupname } = useParams<{ groupname: string }>();

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { PushNotification, CreateNotification } = useNotification(
    `${AuthInfo.Data?._id}`
  );

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };

    setSearch(target.value);
  };

  const { data } = useQuery<GroupInfoQuery, GroupInfoQueryVariables>(
    GROUP_INFO,
    {
      variables: {
        groupId: `${groupname?.split("-")[1]}`,
        groupName: `${groupname?.split("-")[0]}`,
      },
    }
  );

  // follow mutation
  const [Follow, { loading: followLoading }] = useMutation<
    FollowMutation,
    FollowMutationVariables
  >(FOLLOW_FRIENDS);

  // query with local only fields
  const { data: localData } = useQuery<Required<IAuthentication>>(IS_AUTH);

  // push real time notifications
  PushNotification({ isAuth: Boolean(localData?.isLoggedIn.isLoggedIn) });

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 100);
  }, [search]);

  React.useEffect(() => {
    return () => {
      // cleanup debounce for re-rendering prevention
      debounceSearchResult.cancel();
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{ width: 570, borderRadius: 4 }}
          elevation={isEqual(mode.mode, "light") ? 2 : 0}
        >
          <Box sx={{ width: "100%" }}>
            <Box px={3} pt={3} sx={{ display: "flex", gap: 1.1 }}>
              <Typography fontSize="17px" fontWeight="600">
                All Members
              </Typography>
              <Typography color="text.secondary">
                ({data?.GroupInfo?.GroupUsers?.length})
              </Typography>
            </Box>
            <Box px={3}>
              <Typography
                fontSize="17px"
                fontWeight="520"
                color="text.secondary"
              >
                new people who joins the group either admins or users appear
                below.
              </Typography>
            </Box>
            <Box pt={1} pb={2.1} px={3}>
              <CssTextFieldShare
                fullWidth
                size="small"
                sx={{
                  "& fieldset": { border: "none" },
                  ".MuiOutlinedInput-root": {
                    bgcolor: isEqual(mode.mode, "light")
                      ? "#E8F0FE"
                      : "rgba(255,255, 255, 0.1)",
                    borderRadius: 50,
                    color: isEqual(mode.mode, "light") ? grey[700] : grey[200],
                  },
                }}
                variant="outlined"
                placeholder="search..."
                onChange={debounceSearchResult}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: isEqual(mode.mode, "light")
                            ? grey[700]
                            : grey[200],
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box px={3}>
              <Divider sx={{ px: 3 }} />
            </Box>
            <Box pt={2} px={3} pb={3} sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.4,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Avatar
                    alt={`${AuthInfo.Data?.Image}`}
                    src={`${AuthInfo.Data?.Image}`}
                    sx={{ width: 63, height: 63 }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize="15px"
                        fontWeight="600"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {AuthInfo.Data?.Firstname} {AuthInfo.Data?.Lastname}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>
                        {data?.GroupInfo?.Administrators?.map(
                          (users) => users?._id
                        ).includes(`${AuthInfo.Data?._id}`)
                          ? "Admin"
                          : "User"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color="text.secondary">
                        Join on Sept 12, 2010
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      sx={{
                        bgcolor: isEqual(mode.mode, "light")
                          ? "#e8f0fe"
                          : "rgba(255,255, 255, 0.1)",
                        borderRadius: 0,
                        py: 0.5,
                      }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ px: 3 }}>
              <Divider />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
              py={2}
              px={3}
            >
              <Box>
                <Typography fontWeight="600" fontSize="15px">
                  Users & Administrators
                </Typography>
              </Box>
              <Typography color="text.secondary" fontSize="16px">
                all users and Administrators info.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              {data?.GroupInfo?.GroupUsers?.filter((groupusers) =>
                search.toLowerCase() === ""
                  ? groupusers
                  : groupusers?.Firstname?.toLowerCase().includes(
                      `${search.toLowerCase()}`
                    )
              ).map((users) => {
                const isFriend = data.GroupInfo?.GroupUsers?.map(
                  (user) => user?._id
                ).includes(`${AuthInfo.Data?._id}`);

                const isAdmin: boolean | undefined =
                  data.GroupInfo?.Administrators?.map(
                    (admins) => admins?._id
                  ).includes(`${users?._id}`);

                return (
                  <Box
                    px={3}
                    py={2}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box>
                        <Avatar
                          alt=""
                          src={`${users?.Image}`}
                          sx={{ width: 62, height: 62 }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          fontWeight="600"
                          fontSize="15px"
                          textTransform="capitalize"
                        >
                          {users?.Firstname} {users?.Lastname}
                        </Typography>
                        <Typography color="text.secondary">
                          {isAdmin ? "Admin" : "User"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      {isFriend && (
                        <Button
                          onClick={async () => {
                            try {
                              await Follow({
                                variables: {
                                  followRequestData: {
                                    _id: `${users?._id}`,
                                    User: `${AuthInfo.Data?._id}`,
                                    RequestId: `${AuthInfo.Data?._id}`,
                                  },
                                },
                                onCompleted: async () => {
                                  try {
                                    await CreateNotification({
                                      ReceiverId: `${users?._id}`,
                                      SenderInfo: `${AuthInfo.Data?._id}`,
                                      isSeen: Boolean(false),
                                      isGroup: Boolean(false),
                                      NotiEngine: {
                                        GroupName: `${
                                          groupname?.split("-")[0]
                                        }`,
                                        NotiImage: "",
                                        NotiText: "sent you a friend request",
                                      },
                                      NotiReference: NotiReference.Request,
                                    });
                                  } catch (error) {
                                    throw new Error(`${error}`);
                                  }
                                },
                                refetchQueries: [GROUP_INFO],
                              });
                              setFollowDiff(`${users?._id}`);
                            } catch (error) {
                              throw new Error(`${error}`);
                            }
                          }}
                          sx={{
                            color: isEqual(mode.mode, "light")
                              ? "black"
                              : "white",
                            boxShadow: "none",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            bgcolor: isEqual(mode.mode, "light")
                              ? "#d0e0fd"
                              : "#0866ff",
                          }}
                          startIcon={<PersonAddAlt1 />}
                        >
                          {followLoading &&
                          isEqual(`${users?._id}`, followDiff) ? (
                            <ClipLoader
                              loading={followLoading}
                              size={20}
                              color="white"
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "Add Friend"
                          )}
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default GroupPeople;

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { debounce } from "lodash";
import ListItemButton from "@mui/material/ListItemButton";
import grey from "@mui/material/colors/grey";
import { FadeLoader } from "react-spinners";
import blue from "@mui/material/colors/blue";
import { useRecoilValue } from "recoil";
import { useQuery } from "@apollo/client";
import { upperFirst, isEqual } from "lodash";
import { useReactiveVar } from "@apollo/client";
import { useMutation } from "@apollo/client";
// internally crafted imports of resources
import {
  FollowMutation,
  FollowMutationVariables,
  AllUserQueryVariables,
} from "../../__generated__/graphql";
import { CssTextField } from "../MuiStyles";
import Context from "../../store/ContextApi";
import { IAuthState } from "../../typings/GlobalState";
import { IDrawer } from "../../typings/GlobalState";
import { ClipLoader } from "react-spinners";
import { ALL_USERS } from "../../graphql/User.graphql";
import { AllUserQuery } from "../../__generated__/graphql";
import {
  ALL_FRIEND_REQUESTS,
  FOLLOW_FRIENDS,
  FRIEND_SUGGESTIONS,
} from "../../graphql/Friends.graphql";
import modeContext from "../../store/ModeContext";
import { IMode } from "../../typings/GlobalState";
import useNotification from "../../hooks/useNotifications";
import { Authentication } from "../../Global/GlobalAuth";
import { NotiReference } from "../../Enums";

const ListOfFriends: React.FC<IDrawer> = ({ DialogOpen, CloseDialog }) => {
  const ContextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);

  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const isAuth = useReactiveVar(Authentication);

  const { CreateNotification, PushNotification } = useNotification();

  const [search, setSearch] = React.useState<string>("");

  const { data } = useQuery<AllUserQuery, AllUserQueryVariables>(ALL_USERS, {
    variables: { allUsersId: `${AuthInfo.Data?._id}` },
  });
  const [selected, setselected] = React.useState<{ indexLink: number }>({
    indexLink: 0,
  });

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };

    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 200);
  }, [search]);

  const [follow, { loading }] = useMutation<
    FollowMutation,
    FollowMutationVariables
  >(FOLLOW_FRIENDS);

  // push real time notification
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
        <Dialog
          open={DialogOpen}
          onClose={CloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form>
            <DialogTitle
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize: "1.5em",
                color: "text.secondary",
              }}
            >
              <Box>
                <IconButton onClick={CloseDialog}>
                  <ArrowForwardIcon
                    sx={{
                      color: isEqual(mode.mode, "light") ? "black" : "white",
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CssTextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="search friends..."
                  onChange={handleChangeEvent}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </DialogTitle>
            <DialogContent
              sx={{
                width: 600,
                height: 400,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {loading ? (
                <Box pt={13} pl={40}>
                  <FadeLoader
                    color="hsla(0, 0%, 80%)"
                    loading={loading}
                    aria-label="Loading Spinner"
                  />
                </Box>
              ) : (
                <List sx={{ width: 550 }}>
                  {data?.allUsers
                    ?.filter((users) =>
                      search.toLowerCase() === ""
                        ? users
                        : users?.Firstname.toLowerCase().includes(search)
                    )
                    .map((val, ind) => {
                      const sel = selected.indexLink;

                      const isFollowed =
                        val?.Friends?.map(
                          (friend) => friend?.AcceptedId
                        ).includes(`${AuthInfo.Data?._id}`) ||
                        val?.Friends?.map(
                          (friend) => friend?.RequestId
                        ).includes(`${AuthInfo.Data?._id}`);

                      return (
                        <ListItem
                          button
                          key={val?._id}
                          disableRipple
                          divider
                          sx={{
                            bgcolor:
                              isEqual(mode.mode, "light") && sel === ind
                                ? grey[200]
                                : isEqual(mode.mode, "dark") && sel === ind
                                ? "rgba(255, 255, 255, 0.1)"
                                : null,
                          }}
                          onClick={(e: React.MouseEvent) => {
                            setselected({ indexLink: ind });
                          }}
                          disablePadding
                        >
                          <ListItemButton disableRipple>
                            <ListItemAvatar>
                              <Avatar alt="image" src={`${val?.Image}`}>
                                {`${val?.Firstname.toUpperCase().charAt(
                                  0
                                )}${val?.Lastname.toUpperCase().charAt(0)}`}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  <Typography
                                    sx={{ pt: 1 }}
                                    component="div"
                                    display="flex"
                                    justifyContent="space-between"
                                  >
                                    <span>
                                      {upperFirst(`${val?.Firstname}`)}{" "}
                                      {`${val?.Lastname}`}
                                    </span>
                                  </Typography>
                                  {isFollowed ? (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        boxShadow: "none",
                                        bgcolor: "#E8F0FE",
                                        color: blue[700],
                                        ":hover": {
                                          boxShadow: "none",
                                          bgcolor: "#E8F0FE",
                                          color: blue[700],
                                        },
                                      }}
                                    >
                                      friends
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      sx={{
                                        boxShadow: "none",
                                        bgcolor: isEqual(mode.mode, "light")
                                          ? ""
                                          : "#0866ff",
                                        color: "white",
                                        ":hover": {
                                          boxShadow: "none",
                                          color: "white",
                                        },
                                      }}
                                      onClick={() => {
                                        follow({
                                          variables: {
                                            followRequestData: {
                                              _id: `${val?._id}`,
                                              RequestId: `${AuthInfo.Data?._id}`,
                                              User: `${AuthInfo.Data?._id}`,
                                            },
                                          },
                                          onCompleted: async () => {
                                            try {
                                              await CreateNotification({
                                                ReceiverId: `${val?._id}`,
                                                SenderInfo: `${AuthInfo.Data?._id}`,
                                                isGroup: Boolean(false),
                                                isSeen: Boolean(false),
                                                NotiEngine: {
                                                  GroupName: "",
                                                  NotiImage: "",
                                                  NotiText:
                                                    "sent you a friend request",
                                                },
                                                NotiReference:
                                                  NotiReference.Request,
                                              });
                                            } catch (error) {
                                              throw new Error(`${error}`);
                                            }
                                          },
                                          refetchQueries: [
                                            FRIEND_SUGGESTIONS,
                                            ALL_FRIEND_REQUESTS,
                                          ],
                                        });
                                      }}
                                    >
                                      {loading ? (
                                        <ClipLoader
                                          loading={loading}
                                          size={20}
                                          color="white"
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                      ) : (
                                        "follow"
                                      )}
                                    </Button>
                                  )}
                                </Box>
                              }
                              secondary={val?.Email}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                </List>
              )}
            </DialogContent>
          </form>
        </Dialog>
      </Box>
    </>
  );
};

export default ListOfFriends;

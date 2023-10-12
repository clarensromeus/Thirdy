import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import grey from "@mui/material/colors/grey";
import { isEqual, isEmpty, debounce } from "lodash";
import { useReactiveVar } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";
import { useQuery, useMutation } from "@apollo/client";
// internally crafted imports of resources
import {
  SharePostWithGroupMutation,
  SharePostWithGroupMutationVariables,
  GetAllGroupsQuery,
  GetAllGroupsQueryVariables,
} from "../../__generated__/graphql";
import { SHARE_POST_WITH_GROUPS } from "../../graphql/Posts.graphql";
import { IShareDataWithGroup } from "../../typings/Post";
import { GET_ALL_GROUPS } from "../../graphql/Groups.graphql";
import { CssTextFieldShare } from "../../MuiStyles/textField";
import useNotification from "../../hooks/useNotifications";
import { Authentication } from "../../Global/GlobalAuth";
import { NotiReference } from "../../Enums";
import { IMode } from "../../typings/GlobalState";
import modeContext from "../../store/ModeContext";
import useWindowSize from "../../hooks/useWindowSize";

const SharePostWithGroup = ({
  openGroupFrame,
  setOpenGroupFrame,
  id,
  GroupInfo: { _id, PostId, Title, userId },
}: IShareDataWithGroup) => {
  const modeContextData = React.useContext(modeContext);
  const [checked, setChecked] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // add and check the flexbox if not exist
      newChecked.push(value);
    } else {
      // uncheck it if already exists
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { data } = useQuery<GetAllGroupsQuery, GetAllGroupsQueryVariables>(
    GET_ALL_GROUPS
  );

  const [SharePostWithGroups, { loading }] = useMutation<
    SharePostWithGroupMutation,
    SharePostWithGroupMutationVariables
  >(SHARE_POST_WITH_GROUPS);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 1000);
  }, [search]);

  const isAuth = useReactiveVar(Authentication);
  const { CreateNotification, PushNotification } = useNotification();

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { width, height } = useWindowSize();

  // push real time notifications
  PushNotification({ isAuth: isAuth.isLoggedIn });

  React.useEffect(() => {
    return () => {
      // cleanup debounce search for re-rendering prevention
      debounceSearchResult.cancel();
    };
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: openGroupFrame ? "block" : "none",
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
            bgcolor: isEqual(mode.mode, "light") ? "white" : "black",
            width: width && width <= 650 ? "100%" : 590,
            height: width && width <= 650 ? "100%" : 480,
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ alignSelf: "center" }}>
              <Typography
                fontSize="1.3em"
                fontWeight="bold"
                color={isEqual(mode.mode, "light") ? "black" : grey[100]}
              >
                Share with groups
              </Typography>
            </Box>
            <Box pl={20}>
              <IconButton
                sx={{
                  bgcolor: isEqual(mode.mode, "light")
                    ? "rgba(232,240,254, 0.8)"
                    : "rgba(255, 255,255, 0.2)",
                }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() => setOpenGroupFrame(false)}
              >
                <CloseIcon
                  sx={{
                    color: isEqual(mode.mode, "light") ? "black" : grey[100],
                    fontSize: "1.5rem",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box p={2}>
            <CssTextFieldShare
              sx={{
                "& fieldset": { border: "none" },
                bgcolor: isEqual(mode.mode, "light")
                  ? "rgba(232,240,254, 0.8)"
                  : "rgba(255, 255, 255, 0.2)",
                borderRadius: 10,
              }}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="search a friend..."
              onChange={debounceSearchResult}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: isEqual(mode.mode, "light")
                          ? grey[700]
                          : grey[400],
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            pt={1}
            mb={2}
            px={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "inherit",
            }}
          >
            <Box>
              <Typography color="text.secondary">sugestions</Typography>
            </Box>
            <Box>
              <List
                dense
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 160,
                  maxWidth: width && width <= 650 ? "94%" : 570,
                  bgcolor: "background.paper",
                }}
              >
                {data?.GetAllGroups?.filter((groups) =>
                  search.toLowerCase() === ""
                    ? groups
                    : groups?.GroupName?.toLowerCase().includes(
                        search.toLowerCase()
                      )
                ).map((group) => {
                  return (
                    <ListItem
                      key={`${group._id}`}
                      sx={{ px: 0 }}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(`${group._id}`)}
                          checked={checked.indexOf(group._id) !== -1}
                        />
                      }
                      disablePadding
                    >
                      <ListItemAvatar>
                        <Avatar src={`${group.GroupCoverImage}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            textTransform="capitalize"
                            color={
                              isEqual(mode.mode, "light") ? "black" : grey[100]
                            }
                          >
                            {group.GroupName}
                          </Typography>
                        }
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box p={1} />
          <Divider />
          <Box py={2} sx={{ width: "inherit" }}>
            <Box px={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: isEqual(mode.mode, "light") ? "" : "#0866ff" }}
                disabled={isEmpty(checked) && true}
                onClick={async () => {
                  try {
                    await SharePostWithGroups({
                      variables: {
                        retweetData: {
                          Post: `${_id}`,
                          PostId,
                          RetweetedUser: "",
                        },
                        groupInfo: {
                          GroupId: checked,
                          sharedPostId: "",
                        },
                      },
                      onCompleted: async () => {
                        try {
                          await CreateNotification({
                            ReceiverId: `${userId}`,
                            SenderInfo: `${id}`,
                            isSeen: Boolean(false),
                            isGroup: Boolean(true),
                            NotiEngine: {
                              GroupName: "",
                              NotiImage: "",
                              NotiText: "share you post with groups",
                            },
                            NotiReference: NotiReference.Share,
                          });
                        } catch (error) {
                          throw new Error(`${error}`);
                        }
                      },
                    });
                  } catch (error) {
                    throw new Error(`${error}`);
                  }
                }}
              >
                {loading ? (
                  <ClipLoader
                    loading={loading}
                    size={18}
                    color="white"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "share"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SharePostWithGroup;

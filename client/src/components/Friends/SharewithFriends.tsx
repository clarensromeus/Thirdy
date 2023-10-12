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
import { isEmpty, isEqual, debounce } from "lodash";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ClipLoader } from "react-spinners";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@apollo/client";
// internally crafted imports of resources
import {
  SharePostWithMutation,
  SharePostWithMutationVariables,
  AllFriendsQuery,
  AllFriendsQueryVariables,
} from "../../__generated__/graphql";
import { SHARE_POST_With_Friends } from "../../graphql/Posts.graphql";
import { ALL_FRIENDS } from "../../graphql/Friends.graphql";
import { IShareDataWithFriend } from "../../typings/Post";
import { CssTextFieldShare } from "../../MuiStyles/textField";
import useWindowSize from "../../hooks/useWindowSize";
import modeContext from "../../store/ModeContext";
import { IMode } from "../../typings/GlobalState";

const SharewithFriends = ({
  openFrame,
  setOpenFrame,
  _id,
  PostInfo: { PostId, Image, Title },
}: IShareDataWithFriend) => {
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

  const { data } = useQuery<AllFriendsQuery, AllFriendsQueryVariables>(
    ALL_FRIENDS,
    { variables: { FriendId: _id } }
  );

  const [SharePostWithFriends, { loading }] = useMutation<
    SharePostWithMutation,
    SharePostWithMutationVariables
  >(SHARE_POST_With_Friends);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return debounce(handleChangeEvent, 1000);
  }, [search]);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { width, height } = useWindowSize();

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
                Share with friends
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
                onClick={() => setOpenFrame(false)}
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
              onChange={debounceSearchResult}
              placeholder="search a friend..."
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
                {data?.AllFriends?.filter((friends) =>
                  search.toLowerCase() === ""
                    ? friends
                    : friends.User?.Firstname?.toLowerCase().includes(
                        search.toLowerCase()
                      )
                ).map((friend, ind) => {
                  return (
                    <ListItem
                      key={`${friend.User?._id}`}
                      sx={{ px: 0 }}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(`${friend.User?._id}`)}
                          checked={checked.indexOf(friend.User?._id) !== -1}
                        />
                      }
                      disablePadding
                    >
                      <ListItemAvatar>
                        <Avatar src={`${friend.User?.Image}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            textTransform="capitalize"
                            color={
                              isEqual(mode.mode, "light") ? "black" : grey[100]
                            }
                          >
                            {friend.User?.Firstname} {friend.User?.Lastname}
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
                    await SharePostWithFriends({
                      variables: {
                        shareData: {
                          _id: checked,
                          From: `${_id}`,
                          Title,
                          PostId: PostId,
                          To: `${_id}`,
                          Image,
                        },
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

export default SharewithFriends;

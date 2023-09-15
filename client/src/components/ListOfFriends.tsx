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
import ListItemButton from "@mui/material/ListItemButton";
import grey from "@mui/material/colors/grey";
import { FadeLoader } from "react-spinners";
import blue from "@mui/material/colors/blue";
import { useRecoilValue } from "recoil";
import { useQuery } from "@apollo/client";
import { upperFirst } from "lodash";
import { useMutation } from "@apollo/client";
// internally crafted imports of ressources
import {
  FollowMutation,
  FollowMutationVariables,
} from "../__generated__/graphql";
import { CssTextField } from "./MuiStyles";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { IDrawer } from "../typings/GlobalState";
import { ALL_USERS } from "../graphql/User.graphql";
import { AllUserQuery } from "../__generated__/graphql";
import { FOLLOW_FRIENDS } from "../graphql/Friends.graphql";

const ListOfFriends: React.FC<IDrawer> = ({ DialogOpen, CloseDialog }) => {
  const ContextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(ContextData.GetAuthInfo);

  const { data, loading } = useQuery<AllUserQuery>(ALL_USERS);

  const [selected, setselected] = React.useState<{ indexLink: number }>({
    indexLink: 0,
  });

  const [follow, { data: followFriendsData, loading: followLoading }] =
    useMutation<FollowMutation, FollowMutationVariables>(FOLLOW_FRIENDS);

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
                  <ArrowForwardIcon sx={{ color: "black" }} />
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
                  {data?.allUsers?.map((val, ind) => {
                    const sel = selected.indexLink;

                    const isFollowed =
                      val?.Friends?.map(
                        (friend) => friend?.AcceptedId
                      ).includes(`${AuthInfo.Data?._id}`) ||
                      val?.Friends?.map((friend) => friend?.RequestId).includes(
                        `${AuthInfo.Data?._id}`
                      );

                    return (
                      <ListItem
                        button
                        key={val?._id}
                        disableRipple
                        divider
                        sx={{ bgcolor: sel === ind ? grey[200] : null }}
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
                                      ":hover": { boxShadow: "none" },
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
                                      });
                                    }}
                                  >
                                    follow
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

import * as React from "react";
import {
  Box,
  Popper,
  Fade,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  Avatar,
} from "@mui/material";
import { uniqueId } from "lodash";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import SearchIcon from "@mui/icons-material/Search";
import blue from "@mui/material/colors/blue";
import { CssTextFieldShare } from "../MuiStyles/textField";
import { isEqual } from "lodash";
// internally crafted imports of ressources
import { INotiPopperProps } from "../typings/Notifications";

const NotiPopper = ({ openNoti, anchorElNoti }: INotiPopperProps) => {
  const fakeNotifications: {
    Firstname: string;
    Lastname: string;
    Date: string;
    Image: string;
    Mutual?: number;
    Notiref: string;
    SharedPerson?: string;
  }[] = [
    {
      Firstname: "Jhonny",
      Lastname: "lewis",
      Date: "1 day ago",
      Image:
        "https://nbcsports.brightspotcdn.com/dims4/default/f2b2842/2147483647/strip/true/crop/1319x742+0+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.amazonaws.com%2Fbrightspot%2F1f%2F09%2F684fa77a56585d477fc1e730b388%2Fholden-staes-e1620415067383.jpg",
      Notiref: "likes",
    },
    {
      Firstname: "Orilla",
      Lastname: "rosenie",
      Date: "2 hours ago",
      Image:
        "https://i.pinimg.com/236x/c1/5d/02/c15d020633bd1f59d15979ae9219912c.jpg",
      Notiref: "shared",
      SharedPerson: "wilvenson doma",
    },
    {
      Firstname: "Darline",
      Lastname: "viskovic",
      Date: "1 day ago",
      Image:
        "https://justwomenssports.com/wp-content/uploads/2023/02/GettyImages-1246627588-scaled-e1676490670785.jpg",
      Mutual: 5,
      Notiref: "request",
    },
    {
      Firstname: "Vandic",
      Lastname: "puskas",
      Date: " 1 year ago",
      Image:
        "https://www.uvpediatrics.com/wp-content/uploads/2016/08/guiding-your-freshman-college-website-main.jpg",
      Mutual: 2,
      Notiref: "request",
    },
    {
      Firstname: "Jhonson",
      Lastname: "napoleon",
      Date: "2 years ago",
      Image:
        "https://media.istockphoto.com/id/1059661424/photo/mature-mixed-race-business-man.jpg?s=612x612&w=0&k=20&c=UAVBeyoD_LkCh1MzVaWW1SR1iwK-VkPDXWMH2o2wL8M=",
      Notiref: "messaged",
    },
  ];

  return (
    <>
      <Popper
        id={uniqueId()}
        open={openNoti}
        anchorEl={anchorElNoti}
        placement="bottom-end"
        transition
        sx={{ width: 350, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={2}>
              <Box
                px={2}
                pt={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Typography fontWeight="700" fontSize="24px">
                  Notifications
                </Typography>
                <IconButton sx={{ bgcolor: "#E8F0FE", borderRadius: 50 }}>
                  <EditNotificationsIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>
              <Box
                px={2}
                sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}
              >
                <Typography sx={{ color: blue[800] }}>(19)</Typography>
                <Box>
                  <CssTextFieldShare
                    placeholder="search..."
                    size="small"
                    fullWidth
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box pt={1} px={2}>
                <Typography fontWeight="bold">All</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: 400,
                  overflow: "auto",
                }}
              >
                {fakeNotifications.map((notifications) => {
                  const {
                    Firstname,
                    Lastname,
                    Image,
                    Notiref,
                    Mutual,
                    Date,
                    SharedPerson,
                  } = notifications;
                  return (
                    <Box
                      pt={1}
                      px={2}
                      mb={2}
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: isEqual(Notiref, "request")
                          ? "flex-start"
                          : "center",
                        alignContent: isEqual(Notiref, "request")
                          ? "flex-start"
                          : "center",
                      }}
                    >
                      <Box>
                        <Avatar
                          alt=""
                          src={Image}
                          sx={{ width: 62, height: 62 }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{}}>
                          <Typography
                            fontWeight="600"
                            fontSize="15px"
                            component="span"
                          >
                            {Firstname} {Lastname}
                          </Typography>
                          <Typography color="text.secondary" component="span">
                            {" "}
                            {isEqual(Notiref, "likes")
                              ? "likes your post"
                              : isEqual(Notiref, "shared")
                              ? "shared you post with"
                              : isEqual(Notiref, "commented")
                              ? "commented your post"
                              : isEqual(Notiref, "messaged")
                              ? "messaged you"
                              : "sent you a friend request"}
                            {isEqual(Notiref, "shared") && (
                              <span
                                style={{
                                  color: "black",
                                  fontWeight: "600",
                                  fontSize: "15px",
                                }}
                              >
                                {SharedPerson}
                              </span>
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: blue[700],
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {Date}
                          </Typography>
                        </Box>
                        {isEqual(Notiref, "request") && (
                          <Box>
                            <Typography
                              color="text.secondary"
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              {Mutual} mutual friends
                            </Typography>
                          </Box>
                        )}
                        {isEqual(Notiref, "request") && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              alignContent: "center",
                              gap: 1,
                              pt: 0.3,
                              width: "inherit",
                            }}
                          >
                            <Box>
                              <Button
                                variant="contained"
                                sx={{ fontWeight: "bold", boxShadow: "none" }}
                                fullWidth
                              >
                                Accept
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                variant="contained"
                                sx={{ bgcolor: "#E8F0FE", boxShadow: "none" }}
                                fullWidth
                              >
                                <Typography fontWeight="bold" color="primary">
                                  Reject
                                </Typography>
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotiPopper;

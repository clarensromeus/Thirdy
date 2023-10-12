import * as React from "react";
import { Box, Typography, IconButton, Paper, Popover } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { useNavigate, NavigateFunction } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import blue from "@mui/material/colors/blue";
// internally crafted import of resources
import { AllUserQueryVariables, AllUserQuery } from "../__generated__/graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { ALL_USERS } from "../graphql/User.graphql";
import { IpopOver } from "../typings/Home";

const PopOverSearch = ({ anchorElSearch, setAnchorElSearch }: IpopOver) => {
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const navigate: NavigateFunction = useNavigate();

  const { data } = useQuery<AllUserQuery, AllUserQueryVariables>(ALL_USERS, {
    variables: {
      allUsersId: `${AuthInfo.Data?._id}`,
    },
  });

  const open = Boolean(anchorElSearch);

  const handleClose = () => {
    setAnchorElSearch(null);
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorElSearch}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock
        disableAutoFocus
      >
        <Paper elevation={2}>
          <Box pt={3} mx={2} sx={{ width: 350 }}>
            <Box
              sx={{
                width: "inherit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography fontWeight="600" fontSize="17px">
                  Recent searches
                </Typography>
              </Box>
              <IconButton sx={{ p: 0, m: 0 }}>
                <EditIcon sx={{ color: blue[700] }} />
              </IconButton>
            </Box>
            <Box py={1.3}>
              <Typography fontWeight="520" fontSize="17px">
                suggested users
              </Typography>
            </Box>
            <Box pb={2}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data?.allUsers
                  /*  ?.filter((user) =>
                    search.toLowerCase() === ""
                      ? user
                      : user?.Firstname.toLowerCase().includes(
                          `${search.toLowerCase()}`
                        )
                  ) */
                  ?.map((user) => {
                    return (
                      <React.Fragment key={user?._id}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            alignContent: "center",
                            border: "none",
                            bgcolor: "white",
                            ":hover": {
                              border: "none",
                              bgcolor: "rgba(255,255,255, 0.2)",
                            },
                          }}
                          onClick={() => navigate(`profile/${user?._id}`)}
                          component="button"
                        >
                          <Box>
                            <Avatar
                              alt={`${user?.Image}`}
                              src={`${user?.Image}`}
                              sx={{ width: 52, height: 52 }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.3,
                            }}
                          >
                            <Typography
                              fontWeight="530"
                              fontSize="16px"
                              textTransform="capitalize"
                            >
                              {user?.Firstname} {user?.Lastname}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography fontSize="13px">.3h</Typography>
                              <Typography fontSize="13px">
                                Agronomist
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </React.Fragment>
                    );
                  })
                  .slice(0, 4)}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Popover>
    </>
  );
};

export default PopOverSearch;

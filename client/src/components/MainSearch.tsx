import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Popover,
  Avatar,
} from "@mui/material";
import { isEqual } from "lodash";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import blue from "@mui/material/colors/blue";
import __ from "lodash";
import { useQuery } from "@apollo/client";
// internally crafted imports of resources
import modeContext from "../store/ModeContext";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../MuiStyles/Search";
import { IMode } from "../typings/GlobalState";
import { AllUserQuery, AllUserQueryVariables } from "../__generated__/graphql";
import { ALL_USERS } from "../graphql/User.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

const SearchBar = (): JSX.Element => {
  const modeContextData = React.useContext(modeContext);
  const contextData = React.useContext(Context);

  const [anchorElSearch, setAnchorElSearch] = React.useState<any | null>(null);
  const [search, setSearch] = React.useState<string>("");

  const handleFocus = (event: any) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElSearch(null);
  };

  const open = Boolean(anchorElSearch);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return __.debounce(handleChangeEvent, 1000);
  }, [search]);

  const { data } = useQuery<AllUserQuery, AllUserQueryVariables>(ALL_USERS, {
    variables: {
      allUsersId: `${AuthInfo.Data?._id}`,
    },
  });

  React.useEffect(() => {
    return () => {
      // cleanup debounce for re-rendering prevention
      debounceSearchResult.cancel();
    };
  }, []);

  return (
    <>
      <Search
        sx={{
          bgcolor: isEqual(mode.mode, "light")
            ? "#E8F0FE"
            : "rgba(255, 255, 255, 0.2)",
          ":hover": {
            bgcolor: isEqual(mode.mode, "light")
              ? "#E8F0FE"
              : "rgba(255, 255, 255, 0.2)",
          },
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon sx={{ color: grey[500] }} />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{
            input: {
              color: isEqual(mode.mode, "dark") ? grey[200] : "",
            },
          }}
          type="text"
          placeholder="Search…"
          // value={search}
          inputProps={{ "aria-label": "search" }}
          onFocus={handleFocus}
          onChange={debounceSearchResult}
        />
      </Search>

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
                  ?.filter((user) =>
                    search.toLowerCase() === ""
                      ? user
                      : user?.Firstname.toLowerCase().includes(
                          `${search.toLowerCase()}`
                        )
                  )
                  ?.map((user) => {
                    return (
                      <React.Fragment key={user?._id}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            alignContent: "center",
                          }}
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

export default SearchBar;

import * as React from "react";
import {
  Popper,
  Box,
  Button,
  Typography,
  IconButton,
  Icon,
  Paper,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { IRetweetProps } from "../typings/Post";
import PeopleIcon from "@mui/icons-material/People";
import SharewithFriends from "./SharewithFriends";

const Retweet = ({
  anchorEl,
  open,
  setAnchorEl,
}: IRetweetProps): JSX.Element => {
  const [openFrame, setOpenFrame] = React.useState<boolean>(false);

  const shareData = {
    openFrame,
    setOpenFrame,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <SharewithFriends {...shareData} />
      <Popper open={open} anchorEl={anchorEl}>
        <Paper sx={{ borderRadius: 4 }}>
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 4,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box>
                <IconButton
                  sx={{ m: 0, p: 0 }}
                  onClick={(event) => {
                    setOpenFrame(true);
                    handleClick(event);
                  }}
                >
                  <PeopleIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>
              <Box>
                <Typography fontWeight="bold">Share with friends</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box>
                <IconButton sx={{ m: 0, p: 0 }}>
                  <GroupsIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>
              <Box>
                <Typography fontWeight="bold">Share with groups</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box>
                <IconButton sx={{ m: 0, p: 0 }}>
                  <Icon
                    sx={{
                      color: "black",
                    }}
                    baseClassName="fas"
                    className="fa-thin fa-retweet"
                    fontSize="small"
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography fontWeight="bold">Just retweet</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default Retweet;

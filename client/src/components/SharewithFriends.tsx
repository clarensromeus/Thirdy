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
import { useRecoilValue } from "recoil";
import __ from "lodash";
import { ClipLoader } from "react-spinners";
import { ISharewithData } from "../typings/Post";
import { CssTextFieldShare } from "../MuiStyles/textField";

const SharewithFriends = ({ openFrame, setOpenFrame }: ISharewithData) => {
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: number) => () => {
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
            bgcolor: "white",
            width: 590,
            height: 480,
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
              <Typography fontSize="1.3em" fontWeight="bold">
                Share with friends
              </Typography>
            </Box>
            <Box pl={20}>
              <IconButton
                sx={{ bgcolor: "rgba(232,240,254, 0.8)" }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() => setOpenFrame(false)}
              >
                <CloseIcon sx={{ color: "black", fontSize: "1.5rem" }} />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box p={2}>
            <CssTextFieldShare
              sx={{ "& fieldset": { border: "none" } }}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="search a friend..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
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
                  maxWidth: 570,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(1)}
                      checked={checked.indexOf(1) !== -1}
                    />
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmyVBbnUXzsoYUTYYw5lLTbgW6mGE-Eb3a_A-4v2zEoEV5FU5TJQ4bqr1tpOgsxSn34I&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Georges virgin"
                    secondary="Jan 9, 2014"
                  />
                </ListItem>
                <ListItem
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(2)}
                      checked={checked.indexOf(2) !== -1}
                    />
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="https://i.pinimg.com/236x/c1/5d/02/c15d020633bd1f59d15979ae9219912c.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Orilla rosenie"
                    secondary="Jan 7, 2014"
                  />
                </ListItem>
                <ListItem
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(3)}
                      checked={checked.indexOf(3) !== -1}
                    />
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEoedAxAu2ud-GKkMSy03HBAxaMgQfPYquaSBaAEC7pXNq5EdV16W06MBwK1YyHqDaidA&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Paul baubrun"
                    secondary="July 20, 2014"
                  />
                </ListItem>
                <ListItem
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(3)}
                      checked={checked.indexOf(3) !== -1}
                    />
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEoedAxAu2ud-GKkMSy03HBAxaMgQfPYquaSBaAEC7pXNq5EdV16W06MBwK1YyHqDaidA&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Roselin peter"
                    secondary="July 20, 2014"
                  />
                </ListItem>
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
                disabled={__.isEmpty(checked) && true}
              >
                share
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SharewithFriends;

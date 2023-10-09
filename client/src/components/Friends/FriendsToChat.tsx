import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import { isEqual } from "lodash";
// internally crafted imports of resources
import { IDrawer } from "../../typings/GlobalState";
import ListOfFriends from "./ListOfFriends";
import modeContext from "../../store/ModeContext";
import { IMode } from "../../typings/GlobalState";

const FriendsToChat: React.FC = () => {
  const [DialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const CloseDialog = () => {
    setDialogOpen(false);
  };

  const FollowProps: IDrawer = {
    DialogOpen,
    CloseDialog,
  };

  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  return (
    <>
      <ListOfFriends {...FollowProps} />
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "inherit",
            textAlign: "center",
            px: 2,
          }}
        >
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="1.8rem"
              textTransform="capitalize"
              color={isEqual(mode.mode, "light") ? "black" : grey[100]}
            >
              select a person to chat
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">
              pick from your existing chatbox, or just keep searching through{" "}
            </Typography>
          </Box>
          <Box pt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                boxShadow: "none",
                borderRadius: 50,
                bgcolor: isEqual(mode.mode, "light") ? "" : "#0866ff",
                color: "white",
              }}
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              searching
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FriendsToChat;

import * as React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, NavigateFunction } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import grey from "@mui/material/colors/grey";
import isEqual from "lodash/isEqual";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// internally crafted imports of resources
import { LogOutMutation } from "../__generated__/graphql";
import { LOG_OUT } from "../graphql/User.graphql";
import { ILogOut } from "../typings/Menu";

const LogOut = ({ mode }: ILogOut) => {
  const [logOut, { client }] = useMutation<LogOutMutation>(LOG_OUT);

  const navigate: NavigateFunction = useNavigate();

  return (
    <React.Fragment>
      <Box
        sx={{
          py: 1,
          display: "flex",
          gap: 7,
          alignItems: "center",
          alignContent: "center",
          px: 1,
          border: 0,
          ":hover": {
            bgcolor: isEqual(mode, "light")
              ? grey[200]
              : "rgba(255,255, 255, 0.2)",
          },
        }}
      >
        <Box>
          <IconButton
            sx={{
              bgcolor: isEqual(mode, "light")
                ? "#d0e0fd"
                : "rgba(255, 255, 255, 0.3)",
              borderRadius: 50,
            }}
            onClick={async () => {
              try {
                await logOut();
                // reset apollo client cache so that no unexpected data printed out
                // when user re-login
                client.resetStore();
                window.localStorage.clear();
                // redirect to the login page after Log Out
                navigate("/");
              } catch (error) {
                throw new Error(`${error}`);
              }
            }}
          >
            <PowerSettingsNewIcon
              sx={{
                fontWeight: "bold",
                color: isEqual(mode, "light") ? "black" : grey[100],
              }}
            />
          </IconButton>
        </Box>
        <Box>
          <Typography
            fontSize="16px"
            fontWeight="bold"
            sx={{ color: isEqual(mode, "light") ? "black" : "white" }}
          >
            Log Out
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LogOut;

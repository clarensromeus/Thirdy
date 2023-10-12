import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { isExpired } from "react-jwt";
import __ from "lodash";
// internally crafted imports of resources
import { RefreshTokenMutation } from "../__generated__/graphql";
import { REFRESH_TOKEN } from "../graphql/User.graphql";

const RefreshToken: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [RefreshToken] = useMutation<RefreshTokenMutation>(REFRESH_TOKEN);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            textAlign: "center",
            pt: 10,
          }}
        >
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="max(1.7rem, .9rem)"
              textTransform="capitalize"
            >
              recover token
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">
              for the sake of security of your sensitive data refresh token to
              login again
            </Typography>
          </Box>
          <Box py={1}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                boxShadow: "none",
                borderRadius: 2,
                bgcolor: "#0866ff",
              }}
              onClick={() => {
                RefreshToken({
                  onCompleted: (data) => {
                    if (
                      !__.isUndefined(data.RefreshToken) &&
                      isExpired(`${data.RefreshToken?.refreshToken}`)
                    ) {
                      // reevaluate the expired token with a fresh one for high data security against
                      // malware attacks like csrf(CROSS SITE RESOURCES FORGERY)
                      window.localStorage.setItem(
                        "TOKEN",
                        JSON.stringify(`${data.RefreshToken}`)
                      );
                      navigate("/home/dashboard");
                    }
                  },
                });
              }}
            >
              Refresh
            </Button>
          </Box>
          <Divider sx={{ pt: 2 }} />
          <Box p={1}>
            <Typography
              fontWeight="bold"
              fontSize="max(1.7rem, .9rem)"
              textTransform="capitalize"
            >
              reauthenticate
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">
              if refreshing sensitive data is not really your tea cup of coffee
              instead, try to
            </Typography>
          </Box>
          <Box pt={1}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              sx={{ boxShadow: "none", borderRadius: 2 }}
              onClick={() => {
                // if end user wish is to re-authenticated, remove expired token
                // and navigate him(her) back to login page
                window.localStorage.removeItem("TOKEN");
                navigate("/login");
              }}
            >
              reauthenticate
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RefreshToken;

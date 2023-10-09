import * as React from "react";
import { Box, Typography, FormLabel } from "@mui/material";
import { PulseLoader } from "react-spinners";
import AuthCode from "react-auth-code-input";
import grey from "@mui/material/colors/grey";
import { useMutation } from "@apollo/client";
import { size, gte, isEqual } from "lodash";
import { NavigateFunction, useNavigate } from "react-router-dom";
// internally crafted imports of resources
import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "../__generated__/graphql";
import { CHANGE_PASSWORD } from "../graphql/User.graphql";

const Verificationcode = (): JSX.Element => {
  const [result, setResult] = React.useState<string>();

  const [isvalid, setValid] = React.useState<boolean>(false);

  const handleOnChange = (res: string) => {
    setResult(res);
  };

  const navigate: NavigateFunction = useNavigate();

  const [ChangePassword, { loading }] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(CHANGE_PASSWORD);

  const userInfo: any = JSON.parse(
    `${window.localStorage.getItem("userInfo")}`
  );

  const logInHandler = React.useCallback(
    (endSize: number) => {
      // if code is correct change the user password and redirect him or her to the home page
      // for login that with the new password
      if (gte(size(result), 5) && isEqual(result, userInfo.code)) {
        setValid(false);
        ChangePassword({
          variables: {
            userEmail: userInfo.email,
            newPassword: userInfo.password,
          },
          onCompleted: (dataResponse) => {
            if (dataResponse.ChangePassword?.success) {
              navigate("/");
            }
          },
        });
      }

      // in case code sent to the user email the entered one are not relevant
      // print out a message to notify the user on the wrong code
      if (gte(size(result), 5) && !isEqual(result, userInfo.code)) {
        setValid(true);
      }
    },
    [result?.length]
  );

  React.useEffect(() => {
    logInHandler(5);
  }, [result?.length]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        pt={15}
      >
        <Box>
          <Typography
            fontWeight="bold"
            fontFamily="Courier New Monospace"
            fontSize={{ xs: "1em", sm: "1.4em", xl: "1.6em" }}
            sx={{ color: grey[900], lineHeight: (theme) => theme.spacing(3) }}
          >
            we send a verification code to your email
          </Typography>
        </Box>
        <Box pt={1}>
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              width: "300px",
              "& .phoneinput": {
                width: 36,
                height: 50,
                mx: 1,
                fontSize: "1em",
                textAlign: "center",
              },
            }}
          >
            <Box>
              <FormLabel sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: `${grey[700]}`,
                    textTransform: "capitalize",
                  }}
                >
                  enter the verification code
                </Typography>
              </FormLabel>
              <AuthCode
                inputClassName="phoneinput"
                length={5}
                allowedCharacters="numeric"
                onChange={handleOnChange}
              />
            </Box>
            {loading && (
              <Box pt={1} sx={{ alignSelf: "center" }}>
                <PulseLoader
                  color="#2196f3"
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            )}
          </Box>
        </Box>
        {isEqual(Boolean(isvalid), true) && (
          <Box pt={2}>
            <FormLabel error={isvalid}>sorry, enter a correct code</FormLabel>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Verificationcode;

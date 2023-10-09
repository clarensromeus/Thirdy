import * as React from "react";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  FormLabel,
} from "@mui/material";
import grey from "@mui/material/colors/grey";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
// internally crafted imports of resources
import { CssTextFieldShare } from "../MuiStyles/textField";
import validateNewPassword from "../validators/ForgotPasword";
import {
  SendMailMutation,
  SendMailMutationVariables,
} from "../__generated__/graphql";
import { SEND_MAIL } from "../graphql/User.graphql";
import fiveDigitCode from "../components/FiveDigitCode";

const ForgotPassword = (): JSX.Element => {
  const [visible, setVisible] = React.useState<{ showPassw: boolean }>({
    showPassw: false,
  });

  const handleShowPass = () => {
    setVisible({ showPassw: !visible.showPassw });
  };

  const [SendMail, { loading }] = useMutation<
    SendMailMutation,
    SendMailMutationVariables
  >(SEND_MAIL);

  // generating unique id for fields
  const ID = React.useId();

  const navigate: NavigateFunction = useNavigate();

  // infer type from new password validation schema
  type formData = yup.InferType<typeof validateNewPassword>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: yupResolver(validateNewPassword),
  });

  const onSubmit = async (data: formData) => {
    try {
      const useValidationCode = fiveDigitCode(10000, 99999);

      await SendMail({
        variables: {
          mail: {
            DESTINATION: data.Email,
            SUBJECT: "Confirmation code",
            HTMLBODY: `<strong>Code</strong>: TA${useValidationCode}`,
            MESSAGE: "TECH_ADMIN one kind for the whole world",
          },
          code: `${useValidationCode}`,
        },
        onCompleted: (dataResponse) => {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              password: `${data.Password}`,
              email: `${data.Email}`,
              code: `${dataResponse.SendMail.message}`,
            })
          );
          navigate("/verificationcode");
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <>
      <Box
        px={6}
        pt={15}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: 400, sm: 400, lg: 530 },
            textAlign: { xs: "start", sm: "start", lg: "center" },
          }}
        >
          <Typography
            fontWeight="bold"
            fontFamily="Courier New Monospace"
            fontSize={{ xs: "1.3em", sm: "1.5em", xl: "1.6em" }}
            sx={{ color: grey[900], lineHeight: (theme) => theme.spacing(3) }}
          >
            in order to be able to recover your password first
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box pt={2}>
            <Box display="flex" flexDirection="column" sx={{ width: "320px" }}>
              <Box>
                <FormLabel sx={{ textAlign: "start" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: `${grey[700]}`,
                      textTransform: "capitalize",
                    }}
                  >
                    enter your email
                  </Typography>
                </FormLabel>
                <Controller
                  name="Email"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <CssTextFieldShare
                      variant="outlined"
                      type="text"
                      size="small"
                      sx={{
                        "& fieldset": {
                          border: `1px solid ${grey[100]}`,
                          ":hover": {
                            border: `1px solid ${grey[100]}`,
                          },
                        },
                      }}
                      id={`${ID}_Email`}
                      name="Email"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      helperText={error ? error.message : null}
                      error={!!error}
                    />
                  )}
                />
              </Box>
              <Box pt={2}>
                <FormLabel sx={{ textAlign: "start" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: `${grey[700]}`,
                      textTransform: "capitalize",
                    }}
                  >
                    enter your new password
                  </Typography>
                </FormLabel>
                <Controller
                  name="Password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <CssTextFieldShare
                      variant="outlined"
                      type={visible.showPassw ? "text" : "password"}
                      size="small"
                      id={`${ID}_Password`}
                      name="Password"
                      sx={{
                        "& fieldset": {
                          border: `1px solid ${grey[100]}`,
                        },
                      }}
                      fullWidth
                      value={value}
                      onChange={onChange}
                      helperText={error ? error.message : null}
                      error={!!error}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              color="inherit"
                              disableRipple
                              disableElevation
                              onClick={handleShowPass}
                              sx={{
                                fontWeight: "bold",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              {visible.showPassw ? "hide" : "show"}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box pt={2}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  boxShadow: "none",
                  fontWeight: "bold",
                  bgcolor: "#0866ff",
                  borderRadius: 20,
                }}
                // onClick={handleNextField}
              >
                {loading ? (
                  <ClipLoader
                    loading={loading}
                    size={20}
                    color="white"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Next"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ForgotPassword;

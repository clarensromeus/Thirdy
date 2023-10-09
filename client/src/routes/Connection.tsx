import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import grey from "@mui/material/colors/grey";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLazyQuery, ApolloError } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { useNavigate, NavigateFunction, Navigate } from "react-router-dom";
import uniqueId from "lodash/uniqueId";
// externally crafted imports of resources
import validateConnection from "../validators/Connection";
import { USER_CONNECTION } from "../graphql/User.graphql";
import { response } from "../typings/Authentication";
import {
  ConnectionQuery,
  ConnectionQueryVariables,
} from "../__generated__/graphql";
import Alert from "../components/Alert";
import isAuthenticated from "../components/isAuthenticated";

const Connection = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [open, setOpen] = React.useState<boolean>(false);
  const isAuth: boolean = isAuthenticated();

  const [info, setInfo] = React.useState<Omit<response, "token">>({
    message: "",
    success: false,
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // close when triggering an outside click listener
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [Connection, { loading, error }] = useLazyQuery<
    ConnectionQuery,
    ConnectionQueryVariables
  >(USER_CONNECTION);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const navigate: NavigateFunction = useNavigate();
  // infer type from connection validation schema
  type formData = yup.InferType<typeof validateConnection>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: yupResolver(validateConnection),
  });

  const onSubmit = async (data: formData) => {
    try {
      if (error) return new ApolloError(error);
      await Connection({
        variables: {
          connectionInfo: { Email: data.Email, Password: data.Password },
        },
        onCompleted: (data: ConnectionQuery) => {
          // redirect to the home page if good credentials are provided
          // and store token into the browser using localstorage
          if (data.Connection.success) {
            localStorage.setItem("TOKEN", `${data.Connection.token}`);
            localStorage.setItem("MODE", JSON.stringify("light"));
            navigate("/thirdy");
          }

          setInfo({
            message: `${data.Connection.message}`,
            success: data.Connection.success,
          });
          setOpen(true);
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <>
      {isAuth ? (
        <Navigate to="/thirdy" />
      ) : (
        <Container>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            sx={{ boxShadow: "none" }}
            action={
              <React.Fragment>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fafafa" }} />
                </IconButton>
              </React.Fragment>
            }
          >
            {info.success ? (
              <Alert
                severity="success"
                onClose={handleClose}
                sx={{ width: "100%" }}
              >
                <Typography fontWeight="bold">{info.message}</Typography>
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={handleClose}
                sx={{ width: "100%" }}
              >
                <Typography fontWeight="bold">{info.message}</Typography>
              </Alert>
            )}
          </Snackbar>
          <Box sx={{ pt: 1 }}>
            <Paper
              elevation={2}
              sx={{
                display: "block",
                position: "absolute",
                left: "50%",
                width: 450,
                transform: "translate(-50%)",
              }}
            >
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                  }}
                >
                  Thirdy
                </Typography>
              </Box>
              <Box sx={{ mx: 5, pt: 3 }}>
                <Box>
                  <Typography
                    fontWeight="bold"
                    fontFamily="monospace"
                    fontSize="1.8em"
                  >
                    Welcome to Thirdy!👏
                  </Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">
                    Please get connected and start a new adventure with the
                    platform
                  </Typography>
                </Box>
                <Box my={2}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Controller
                          name="Email"
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id={uniqueId("Email")}
                              label="Email or Username"
                              value={value}
                              onChange={onChange}
                              helperText={error ? error.message : null}
                              error={!!error}
                              fullWidth
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Controller
                          name="Password"
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id={uniqueId("Password")}
                              type={showPassword ? "text" : "password"}
                              label="Password"
                              value={value}
                              helperText={error ? error.message : null}
                              error={!!error}
                              onChange={onChange}
                              fullWidth
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff
                                          sx={{ color: grey[500] }}
                                        />
                                      ) : (
                                        <Visibility sx={{ color: grey[500] }} />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ mt: -3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <FormControlLabel
                              value="end"
                              control={<Checkbox />}
                              label="Remember"
                              labelPlacement="end"
                            />
                          </Box>
                          <Box mt={1}>
                            <Link
                              to="/forgotpassword"
                              style={{
                                color: "#1976D2",
                              }}
                            >
                              Forgot password
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ fontWeight: "bold", boxShadow: "none" }}
                        >
                          {loading ? (
                            <ClipLoader
                              color="#fafafa"
                              loading={loading}
                              size={30}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "connection"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Box>
              <Box
                my={2}
                mx={5}
                sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
              >
                <Box>new on the platform?</Box>
                <Box>
                  {" "}
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#1976D2" }}
                  >
                    create new account
                  </Link>
                </Box>
              </Box>
              <Box mx={5} my={3}>
                <Divider>
                  <Typography color="text.secondary">oR</Typography>
                </Divider>
              </Box>
              <Box
                mb={3}
                sx={{ display: "flex", justifyContent: "center", gap: 1 }}
              >
                <IconButton sx={{ bgcolor: grey[100] }}>
                  <FacebookIcon sx={{ color: "blue" }} />
                </IconButton>
                <IconButton sx={{ bgcolor: grey[100] }}>
                  <GoogleIcon sx={{ color: "red" }} />
                </IconButton>
                <IconButton sx={{ bgcolor: grey[100] }}>
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Connection;

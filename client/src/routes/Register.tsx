import * as React from "react";
// internal imports of ressources
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import grey from "@mui/material/colors/grey";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import uniqueId from "lodash/uniqueId";
import { useMutation, ApolloError } from "@apollo/client";
import { useNavigate, NavigateFunction, Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// externally crafted imports of ressources
import CloseIcon from "@mui/icons-material/Close";
import validateSignUp from "../validators/SignUp";
import { USER_REGISTERATION } from "../graphql/User.graphql";
import { ISignUp, response } from "../typings/Authentication";
import Alert from "../components/Alert";
import isAuthenticated from "../components/isAuthenticated";

const Register = () => {
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
    // close when triggering an outside click listerner
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate: NavigateFunction = useNavigate();

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  // Pass mutation to useMutation
  const [SIGN_UP, { loading, error }] = useMutation(USER_REGISTERATION);

  // infer fields types from yup validation
  type FormData = yup.InferType<typeof validateSignUp>;

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Day: "",
      Month: "",
      Year: "",
      Sex: "",
      Password: "",
      PasswordConfirmation: "",
    },
    resolver: yupResolver(validateSignUp),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (error) return new ApolloError(error);

      const DOB: string = data.Day.concat(data.Month, data.Year);

      await SIGN_UP({
        variables: {
          registerInfo: {
            Firstname: data.Firstname,
            Lastname: data.Lastname,
            Password: data.Password,
            Sex: data.Sex,
            Email: data.Email,
            DOB,
          },
        },
        onCompleted: (data: ISignUp) => {
          // if user is created redirect to the dashboard page
          // and store token in the browser
          if (data.Registeration.success) {
            localStorage.setItem("TOKEN", `${data.Registeration.token}`);
            localStorage.setItem("MODE", JSON.stringify("light"));
            navigate("/thirdy");
          }
          setInfo({
            message: `${data.Registeration.message}`,
            success: data.Registeration.success,
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
        <Navigate to="/thirdy" replace />
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
          <Box pt={1}>
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
              <Box mx={5} pt={2}>
                <Box>
                  <Typography
                    fontWeight="bold"
                    fontFamily="monospace"
                    fontSize="1.8em"
                  >
                    Adventure starts here!🚀
                  </Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">
                    start your career by involving with others
                  </Typography>
                </Box>
                <Box my={3}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item container spacing={2} xs={12}>
                        <Grid item xs={6}>
                          <Controller
                            name="Firstname"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextField
                                label="Firstname"
                                value={value}
                                id={uniqueId("Firstname")}
                                onChange={onChange}
                                helperText={error ? error.message : null}
                                error={!!error}
                                fullWidth
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Controller
                            name="Lastname"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextField
                                label="Lastname"
                                id={uniqueId("Lastname")}
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
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name="Email"
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              label="Email"
                              id={uniqueId("Email")}
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
                      <Grid item container spacing={2} xs={12}>
                        <Grid item xs={4}>
                          <Controller
                            name="Day"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <FormControl fullWidth error={!!error}>
                                <InputLabel id="demo-simple-select-label">
                                  Day
                                </InputLabel>

                                <Select
                                  labelId="Day"
                                  id={uniqueId("Day")}
                                  value={value}
                                  label="Day"
                                  onChange={onChange}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                                {error && (
                                  <FormHelperText>required</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name="Month"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <FormControl fullWidth error={!!error}>
                                <InputLabel id="demo-simple-select-label">
                                  Month
                                </InputLabel>
                                <Controller
                                  name="Month"
                                  control={control}
                                  render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                  }) => (
                                    <Select
                                      labelId="Month"
                                      id={uniqueId("Month")}
                                      value={value}
                                      label="Month"
                                      onChange={onChange}
                                    >
                                      <MenuItem value="Jannuary">
                                        Jannuary
                                      </MenuItem>
                                      <MenuItem value="Febuary">
                                        Febuary
                                      </MenuItem>
                                      <MenuItem value="March">March</MenuItem>
                                      <MenuItem value="April">April</MenuItem>
                                      <MenuItem value="May">May</MenuItem>
                                      <MenuItem value="June">June</MenuItem>
                                      <MenuItem value="July">July</MenuItem>
                                    </Select>
                                  )}
                                />
                                {error && (
                                  <FormHelperText>required</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name="Year"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <FormControl fullWidth error={!!error}>
                                <InputLabel id="demo-simple-select-label">
                                  Year
                                </InputLabel>

                                <Select
                                  labelId="Year"
                                  id={uniqueId("Year")}
                                  value={value}
                                  label="Year"
                                  onChange={onChange}
                                >
                                  <MenuItem value={1995}>1995</MenuItem>
                                  <MenuItem value={1996}>1996</MenuItem>
                                  <MenuItem value={1997}>1997</MenuItem>
                                  <MenuItem value={1998}>1998</MenuItem>
                                  <MenuItem value={1999}>1999</MenuItem>
                                  <MenuItem value={2000}>2000</MenuItem>
                                </Select>
                                {error && (
                                  <FormHelperText>required</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: -2 }}>
                        <Controller
                          name="Sex"
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <FormControl
                              fullWidth
                              margin="normal"
                              error={!!error}
                            >
                              <FormLabel id={uniqueId("Gender")}>
                                Gender
                              </FormLabel>
                              <RadioGroup
                                value={value}
                                onChange={onChange}
                                sx={{ width: "100%" }}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                                <FormControlLabel
                                  value="other"
                                  control={<Radio />}
                                  label="Other"
                                />
                              </RadioGroup>
                              {error && (
                                <FormHelperText>choose your sex</FormHelperText>
                              )}
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ mt: -2 }}>
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
                              onChange={onChange}
                              helperText={error ? error.message : null}
                              error={!!error}
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
                      <Grid item xs={12}>
                        <Controller
                          name="PasswordConfirmation"
                          control={control}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <TextField
                              id={uniqueId("PasswordConfirmation")}
                              type={showPassword ? "text" : "password"}
                              value={value}
                              onChange={onChange}
                              helperText={error ? error.message : null}
                              error={!!error}
                              label="Confirm password"
                              fullWidth
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sx={{ mt: -3 }}>
                        <FormControlLabel
                          value="end"
                          control={<Checkbox />}
                          label={
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography>i agree with </Typography>
                              <Link
                                to="#"
                                style={{
                                  textDecoration: "none",
                                  color: "#1976D2",
                                }}
                              >
                                privacy and terms
                              </Link>
                            </Box>
                          }
                          labelPlacement="end"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          type="submit"
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
                            "Sign up"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Box
                    my={2}
                    mx={5}
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <Box>already have an account?</Box>
                    <Box>
                      {" "}
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#1976D2" }}
                      >
                        connected
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Register;

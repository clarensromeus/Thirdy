import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputLabel,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Lock } from "@mui/icons-material";
import blue from "@mui/material/colors/blue";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import grey from "@mui/material/colors/grey";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useQuery } from "@apollo/client";
// internally crafted imports of ressources
import Invitation from "../components/Invitation";
import { GetAllGroupsQuery } from "../__generated__/graphql";
import { GET_ALL_GROUPS } from "../graphql/Groups.graphql";

const Groups = () => {
  const [age, setAge] = React.useState("");

  const navigate: NavigateFunction = useNavigate();

  const { data, loading } = useQuery<GetAllGroupsQuery>(GET_ALL_GROUPS);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Container>
        <Box>
          <Box
            sx={{
              textAlign: "center",
              pt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography fontWeight="bold" fontSize="1.7rem" component="span">
              Create a group
            </Typography>
            <Typography color="text.secondary" component="span">
              enter below informations for group creation
            </Typography>
          </Box>
          <Box
            p={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ width: 500 }}>
              <form>
                <Box sx={{}}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="medium"
                        label="Group name"
                        placeholder="enter the group name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose privacy
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Choose Privacy"
                          onChange={handleChange}
                        >
                          <MenuItem
                            value="Public"
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <Box>
                              <IconButton
                                sx={{ bgcolor: "#E8F0FE" }}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                              >
                                <PublicIcon sx={{ color: "black" }} />
                              </IconButton>
                            </Box>
                            <Box>
                              <Typography fontWeight="bold">Public</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem
                            value="Private"
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <Box>
                              <IconButton sx={{ bgcolor: "#E8F0FE" }}>
                                <Lock sx={{ color: "black" }} />
                              </IconButton>
                            </Box>
                            <Box>
                              <Typography fontWeight="bold">Private</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Invitation />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
            <Box
              sx={{
                width: 500,
                position: "relative",
                boxSizing: "boxSizing",
                border: `1px solid ${grey[300]}`,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "4.6%",
                  zIndex: 2,
                }}
              >
                <input hidden type="file" id="change_profile" />
                <label htmlFor="change_profile">
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      boxShadow: 0,
                      ":hover": {
                        boxShadow: 0,
                      },
                    }}
                    startIcon={<CloudUploadIcon />}
                    component="span"
                  >
                    <Typography fontWeight="bold" textTransform="lowercase">
                      Select a picture
                    </Typography>
                  </Button>
                </label>
              </Box>
              <Box p={2}>
                <Box
                  sx={{
                    height: 200,
                    border: `1px solid ${grey[300]}`,
                  }}
                >
                  <img
                    width=""
                    height="inherit"
                    style={{
                      width: "466px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt="imageSample"
                    src="https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 2,
                  mb: 0.6,
                }}
              >
                <Typography fontWeight="bold" fontSize="0.9rem">
                  Group Privacy :
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.7rem"
                  color="text.secondary"
                >
                  image uploaded by the group creator won't share with anyone
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 500 }}>
              <Button fullWidth disabled variant="contained">
                create
              </Button>
            </Box>
          </Box>
          <Divider />
          {/* list of groups */}
          <Box pt={2}>
            <Typography fontWeight="bold" fontSize="1.2rem">
              Scour over all groups to follow ({data?.GetAllGroups?.length})
            </Typography>
          </Box>
          <Box
            pt={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              "& > .GroupBox": {
                width: 400,
                border: `1px solid ${grey[100]}`,
                bgcolor: "white",
                borderRadius: 4,
              },
            }}
          >
            {data?.GetAllGroups?.map((groups) => {
              const { GroupName, GroupCoverImage, Privacy, createdAt, _id } =
                groups;

              return (
                <Box className="GroupBox">
                  <Box
                    p={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      alignContent: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ border: `1px solid ${grey[300]}` }}>
                      <img
                        alt=""
                        src={`${GroupCoverImage}`}
                        style={{ width: 70, height: 80, objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography fontWeight="bold">{GroupName}</Typography>
                      <Typography color="text.secondary">
                        created on Feb 21, 2015
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    px={2}
                    pb={1.5}
                    sx={{
                      display: "flex",
                      gap: 0.8,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 0,
                        boxShadow: "none",
                        bgcolor: "#E8F0FE",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography fontWeight="bold" color="primary">
                        Leave
                      </Typography>
                    </Button>
                    <IconButton
                      onClick={(evt: React.MouseEvent) => {
                        evt.preventDefault();
                        navigate(`${GroupName.trim()}-${_id}`);
                      }}
                      sx={{ bgcolor: "#E8F0FE", borderRadius: 0 }}
                    >
                      <RemoveRedEyeIcon sx={{ color: blue[700] }} />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Groups;

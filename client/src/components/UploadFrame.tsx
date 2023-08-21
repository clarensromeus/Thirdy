import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IFrame } from "../typings/Profile";

const UploadFrame = ({ openFrame, setOpenFrame, Image }: IFrame) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          position: "absolute",
          display: openFrame ? "block" : "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: 550,
            height: 440,
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "absolute", top: 80, left: 130 }}>
              <Button
                variant="contained"
                sx={{ borderRadius: 50 }}
                startIcon={<CloudUploadIcon />}
              >
                choose a picture
              </Button>
            </Box>
            <Box>
              <Typography fontWeight="bold" fontSize="1.7rem">
                Upload your picture
              </Typography>
            </Box>
            <Box>
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() => setOpenFrame(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "inherit",
            }}
          >
            <Box>
              <img width="300" height="300" alt="profile" src={Image} />
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 20,
                  bgcolor: "black",
                  ":hover": { bgcolor: "black" },
                }}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UploadFrame;

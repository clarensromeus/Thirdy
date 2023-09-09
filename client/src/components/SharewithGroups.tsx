import * as React from "react";
import { Box } from "@mui/material";

const SharewithGroups = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          // display: open ? "block" : "none",
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
            width: 500,
            height: 440,
          }}
        >
            <Box p={3}></Box>
        </Box>
      </Box>
    </>
  );
};

export default SharewithGroups;

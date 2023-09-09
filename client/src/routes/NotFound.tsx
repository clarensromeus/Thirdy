import * as React from "react";
import { Box } from "@mui/material";
import notfound from "../Images/static/NotFound.png";

const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <img
            style={{ width: "400px", height: "380px", objectFit: "cover" }}
            src={notfound}
            alt=""
          />
        </Box>
      </Box>
    </>
  );
};

export default NotFound;

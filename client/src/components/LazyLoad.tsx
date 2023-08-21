import * as React from "react";
import Box from "@mui/material/Box";
import { CircleLoader } from "react-spinners";

const LazyLoad = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <CircleLoader
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </Box>
    </>
  );
};

export default LazyLoad;

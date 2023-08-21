import React, { Suspense } from "react";
import { Box } from "@mui/material";
// eternally crafted imports or ressources
import Pickrouters from "./PickRouters";
import LazyLoad from "./components/LazyLoad";

function App(): JSX.Element {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "rgba(232,240,254, 0.2)",
        }}
      >
        <Suspense fallback={<LazyLoad />}>
          <Pickrouters />
        </Suspense>
      </Box>
    </>
  );
}

export default App;

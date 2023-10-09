import React, { Suspense } from "react";
// external imports of resources
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { isEqual } from "lodash";
// eternally crafted imports or resources
import Pickrouters from "./PickRouters";
import LazyLoad from "./components/LazyLoad";
import { GetMode } from "./store/Selectors";

function App(): JSX.Element {
  const mode = useRecoilValue(GetMode);

  const colorMode = createTheme({
    palette: {
      mode: isEqual(mode.mode, "dark") ? "dark" : "light",
    },
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // bgcolor: "rgba(232,240,254, 0.2)",
          //  bgcolor: "#B0B3B8",
        }}
      >
        <Suspense fallback={<LazyLoad />}>
          <ThemeProvider theme={colorMode}>
            <GlobalStyles
              styles={{
                body: {
                  backgroundColor: isEqual(mode.mode, "dark")
                    ? "black"
                    : "rgba(232,240,254, 0.2)",
                },
              }}
            />
            <Pickrouters />
          </ThemeProvider>
        </Suspense>
      </Box>
    </>
  );
}

export default App;

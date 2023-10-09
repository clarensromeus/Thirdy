import * as React from "react";
import { Box, Typography } from "@mui/material";
import { sample, isEqual } from "lodash";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import GC from "../Images/static/Googlecompany.jpeg";
import MC from "../Images/static/ModernCar wraps.jpeg";
import SBJ from "../Images/static/SolidBabyJuice.png";
import CCM from "../Images/static/coca-colamarketing.jpeg";
import VFC from "../Images/static/VeganfriedChicken.jpeg";
import ISponsor from "../typings/Sponsors";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";

const SponsorData: ISponsor[] = [
  {
    ProductImage: GC,
    ProductTitle: "Google Company",
    ProductTip: "we offer % discount this year",
  },
  {
    ProductImage: MC,
    ProductTitle: "Modern Car Wraps",
    ProductTip: "pushing the world forward",
  },
  {
    ProductImage: SBJ,
    ProductTitle: "Solid Baby Juice",
    ProductTip: "good for children's help",
  },
  {
    ProductImage: CCM,
    ProductTitle: "Coco-Cola Marketing",
    ProductTip: "Empower yourself with good quality product",
  },
  {
    ProductImage: VFC,
    ProductTitle: "Vegan Friend Chicken",
    ProductTip: "Fast and yucky chewing",
  },
];

const Sponsors = () => {
  const randomSample = sample(SponsorData);
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  return (
    <>
      <Box p={1.4} sx={{ width: "inherit" }}>
        <Box>
          <Typography fontWeight="bold" color="text.secondary">
            Recent sponsors
          </Typography>
        </Box>
        <Box
          pt={2}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Box sx={{}}>
            <img
              alt=""
              src={`${randomSample?.ProductImage}`}
              style={{
                width: 100,
                height: 130,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          </Box>
          <Box
            pt={2}
            sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}
          >
            <Typography
              fontWeight="570"
              fontSize="17px"
              sx={{ color: isEqual(mode.mode, "light") ? "black" : "white" }}
            >
              {randomSample?.ProductTitle}
            </Typography>
            <Typography fontSize="15px" color="text.secondary">
              {randomSample?.ProductTip}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sponsors;

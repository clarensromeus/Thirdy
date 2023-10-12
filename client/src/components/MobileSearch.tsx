import * as React from "react";
import { Box, IconButton, Popover } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import isEqual from "lodash/isEqual";
// internally crafted imports of resources
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import PopOverSearch from "./PopOverSearch";
import { IpopOver } from "../typings/Home";

const MobileSearch = () => {
  const modeContextData = React.useContext(modeContext);
  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const [anchorElSearch, setAnchorElSearch] = React.useState<any | null>(null);

  const handleClickListener = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSearch(event.currentTarget);
  };

  const popoverProps: IpopOver = {
    anchorElSearch,
    setAnchorElSearch,
  };

  return (
    <>
      {" "}
      <IconButton
        onClick={handleClickListener}
        sx={{
          pl: 1,
          bgcolor: isEqual(mode.mode, "light")
            ? "#E8F0FE"
            : "rgba(255,255, 255, 0.2)",
        }}
      >
        <SearchIcon
          sx={{
            color: isEqual(mode.mode, "light") ? "black" : grey[100],
          }}
        />
      </IconButton>
      <PopOverSearch {...popoverProps} />
    </>
  );
};

export default MobileSearch;

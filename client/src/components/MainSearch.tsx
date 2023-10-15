import * as React from "react";
import { isEqual } from "lodash";
import grey from "@mui/material/colors/grey";
import { useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import __ from "lodash";
// internally crafted imports of resources
import modeContext from "../store/ModeContext";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../MuiStyles/Search";
import { IMode } from "../typings/GlobalState";
import Context from "../store/ContextApi";
import PopOverSearch from "./PopOverSearch";
import { IpopOver } from "../typings/Home";

const SearchBar = (): JSX.Element => {
  const modeContextData = React.useContext(modeContext);

  const [anchorElSearch, setAnchorElSearch] = React.useState<any | null>(null);
  const [search, setSearch] = React.useState<string>("");

  const handleFocus = (event: any) => {
    setAnchorElSearch(event.currentTarget);
  };

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setSearch(target.value);
  };

  const debounceSearchResult = React.useMemo(() => {
    return __.debounce(handleChangeEvent, 1000);
  }, [search]);

  const popoverProps: IpopOver = {
    anchorElSearch,
    setAnchorElSearch,
    search,
  };

  React.useEffect(() => {
    return () => {
      // cleanup debounce for re-rendering prevention
      debounceSearchResult.cancel();
    };
  }, []);

  return (
    <>
      <Search
        sx={{
          bgcolor: isEqual(mode.mode, "light")
            ? "#E8F0FE"
            : "rgba(255, 255, 255, 0.2)",
          ":hover": {
            bgcolor: isEqual(mode.mode, "light")
              ? "#E8F0FE"
              : "rgba(255, 255, 255, 0.2)",
          },
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon sx={{ color: grey[500] }} />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{
            input: {
              color: isEqual(mode.mode, "dark") ? grey[200] : "",
            },
          }}
          type="text"
          placeholder="Search…"
          // value={search}
          inputProps={{ "aria-label": "search" }}
          onFocus={handleFocus}
          onChange={debounceSearchResult}
        />
      </Search>
      <PopOverSearch {...popoverProps} />
    </>
  );
};

export default SearchBar;

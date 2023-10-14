import * as React from "react";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, NavigateFunction } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import Icon from "@mui/material/Icon";
import AddIcon from "@mui/icons-material/Add";
import { loadCSS } from "fg-loadcss";

const BottomMobileNavigation = () => {
  const [value, setValue] = React.useState<number>(0);

  const navigate: NavigateFunction = useNavigate();

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css"
      // Inject before JSS
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar + 100,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{}}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Groups"
            icon={<GroupsIcon onClick={() => navigate("groups")} />}
          />

          <BottomNavigationAction
            label="Add Status"
            icon={<AddIcon />}
            onClick={() => navigate("status")}
          />
          <BottomNavigationAction
            onClick={() => navigate("chat")}
            label="Chat"
            icon={
              <Icon
                baseClassName="fas"
                className="fa-solid fa-comment"
                fontSize="small"
              />
            }
          />
          <BottomNavigationAction
            label="Friends"
            onClick={() => navigate("friends")}
            icon={<PeopleIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomMobileNavigation;

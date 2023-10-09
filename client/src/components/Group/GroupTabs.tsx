import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { isEqual } from "lodash";
import TabPanel from "@mui/lab/TabPanel";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import GroupPosts from "./GroupPosts";
import GroupPrivacy from "./GroupPrivacy";
import GroupChat from "./GroupChat";
import GroupPeople from "./GroupPeople";
import modeContext from "../../store/ModeContext";
import { IMode } from "../../typings/GlobalState";

export default function GroupTabs() {
  const modeContextData = React.useContext(modeContext);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  return (
    <Box
      sx={{
        typography: "body1",
        bgcolor: isEqual(mode.mode, "light") ? "white" : "dark",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Posts"
              sx={{ fontSize: "16px", textTransform: "capitalize" }}
              value="1"
            />
            <Tab
              label="Chat"
              sx={{ fontSize: "16px", textTransform: "capitalize" }}
              value="2"
            />
            <Tab
              label="People"
              sx={{ fontSize: "16px", textTransform: "capitalize" }}
              value="3"
            />
            <Tab
              label="Privacy"
              sx={{ fontSize: "16px", textTransform: "capitalize" }}
              value="4"
            />
          </TabList>
        </Box>
        <TabPanel
          sx={{
            px: 0,
            mx: 0,
            bgcolor: isEqual(mode.mode, "light")
              ? "rgba(232,240,254, 0.2)"
              : "dark",
          }}
          value="1"
        >
          <GroupPosts />
        </TabPanel>
        <TabPanel value="2" sx={{ mb: 0, pb: 0 }}>
          <GroupChat />
        </TabPanel>
        <TabPanel value="3">
          <GroupPeople />
        </TabPanel>
        <TabPanel value="4">
          <GroupPrivacy />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

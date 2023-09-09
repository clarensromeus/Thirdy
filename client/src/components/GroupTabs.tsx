import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GroupPosts from "./GroupPosts";

export default function GroupTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ typography: "body1", bgcolor: "white" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Chat" value="2" />
            <Tab label="People" value="3" />
          </TabList>
        </Box>
        <TabPanel
          sx={{ px: 0, mx: 0, bgcolor: "rgba(232,240,254, 0.2)" }}
          value="1"
        >
          <GroupPosts />
        </TabPanel>
        <TabPanel value="2">Chat</TabPanel>
        <TabPanel value="3">People</TabPanel>
      </TabContext>
    </Box>
  );
}

import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { isEqual } from "lodash";
import grey from "@mui/material/colors/grey";
// internally crafted imports of resources
import {
  GroupInfoQuery,
  GroupInfoQueryVariables,
} from "../__generated__/graphql";
import { GROUP_INFO } from "../graphql/Groups.graphql";
import handshake from "../Images/static/handshake.png";
import GroupTabs from "../components/Group/GroupTabs";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";

const GroupRating = () => {
  let { groupname } = useParams<{ groupname: string }>();
  const modeContextData = React.useContext(modeContext);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  const { data } = useQuery<GroupInfoQuery, GroupInfoQueryVariables>(
    GROUP_INFO,
    {
      variables: {
        groupId: `${groupname?.split("-")[1]}`,
        groupName: `${groupname?.split("-")[0]}`,
      },
    }
  );

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)" }}>
        <Box
          sx={{
            width: "100%",
            height: "40%",
            backgroundImage:
              "url(https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundClip: "content-box",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              top: "18.8%",
              zIndex: 4,
              mr: "auto",
              ml: "auto",
              width: 500,
              height: "81%",
              backgroundImage: `url(${data?.GroupInfo?.GroupCoverImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundClip: "content-box",
            }}
          >
            <Box
              sx={{
                position: "relative",
                top: 0,
                mr: "auto",
                ml: "auto",
                width: 300,
                bgcolor: isEqual(mode.mode, "") ? "white" : "dark",
              }}
            >
              <img
                alt="handshake"
                src={handshake}
                style={{ width: 300, height: 120, objectFit: "cover" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          pt={3}
          px={3}
          sx={{ bgcolor: isEqual(mode.mode, "light") ? "white" : "dark" }}
        >
          <Box pb={2}>
            <Typography
              fontWeight="600"
              fontSize="25px"
              color={isEqual(mode.mode, "light") ? "black" : grey[100]}
            >
              {groupname?.split("-")[0]}
            </Typography>
          </Box>
          <Divider />
        </Box>
        <Box pt={2} px={3}>
          <GroupTabs />
        </Box>
      </Box>
    </>
  );
};

export default GroupRating;

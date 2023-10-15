import * as React from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import blue from "@mui/material/colors/blue";
import { filter, map, property } from "lodash";
import { useQuery } from "@apollo/client";
// internally crafted imports of resources
import {
  GetUserStatusQuery,
  GetUserStatusQueryVariables,
} from "../__generated__/graphql";
import { GET_USER_STATUS } from "../graphql/Status.graphql";
import {
  AllFriendsQuery,
  AllFriendsQueryVariables,
} from "../__generated__/graphql";
import { ALL_FRIENDS } from "../graphql/Friends.graphql";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { IFriend } from "../typings/Friends";
import friendShip from "../Images/static/friendShip.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.css";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

export default function StatusSwiper() {
  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [open, setOpen] = React.useState(false);

  /*  const { data, loading } = useQuery<
    GetUserStatusQuery,
    GetUserStatusQueryVariables
  >(GET_USER_STATUS, {
    variables: { getUserStatusUserId: `${AuthInfo.Data?._id}` },
  }); */

  const { data: userFriends } = useQuery<
    AllFriendsQuery,
    AllFriendsQueryVariables
  >(ALL_FRIENDS, { variables: { FriendId: `${AuthInfo.Data?._id}` } });

  // get friends info whether the active user sent the friend request
  const sentFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.RequestId === `${AuthInfo.Data?._id}`;
  });

  // get user info whether the active acceptedId is the friend request
  const receivedFriends = filter(userFriends?.AllFriends, function (friends) {
    return friends.AcceptedId === `${AuthInfo.Data?._id}`;
  });

  // merge sent and received friend requests
  const allFriends = [
    ...map(receivedFriends, property("User")),
    ...map(sentFriends, property("Receiver")),
  ] as IFriend<string>[];

  return (
    <>
      {allFriends.length <= 3 ? (
        <Box>
          <Box sx={{ height: 160, width: "100%" }}>
            <img
              alt=""
              src={friendShip}
              style={{
                width: "inherit",
                height: "inherit",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", py: 1.4 }}>
            <Box>
              <Typography fontWeight="bold" fontSize="19px">
                you need at least 5 friends for status displaying
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          navigation
          pagination={{ el: ".swiper_pagination", clickable: true }}
          onSlideChange={({ slidePrev }) => console.log(slidePrev)}
        >
          {allFriends.map((v, ind) => {
            return (
              <SwiperSlide key={ind}>
                {({ isActive, isPrev, isNext }) => {
                  return (
                    <Box
                      sx={{
                        alignItems: "center",
                        height: 200,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          height: "100%",
                          zIndex: 10,
                          pl: 0.6,
                          pt: 2,
                        }}
                      >
                        <Box
                          sx={{
                            border: `3px solid ${blue[800]}`,
                            borderRadius: 100,
                          }}
                        >
                          <IconButton
                            sx={{ m: 0, p: 0 }}
                            onClick={() => setOpen(true)}
                          >
                            <Avatar
                              alt=""
                              src={v.Image}
                              sx={{ width: 35, height: 35 }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box>
                        <img
                          alt=""
                          src={v.Image}
                          width="110"
                          height="180"
                          style={{
                            objectFit: "cover",
                            borderRadius: "15px",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                }}
              </SwiperSlide>
            );
          })}

          <div
            className="swiper_pagination"
            style={{ textAlign: "center" }}
          ></div>
        </Swiper>
      )}
    </>
  );
}

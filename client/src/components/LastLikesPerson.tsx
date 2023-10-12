import * as React from "react";
import { gte, get, isEqual, isUndefined } from "lodash";
import blue from "@mui/material/colors/blue";
import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
// internally crafted imports of resources
import { ILike } from "../typings/Post";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";

const fakeRandomNumber = Math.floor(Math.random() * 9);

const LastLikesPerson = ({ likes }: { likes: ILike }): JSX.Element => {
  // grab the first person who likes your post
  const firstPerson = get(likes, `Likes[0]`);
  // grab the second recent person who likes your post
  const secondPerson = get(likes, `Likes[${likes.Likes.length - 2}]`);
  // grab the last person who likes your post
  const thirdPerson = get(likes, `Likes[${likes.Likes.length - 1}]`);

  const contextData = React.useContext(Context);
  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  return (
    <>
      {isEqual(likes.Likes.length, 2) ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography component="span" style={{ color: blue[600] }}>
              {likes.Likes.length}.{fakeRandomNumber}k{" "}
            </Typography>
            <span>people,</span>
          </Box>
          <Box>
            <span style={{ fontWeight: "bold" }}>
              {secondPerson.User?._id === `${AuthInfo.Data?._id}`
                ? "you"
                : secondPerson.User?.Firstname}
            </span>{" "}
            and
            <span style={{ fontWeight: "bold" }}>
              {thirdPerson.User?._id === `${AuthInfo.Data?._id}`
                ? "you"
                : thirdPerson.User?.Firstname}
            </span>{" "}
            like the post
          </Box>
        </Box>
      ) : gte(likes.Likes.length, 3) ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography component="span" style={{ color: blue[600] }}>
              {likes.Likes.length}.{fakeRandomNumber}k{" "}
            </Typography>
            <span>people,</span>
          </Box>
          <Box>
            <span style={{ fontWeight: "bold" }}>
              {secondPerson.User?._id ? "you" : secondPerson.User?.Firstname}
            </span>{" "}
            and
            <span style={{ fontWeight: "bold" }}>
              {thirdPerson.User?._id === `${AuthInfo.Data?._id}`
                ? "you".padStart(1, " ")
                : thirdPerson.User?.Lastname}
            </span>{" "}
            and {likes.Likes.length - 2} like the post
          </Box>
        </Box>
      ) : isUndefined(likes.Likes) || likes.Likes.length === 0 ? (
        <Box>
          <Typography fontSize="17px" color="text.secondary">
            Be the first to like
          </Typography>
        </Box>
      ) : likes.Likes.length === 1 ? (
        <Box>
          <span style={{ fontWeight: "bold" }}>
            {firstPerson.User?._id === `${AuthInfo.Data?._id}`
              ? "you"
              : firstPerson.User?.Lastname}
          </span>{" "}
          like the post
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default LastLikesPerson;

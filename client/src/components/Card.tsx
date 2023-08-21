import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import blue from "@mui/material/colors/blue";
// externally crafted imports of ressources
import { CssTextField } from "./MuiStyles";
import { StyledBadgeComment } from "./MuiStyles";

export default function CardPost() {
  return (
    <Card sx={{ maxWidth: 500, borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YlCxqUS6gW6xlylEtAdBDMJLurWXT6GEHA&usqp=CAU"
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={<Typography fontWeight="bold">Jhon robenson</Typography>}
        subheader="September 14, 2016"
      />
      <CardContent sx={{ py: 0, my: 0 }}>
        <Typography>
          once a winner always a winner, if you love something that thing makes
          you heart throbs so loud, you feel inspired by it every single day in
          your life, delve head into it
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ objectFit: "cover", pt: 1 }}
        image="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        alt="Paella dish"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, width: 450 }}>
          <Box>
            <StyledBadgeComment
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                /* onClick={() =>
                 // navigate(`profile/${TokenInfo.PersonStatus}/${TokenInfo._id}`)
                } */
                alt="Profile"
                src="https://cutewallpaper.org/21/handsome-boy-picture/Wow..-Very-handsome-in-2019-Stylish-boys-Handsome-boys-.jpg"
              />
            </StyledBadgeComment>
          </Box>
          <Box sx={{ width: "inherit" }}>
            <CssTextField
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Write short comment..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon sx={{ color: blue[300] }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box>
            <Avatar
              alt=""
              src="https://image.shutterstock.com/image-photo/portrait-happy-mid-adult-man-260nw-1812937819.jpg"
            />
          </Box>
          <Box
            p={2}
            sx={{
              maxWidth: 200,
              wordBreak: "break-word",
              bgcolor: "#E8F0FE",
              borderRadius: 7,
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="bold">
                good i really love the you do it bro and next time i wish i have
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", ml: 1 }}>
        <Box>
          <Typography component="span" style={{ color: blue[600] }}>
            8.3k
          </Typography>{" "}
          <span>people,</span>
        </Box>
        <Box>
          <span style={{ fontWeight: "bold" }}>you </span> and
          <span style={{ fontWeight: "bold" }}> jhonny</span> likes your post
        </Box>
      </Box>
      <Divider />
      <CardActions
        sx={{
          width: "inherit",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            ":hover": { bgcolor: "#E8F0FE" },
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            disableFocusRipple
            disableRipple
            aria-label="add to favorites"
          >
            <ThumbUpOffAltIcon />
          </IconButton>
          <span>8.3k</span>
        </Box>
        <Box
          sx={{
            ":hover": { bgcolor: "#E8F0FE" },
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton disableFocusRipple disableRipple aria-label="share">
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
          <span>12k</span>
        </Box>
        <Box
          sx={{
            ":hover": { bgcolor: "#E8F0FE" },
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton disableFocusRipple disableRipple>
            <ReplyAllIcon />
          </IconButton>
          <span>980</span>
        </Box>
      </CardActions>
      <Divider />
    </Card>
  );
}

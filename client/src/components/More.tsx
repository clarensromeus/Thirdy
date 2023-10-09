import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { useMutation } from "@apollo/client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ClipLoader } from "react-spinners";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import Typography from "@mui/material/Typography";
// internally crafted import of resources
import {
  DeletePostMutation,
  DeletePostMutationVariables,
} from "../__generated__/graphql";
import { DELETE_POST, Get_All_Post } from "../graphql/Posts.graphql";
import EditFrame from "./Post/EditFrame";
import { EditFrameProps } from "../typings/Post";
import Context from "../store/ContextApi";
import { IAuthState } from "../typings/GlobalState";
import { ImoreActionProps } from "../typings/Post";

export default function MoreAction({
  id,
  PostId,
  PostImage,
  PostTitle,
}: ImoreActionProps<string>) {
  const contextData = React.useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const AuthInfo = useRecoilValue<Partial<IAuthState>>(contextData.GetAuthInfo);

  const [openFrame, setOpenFrame] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete post mutation
  const [DeletePost, { loading }] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(DELETE_POST);

  const editFrameData: EditFrameProps = {
    open: openFrame,
    setOpen: setOpenFrame,
    user: {
      userId: `${AuthInfo.Data?._id}`,
      firstname: `${AuthInfo.Data?.Firstname}`,
      lastname: `${AuthInfo.Data?.Lastname}`,
      Email: `${AuthInfo.Data?.Email}`,
      Image: `${AuthInfo.Data?.Image}`,
    },
    postInfo: {
      id,
      PostId,
      PostImage,
      PostTitle,
    },
  };

  return (
    <>
      <EditFrame {...editFrameData} />
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            DeletePost({
              variables: { deletePostPostId: "" },
              refetchQueries: [Get_All_Post],
            });
          }}
        >
          {loading ? (
            <ClipLoader
              loading={loading}
              size={16}
              color="black"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: 2,
              }}
            >
              <DeleteIcon />
              <Typography>Delete</Typography>
            </Box>
          )}
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: 2,
          }}
          onClick={() => {
            setOpenFrame(true);
            handleClose();
          }}
        >
          <EditIcon />
          <Typography>Edit</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

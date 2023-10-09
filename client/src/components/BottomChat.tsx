import * as React from "react";
import { IconButton, Box } from "@mui/material";
import { Collections, EmojiEmotions, Send } from "@mui/icons-material";
import { CssTextFieldShare } from "../MuiStyles/textField";
import blue from "@mui/material/colors/blue";
import { isEqual } from "lodash";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IBottomChatProps } from "../typings/Chat";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
// internally crafted imports of resources
import uploadFile from "./Upload";
import { ISendImage } from "../typings/Chat";
import { IUpload } from "../typings/Profile";
import SendImageFrame from "./SendImageFrame";
import { onInputClick } from "./eventHandler";
import modeContext from "../store/ModeContext";
import { IMode } from "../typings/GlobalState";
import { useRecoilValue } from "recoil";

const BottomChat = ({
  handleChange,
  userId,
  setText,
  text,
}: IBottomChatProps) => {
  const modeContextData = React.useContext(modeContext);
  const [image, setImage] = React.useState<File | undefined>();
  const [state, setState] = React.useState<string>("none");

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);

  const mode = useRecoilValue<IMode>(modeContextData.GetMode);

  // function to upload image
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validity = e.target.validity;
    const selectedFile = e.target.files as FileList;

    if (validity && validity.valid) {
      const FileData = uploadFile({
        FileInfo: { file: selectedFile, valid: validity.valid },
      }) satisfies IUpload;

      setValid(Boolean(FileData?.valid));
      setImage(FileData?.ImageInfo?.singleFile);
      setPreviewImage(`${FileData?.ImageInfo?.previewImage}`);
    }
  };

  const [showPicker, setShowPicker] = React.useState<boolean>(false);

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setText((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  const sendImageData: ISendImage = {
    state,
    setState,
    Info: {
      from: userId,
    },
    ImageInfo: {
      IsValid: isValid,
      setValid,
      Image: image,
      PreviewImage: previewImage,
    },
  };

  const handleClickAway = () => {
    setShowPicker((old) => !old);
  };

  return (
    <React.Fragment>
      <SendImageFrame {...sendImageData} />
      <Box
        sx={{
          position: "relative",
          width: "71%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
          <IconButton
            disableRipple
            disableFocusRipple
            disableTouchRipple
            component="label"
          >
            <Collections sx={{ color: blue[700] }} />
            <input
              hidden
              accept="/*"
              type="file"
              onChange={upload}
              onClick={onInputClick}
            />
          </IconButton>
          <IconButton onClick={() => setShowPicker((val) => !val)}>
            <EmojiEmotions sx={{ color: blue[700] }} />
          </IconButton>

          <CssTextFieldShare
            size="small"
            value={text}
            fullWidth
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiOutlinedInput-root": {
                bgcolor: isEqual(mode.mode, "light")
                  ? "#E8F0FE"
                  : "rgba(255, 255, 255, 0.2)",
                borderRadius: 50,
                border: "none",
              },
            }}
            placeholder="write a message..."
            onChange={handleChange}
          />
          <IconButton type="submit">
            <Send sx={{ color: blue[700] }} />
          </IconButton>
        </Box>

        <Box>
          <Box
            sx={{
              position: "absolute",
              top: "-1000%",
              left: "4%",
            }}
          >
            {showPicker && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <EmojiPicker
                  height={380}
                  width={400}
                  autoFocusSearch={false}
                  onEmojiClick={onEmojiClick}
                />
              </ClickAwayListener>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BottomChat;

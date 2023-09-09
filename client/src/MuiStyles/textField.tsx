import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import grey from "@mui/material/colors/grey";
import { TextField } from "@mui/material";

const CssTextField = styled(InputBase)(({ theme }) => ({
  color: `${grey[900]}`,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const TextFieldWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 40,
  backgroundColor: "#E8F0FE",
  "&:hover": {
    backgroundColor: "#E8F0FE",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const CssTextFieldShare = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#E8F0FE",
    borderRadius: 50,
    border: "none",
    "&.Mui-focused fieldset": {
      border: "none",
      borderRadius: 50,
    },
  },
});

export { TextFieldWrapper, CssTextField, CssTextFieldShare };

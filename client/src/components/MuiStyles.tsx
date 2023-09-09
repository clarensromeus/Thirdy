import { styled } from "@mui/material/styles";
import { Badge, TextField } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeComment = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const CssTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#E8F0FE",
    borderRadius: 20,
    "& fieldset": {
      borderColor: "#E8F0FE",
    },
    "&:hover fieldset": {
      borderColor: "#E8F0FE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E8F0FE",
      border: "none",
    },
  },
});

const RetweetTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#E8F0FE",
    borderRadius: 20,
    "& fieldset": {
      borderColor: "#E8F0FE",
    },
    "&:hover fieldset": {
      borderColor: "#E8F0FE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E8F0FE",
      border: "none",
    },
  },
});

export { CssTextField, StyledBadge, StyledBadgeComment, RetweetTextField };

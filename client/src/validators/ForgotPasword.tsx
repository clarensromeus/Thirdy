import { string, object } from "yup";

const validateNewPassword = object().shape({
  Email: string()
    .required("email is required")
    .matches(/^\b[\w-.]+@([\w-]+\.)+[\w-]{2,4}\b$/g, "enter a valid email")
    .trim(),
  Password: string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "enter a valid and strong password"
    )
    .required("password must not be empty")
    .min(10, "password is too short")
    .max(30, "password is too long"),
});

export default validateNewPassword;

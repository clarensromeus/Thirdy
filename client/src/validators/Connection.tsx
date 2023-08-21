import * as yup from "yup";

const validateConnection = yup.object().shape({
  Email: yup
    .string()
    .required("email is required")
    .matches(/^\b[\w-.]+@([\w-]+\.)+[\w-]{2,4}\b$/g, "enter a valid email")
    .trim(),
  Password: yup
    .string()
    .required("password must not be empty")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "enter a valid and strong password"
    )
    .min(10, "password is too short"),
});

export default validateConnection;

import { string, object, ref } from "yup";

const validateSignUp = object().shape({
  Firstname: string()
    .required("Firstname must not be empty")
    .min(5, "Firstname is too short")
    .trim(),
  Lastname: string()
    .required("Lastname must not be empty")
    .min(5, "Lastname is too short")
    .trim(),
  Email: string()
    .required("email is required")
    .matches(/^\b[\w-.]+@([\w-]+\.)+[\w-]{2,4}\b$/g, "enter a valid email")
    .trim(),
  Day: string().required("required"),
  Month: string().required("required"),
  Year: string().required("required"),
  Sex: string().required("check a gender"),
  Password: string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "enter a valid and strong password"
    )
    .required("password must not be empty")
    .min(10, "password is too short")
    .max(30, "password is too long"),
  PasswordConfirmation: string()
    .required("password do not match")
    .oneOf([ref("Password")], "password do not match")
    .trim(),
});

export default validateSignUp;

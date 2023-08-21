import { z } from "zod";

const RegisterSchema = z.object({
  Firstname: z
    .string({
      required_error: "Firstname must not be empty",
      invalid_type_error: "Firstname must be only string",
    })
    .toUpperCase()
    .trim(),
  Lastname: z
    .string({
      required_error: "Lastname must not be empty",
      invalid_type_error: "Lastname must be only string",
    })
    .toUpperCase()
    .trim(),
  Password: z
    .string({
      required_error: "Password must not be empty",
    })
    .regex(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain letters, digits, special characters and at least one capital letter "
    ),
  Email: z
    .string({
      required_error: "Email must not be empty",
    })
    .email({ message: "email is incorrect" }),
  Image: z.string().url().trim().optional(),
  Bio: z.string().optional(),
  Sex: z
    .string({
      required_error: "choose a sex",
      invalid_type_error: "sex must be only string",
    })
    .toLowerCase()
    .trim(),
  DOB: z
    .string({
      required_error: "enter your date of birth",
    })
    .toLowerCase(),
});

export default RegisterSchema;

// Registeration schema form using Zod library

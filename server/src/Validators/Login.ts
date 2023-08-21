import { z } from "zod";

const LoginSchemaWithUsername = z
  .object({
    Username: z.string({
      required_error: "username must not be empty",
      invalid_type_error: "username must be a string",
    }),
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain letters, digits, special characters and at least one capital letter "
      ),
  })
  .required();

const LoginSchemaWithEmail = z
  .object({
    Email: z
      .string({
        required_error: "Email must not be empty",
      })
      .email({ message: "please enter a valid email" }),
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain letters, digits, special characters and at least one capital letter "
      ),
  })
  .required();

export { LoginSchemaWithUsername, LoginSchemaWithEmail };

// login schema form using Zod library

import { z } from "zod";



export const baseValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(4, { message: "Must be 4 or more characters long" }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(4, { message: "Must be 4 or more characters long" }),

  password_confirmation: z
    .string({
      invalid_type_error: "Password confirmation must be a string",
      required_error: "Password confirmation is required",
    })
    .min(4, { message: "Must be 4 or more characters long" }),
});


export const validation = baseValidation.refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "The two passwords don't match",
    path: ["password_confirmation"], 
  }
);

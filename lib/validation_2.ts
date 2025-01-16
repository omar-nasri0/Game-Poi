import z from 'zod'
export const validation = z.object({
 
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })})
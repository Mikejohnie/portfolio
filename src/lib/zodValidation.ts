import z from "zod";

//register a user
export const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),

    role: z.enum(["USER", "ADMIN"]),

    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter and one number.",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

//login a user
export const loggedInUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 4 characters.",
  }),
});

export type loggedInUserSchemaType = z.infer<typeof loggedInUserSchema>;

//update user schema
export const updateUserSchema = z
  .object({
    name: z
      .string({ message: "name must be a string." })
      .min(2, { message: "name must be at least 2 characters." })
      .optional(),

    profileImage: z.string().optional(),

    username: z
      .string({ message: "Username must be a string." })
      .min(2, { message: "Username must be at least 2 characters." })
      .optional(),

    userAddress: z.string({ message: "address must be valid." }).optional(),

    email: z
      .string({ message: "Email must be valid." })
      .email({ message: "Invalid email address." })
      .optional(),

    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." })
      .or(z.literal("")) // ← allow empty string
      .optional(),

    confirmPassword: z.string().or(z.literal("")).optional(),
  })
  .refine(
    (data) => {
      // If no password typed → skip validation
      if (!data.password || data.password.trim() === "") return true;

      // Password typed → confirmPassword must match
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;

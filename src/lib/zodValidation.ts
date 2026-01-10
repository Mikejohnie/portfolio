import z from "zod";

//for images and files
export const fileSchema = z
  .object({
    url: z.string().url(),
    key: z.string(),
  })
  .optional();

//register a user
export const userSchema = z
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

export type UserSchemaType = z.infer<typeof userSchema>;

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

    profileImage: fileSchema,
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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const techStackInputSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

//create projects
export const projectImageSchema = z.object({
  url: z.string().url(),
  key: z.string(),
  isCover: z.boolean(),
  alt: z.string().min(1).optional(),
  order: z.number().int().min(0),
});

export const createProjectSchema = z.object({
  name: z.string().min(3),
  role: z.string(),
  summary: z.string().min(10),
  description: z.string().optional(),

  techStack: z.array(techStackInputSchema).min(1),

  images: z
    .array(projectImageSchema)
    .min(1)
    .refine(
      (imgs) => imgs.filter((i) => i.isCover).length === 1,
      "Exactly one image must be marked as cover"
    ),

  keyFeatures: z.string().min(1),

  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  isFlagship: z.boolean(),
  featured: z.boolean(),
  published: z.boolean(),
});

export type createProjectSchemaType = z.infer<typeof createProjectSchema>;

//update projects
export const updateProjectSchema = createProjectSchema.extend({});

export type UpdateProjectSchemaType = z.infer<typeof updateProjectSchema>;

//about
export const skillSchema = z.object({
  name: z.string().min(1),
});

export const experienceItemSchema = z.object({
  year: z.string().min(2),
  title: z.string().min(2),
  context: z.string().optional(),
  description: z.string().min(10),
});

const currentYear = new Date().getFullYear();

export const aboutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  headline: z.string().min(2),
  subHeadline: z.string().min(2),
  shortBio: z.string().min(5),
  longBio: z.string().min(1),

  portfolioStartYear: z
    .number()
    .int("Must be an integer")
    .min(1900, "Year must be >= 1900")
    .max(currentYear, `Year cannot be after ${currentYear}`),

  experience: z.array(experienceItemSchema),

  skills: z.array(skillSchema),

  profileImage: fileSchema,
  heroImage: fileSchema,
  resume: fileSchema,
});

export type AboutSchemaType = z.infer<typeof aboutSchema>;

const optionalUrl = z
  .string()
  .trim()
  .or(z.literal(""))
  .transform((val) => {
    if (val === "") return "";

    if (val.startsWith("http://") || val.startsWith("https://")) {
      return val;
    }

    return `https://${val}`;
  })
  .refine((val) => val === "" || /^https?:\/\/.+\..+/.test(val), "Invalid URL");

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5),
  location: z.string().min(2),

  github: optionalUrl,
  linkedin: optionalUrl,
  twitter: optionalUrl,
  website: optionalUrl,

  openToRelocation: z.boolean(),
  availableForWork: z.boolean(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),

  email: z.string().email("Please enter a valid email address"),

  subject: z.string().min(2).max(100).optional().or(z.literal("")),

  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(2000),
});

export type ContactMessageSchemaType = z.infer<typeof contactMessageSchema>;

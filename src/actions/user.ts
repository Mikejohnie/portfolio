"use server";

import { prisma } from "@/lib/prisma";
import {
  loggedInUserSchema,
  loggedInUserSchemaType,
  registerSchemaType,
  registerSchema,
} from "@/lib/zodValidation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/components/helper/data";
import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";
import { ADMIN_LOGIN_REDIRECT } from "@/routes";

export const createUser = async (values: registerSchemaType) => {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid user data",
      };
    }

    const { email, username, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return {
        error: "This email already exist! please login.",
      };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { success: "New user created!" };
  } catch (error) {
    console.error("error creating user", error);
  }
};

export const loggedInUser = async (values: loggedInUserSchemaType) => {
  const validatedFields = loggedInUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid user data",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password)
    return {
      error: "Invalid credentials",
    };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: ADMIN_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return {
            error: "An unknown error occured during sign-in, please try again!",
          };
      }
    }
  }

  //if all checks proceed with user login
};

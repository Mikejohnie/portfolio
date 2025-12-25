import { UserRole } from "@/generated/prisma/client";

export type UserDTO = {
  id: string;
  email: string;
  role: UserRole;

  name: string;
  username: string;
  image?: string | null;
};

export type AppUser = UserDTO | null;

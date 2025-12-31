import { UserRole } from "@/generated/prisma/client";

export type UserDTO = {
  id: string;
  email: string;
  role: UserRole;

  name?: string | null;
  username?: string | null;
  image?: string | null;
};

export type AppUser = UserDTO | null;

export type SessionUser = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string | null;
};

export type ProjectDB = {
  id: string;
  name: string;
  role: string;
  summary: string;

  description: string | null;
  keyFeatures: string[];
  techStack: { key: string; value: string }[];

  isFlagship: boolean;
  featured: boolean;
  published: boolean;

  liveUrl: string | null;
  repoUrl: string | null;
  createdAt: Date;
};

export type ProjectUI = ProjectDB;

export type AboutDB = {
  id: string;
  fullName: string;
  headline: string;
  shortBio: string;
  longBio: string | null;

  profileImage: string | null;
  heroImage: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;

  skills: { label: string; value: string }[];
  highlights: string[];

  createdAt: Date;
  updatedAt: Date;
};

export type AboutUI = AboutDB;

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

export type UploadedFile = {
  url: string;
  key: string;
};

export type AboutDB = {
  id: string;
  fullName: string;
  headline: string;
  subHeadline: string;
  shortBio: string;
  longBio: string;

  portfolioStartYear: number;

  profileImage?: UploadedFile | null;
  heroImage?: UploadedFile | null;
  resume?: UploadedFile | null;

  experience: {
    year: string;
    title: string;
    context?: string;
    description: string;
  }[];
  skills: { name: string }[];

  createdAt: Date;
  updatedAt: Date;
};
export type AboutUI = AboutDB;

export type ContactUI = {
  id: string;

  email: string;
  phone: string;
  location: string;

  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;

  openToRelocation: boolean;
  availableForWork: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type MessageUI = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  formattedDate: string;
  read: boolean;
  createdAt: Date;
};

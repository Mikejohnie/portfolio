import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://michaelnku.vercel.app"),

  title: {
    default: "Michael Nku — Full-Stack Web Developer",
    template: "%s | Michael Nku",
  },

  description:
    "Full-Stack Web Developer specializing in modern web applications, scalable systems, and clean architecture. Experienced with Next.js, React, TypeScript, Prisma, and PostgreSQL.",

  keywords: [
    "Michael Nku",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Portfolio",
  ],

  authors: [{ name: "Michael Nku" }],
  creator: "Michael Nku",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://michaelnku.vercel.app",
    title: "Michael Nku — Full-Stack Web Developer",
    description:
      "Portfolio of Michael Nku, a Full-Stack Web Developer building scalable, production-ready web applications.",
    siteName: "Michael Nku Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Michael Nku Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Michael Nku — Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer specializing in modern web systems and clean architecture.",
    images: ["/api/og"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#3c9ee0",
};

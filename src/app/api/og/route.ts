import React from "react";
import { ImageResponse } from "next/og";

type PublicAbout = {
  fullName: string;
  headline: string;
  shortBio: string;
};

export const runtime = "edge";

export async function GET(): Promise<ImageResponse> {
  let about: PublicAbout | null = null;
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${siteUrl}/api/public/about`, {
      cache: "no-store",
    });
    if (res.ok) about = (await res.json()) as PublicAbout;
  } catch (err) {
    // ignore and use defaults
  }

  const fullName = about?.fullName ?? "Michael Nku";
  const headline = about?.headline ?? "Full-Stack Developer";
  const shortBio =
    about?.shortBio ?? "Building scalable, production-ready web applications.";

  const element = React.createElement(
    "div",
    {
      style: {
        width: "1200px",
        height: "630px",
        background: "linear-gradient(135deg,#020617,#0f172a)",
        color: "white",
        padding: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    React.createElement(
      "h1",
      { style: { fontSize: 72, fontWeight: 800 } },
      fullName
    ),
    React.createElement(
      "p",
      { style: { fontSize: 36, color: "#60a5fa" } },
      headline
    ),
    React.createElement(
      "p",
      { style: { fontSize: 26, color: "#cbd5f5", maxWidth: 900 } },
      shortBio
    )
  );

  return new ImageResponse(element, { width: 1200, height: 630 });
}

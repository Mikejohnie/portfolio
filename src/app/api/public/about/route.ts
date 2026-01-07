import { NextResponse } from "next/server";
import { getPublicAbout } from "@/components/helper/getPublicAbout";

export async function GET() {
  const about = await getPublicAbout();
  return NextResponse.json(about);
}

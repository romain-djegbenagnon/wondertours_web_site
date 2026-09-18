import { NextResponse } from "next/server";
import { unsetSessionCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  unsetSessionCookie(response.headers);
  return response;
}

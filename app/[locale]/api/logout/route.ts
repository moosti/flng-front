import { NextResponse } from "next/server";
import { logout } from "@/app/utils/ironSessionOptions";

export async function POST() {
  await logout();

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

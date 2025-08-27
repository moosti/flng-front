import { NextRequest, NextResponse } from "next/server";
import { unsealData } from "iron-session";
import { SessionData } from "@/app/lib/data";
import { logout } from "@/app/utils/ironSessionOptions";

export async function POST(req: NextRequest) {
  const cookieStore = req.cookies;
  const encryptedSession = cookieStore.get("token")?.value || "";
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "fa";

  if (!encryptedSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = (await unsealData(encryptedSession, {
    password: process.env.SESSION_PASSWORD || "",
  })) as SessionData;

  if (!session || !session.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, method, data } = await req.json();

  const headers: HeadersInit = {
    Authorization: `Bearer ${session.access_token}`,
  };

  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (
    (method === "PUT" || method === "POST" || method === "PATCH") &&
    response.status === 204
  ) {
    return NextResponse.json(
      {
        status: 204,
      },
      { status: 200 }
    );
  }

  if (response.status === 500) {
    return NextResponse.json(
      {
        data: "Internal Server Error",
        status: 500,
      },
      { status: 200 }
    );
  }
  const responseData = await response.json();

  if (
    response.status === 401 &&
    responseData.detail === "Invalid credentials."
  ) {
    await logout();
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    response.status === 401 &&
    responseData.detail === "Activate your account first."
  ) {
    const loginUrl = new URL(`/${locale}/verifyAccount`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    response.status === 403 &&
    responseData.detail === "The access token is invalid."
  ) {
    await logout();
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.json(
    {
      data: responseData,
      status: response.status,
    },
    { status: response.status }
  );
}

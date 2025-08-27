"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { defaultSession, SessionData, sessionOptions } from "../lib/data";
import { unsealData } from "iron-session";

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
  }

  return session;
}

export async function logout() {
  "use server";

  const session = await getSession();
  session.destroy();
  revalidatePath("/");
}

export async function login(formData: FormData) {
  "use server";

  const session = await getSession();

  session.username = (formData.get("username") as string) ?? "No username";
  session.isLoggedIn = true;
  await session.save();
  revalidatePath("/");
}

export async function getSessionServerSide(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get("token")?.value || "";

  if (!encryptedSession) return null;

  const session = (await unsealData(encryptedSession, {
    password: process.env.SESSION_PASSWORD || "",
  })) as SessionData;

  return session;
}

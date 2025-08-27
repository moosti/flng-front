import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { getSession } from "./app/utils/ironSessionOptions";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const session = await getSession();
  const accessToken = session.access_token;
  const refreshToken = session.refresh_token;

  const locale = cookieStore.get("NEXT_LOCALE")?.value || "fa";

  if (!cookieStore.get("NEXT_LOCALE")) {
    request.headers.set("NEXT_LOCALE", locale);
  }

  const url = new URL(request.url);
  const pathname = url.pathname;
  const basePathname = pathname.split("/");

  const isAuthPage = [
    "login",
    "register",
    "resetPassword",
    "verifyAccount",
    "api",
  ].some((page) => basePathname.includes(page));

  if ((!accessToken || !refreshToken) && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};

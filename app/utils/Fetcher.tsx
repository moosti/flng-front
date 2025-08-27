"use server";
import { redirect } from "next/navigation";
import { getSession } from "./ironSessionOptions";
import _ from "lodash";

type ResponseType<T = unknown> = {
  data?: T;
  status: number;
};

export const fetcher = async <T,>({
  url,
  method = "GET",
  data,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown> | FormData;
}): Promise<ResponseType<T>> => {
  const session = await getSession();
  const splitUrl = url.split("/");

  const headers: HeadersInit = {
    Authorization: session.access_token ? `Bearer ${session.access_token}` : "",
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers,
    body:
      data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
  });

  if (method === "PUT" && res.status === 204) {
    return { status: res.status };
  }

  if (res.status === 429) {
    return { status: res.status };
  }

  if (res.status === 500) {
    return { status: res.status };
  }

  const jsonResponse = res.headers
    .get("content-type")
    ?.includes("application/json")
    ? await res.json()
    : null;

  if (
    res.status === 401 &&
    jsonResponse.detail === "Invalid credentials." &&
    !_.includes(splitUrl, "login")
  ) {
    await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/logout/`, {
      method: "POST",
      credentials: "include",
    });
    redirect("/login");
    // const response = NextResponse.redirect("/login");
    // response.cookies.set("YOUR_COOKIE_NAME", "cookie_value");
    // response.headers.set("Custom-Header", "header_value");
    // return response;
  }

  if (
    res.status === 401 &&
    jsonResponse.detail === "Activate your account first." &&
    !_.includes(splitUrl, "login")
  ) {
    redirect("/verifyAccount");
  }

  if (
    res.status === 403 &&
    jsonResponse.detail === "The access token is invalid."
  ) {
    await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/logout/`, {
      method: "POST",
      credentials: "include",
    });
    redirect("/login");
  }

  return { data: jsonResponse as T, status: res.status };
};

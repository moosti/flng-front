import { getSession } from "@/app/utils/ironSessionOptions";
import { fetcher } from "@/utils/Fetcher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const formData = new FormData();
  Object.entries({
    username: data.phoneNumber,
    password: data.password,
  }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const resAuth = await fetcher({
    url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/auth/login/`,
    method: "POST",
    data: formData,
  });

  if (resAuth.status === 200) {
    const resData = (await resAuth.data) as {
      username: string;
      access_token: string;
      refresh_token: string;
    };
    const session = await getSession();

    session.username = resData.username ?? "";
    session.access_token = resData.access_token ?? "";
    session.refresh_token = resData.refresh_token ?? "";
    session.isLoggedIn = true;

    await session.save();
  }

  return NextResponse.json(
    { data: resAuth.data, status: resAuth.status },
    { status: resAuth.status },
  );
}

import { toast } from "react-toastify";

export const FetcherClientSide = async <T,>({
  url,
  method = "GET",
  data,
  cache = "default",
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, unknown>;
  cache?:
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
}): Promise<{ data?: T; status: number }> => {
  const response = await fetch("/api/fetcher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, method, data }),
    cache: cache,
  });
  // if (!response.ok) {
  //   throw new Error("An error occurred while fetching data.");
  // }
  if (
    (method == "PUT" || method === "POST" || method === "PATCH") &&
    response.status == 204
  ) {
    return { status: response.status };
  }
  if (response.status === 429) {
    return { status: response.status };
  }

  if (response.status === 500) {
    toast.error("There is a database error, please try again later");
    return { status: response.status };
  }

  const responseData = await response.json();

  return { data: responseData.data, status: responseData.status };
};

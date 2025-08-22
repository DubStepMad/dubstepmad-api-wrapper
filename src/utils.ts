import axios from "axios";
import { ApiError } from "./errors";

export function buildQuery(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

export async function fetchImage(
  endpoint: string,
  params: Record<string, unknown> = {},
  baseUrl: string
): Promise<ArrayBuffer> {
  const url = `${baseUrl}/${endpoint}${Object.keys(params).length ? "?" + buildQuery(params) : ""}`;
  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    const contentType = res.headers["content-type"] ?? "";
    if (contentType.includes("image")) {
      return res.data;
    }
    throw new ApiError("Unexpected content type", res.status);
  } catch (err: any) {
    if (err.response) {
      const { status, data } = err.response;
      throw new ApiError(data?.message || `HTTP ${status}`, status);
    }
    throw new ApiError(err.message);
  }
}
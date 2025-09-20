import fetch from "node-fetch";

/**
 * Fetch an image from the DubstepMad API.
 * Automatically encodes query parameters correctly and avoids double-encoding.
 */
export async function fetchImage(
  endpoint: string,
  params: Record<string, any> = {},
  baseUrl = "https://api.dubstepmad.com/api/v1/"
): Promise<Buffer> {   // ✅ explicitly Buffer
  const query = Object.entries(params)
    .map(([key, value]) => {
      let v = value;
      if (typeof v === "string") {
        try {
          v = decodeURIComponent(v);
        } catch {
          // ignore if not encoded
        }
      }
      return `${key}=${encodeURIComponent(v)}`;
    })
    .join("&");

  const url = `${baseUrl}${endpoint}?${query}`;

  const res = await fetch(url);

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {
      // ignore, not JSON
    }
    throw new Error(`HTTP error! status: ${res.status} - ${msg}`);
  }

  // ✅ Convert ArrayBuffer → Node Buffer
  return Buffer.from(await res.arrayBuffer());
}

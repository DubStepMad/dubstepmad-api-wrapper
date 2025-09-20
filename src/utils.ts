/**
 * Fetch an image from the DubstepMad API.
 * Automatically encodes query parameters correctly and avoids double-encoding.
 */
export async function fetchImage(
  endpoint: string,
  params: Record<string, any> = {},
  baseUrl = "https://api.dubstepmad.com/api/v1/"
): Promise<Buffer> {
  // ✅ Dynamic import of node-fetch for CJS & ESM compatibility
  const fetchFn = (await import("node-fetch")).default;

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

  const res = await fetchFn(url);

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

  return Buffer.from(await res.arrayBuffer());
}

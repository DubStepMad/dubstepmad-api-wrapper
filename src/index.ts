/**
 * DubstepMad API Wrapper
 * 
 * A TypeScript-first wrapper around the DubstepMad API,
 * inspired by the FrenchNoodles wrapper, with a focus on 
 * clean design, strong typing, and maintainability.
 */

export interface ApiError extends Error {
  status?: number;
}

export interface MemeOptions {
  text?: string;
  text1?: string;
  text2?: string;
}

export interface ImageFilterOptions {
  image: string;
  amount?: number;
  factor?: number;
}

export interface BuilderOptions {
  background?: string;
  avatar?: string;
  title?: string;
  subtitle?: string;
  text1?: string;
  text2?: string;
  textColor?: string;
}

type ApiResponse = Promise<ArrayBuffer>;

/**
 * Utility for building query strings
 */
function buildQuery(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

/**
 * Internal fetch utility with error handling
 */
async function fetchImage(
  endpoint: string,
  params: Record<string, unknown> = {},
  baseUrl: string
): ApiResponse {
  const url = `${baseUrl}/${endpoint}${Object.keys(params).length ? "?" + buildQuery(params) : ""}`;
  const res = await fetch(url);

  const contentType = res.headers.get("content-type") ?? "";

  if (res.ok && contentType.includes("image")) {
    return res.arrayBuffer();
  }

  let errorBody: any;
  try {
    errorBody = await res.json();
  } catch {
    errorBody = { message: "Unknown error", status: res.status };
  }

  const err: ApiError = new Error(errorBody.message || `HTTP ${res.status}`);
  err.status = errorBody.status ?? res.status;
  throw err;
}

/**
 * Builder utility class for endpoints that require chained configuration.
 */
class EndpointBuilder {
  private payload: BuilderOptions = {};
  private endpoint: string;
  private baseUrl: string;

  constructor(endpoint: string, baseUrl: string) {
    this.endpoint = endpoint;
    this.baseUrl = baseUrl;
  }

  setBackground(v: string) { this.payload.background = v; return this; }
  setAvatar(v: string) { this.payload.avatar = v; return this; }
  setTitle(v: string) { this.payload.title = v; return this; }
  setSubtitle(v: string) { this.payload.subtitle = v; return this; }
  setText1(v: string) { this.payload.text1 = v; return this; }
  setText2(v: string) { this.payload.text2 = v; return this; }
  setTextColor(v: string) { this.payload.textColor = v; return this; }

  async build(): ApiResponse {
    return fetchImage(this.endpoint, this.payload as Record<string, unknown>, this.baseUrl);
  }
}

/**
 * Main API wrapper class
 */
export class DubstepMadAPI {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://dubstepmad.com/api/endpoints") {
    this.baseUrl = baseUrl;
  }

  /* ----------------------- Meme Endpoints ----------------------- */

  lisastage(text: string): ApiResponse {
    return fetchImage("lisastage", { text }, this.baseUrl);
  }

  drake(text1: string, text2: string): ApiResponse {
    return fetchImage("drake", { text1, text2 }, this.baseUrl);
  }

  worthless(text: string): ApiResponse {
    return fetchImage("worthless", { text }, this.baseUrl);
  }

  presidentialalert(text: string): ApiResponse {
    return fetchImage("presidentialalert", { text }, this.baseUrl);
  }

  spongebobburnpaper(text: string): ApiResponse {
    return fetchImage("spongebobburnpaper", { text }, this.baseUrl);
  }

  changemymind(text: string): ApiResponse {
    return fetchImage("changemymind", { text }, this.baseUrl);
  }

  awkwardmonkey(text: string): ApiResponse {
    return fetchImage("awkwardmonkey", { text }, this.baseUrl);
  }

  randommeme(): ApiResponse {
    return fetchImage("randommeme", {}, this.baseUrl);
  }

  /* --------------------- Image Filters --------------------- */

  blur({ image, amount }: ImageFilterOptions): ApiResponse {
    return fetchImage("blur", { image, amount }, this.baseUrl);
  }

  invert(image: string): ApiResponse {
    return fetchImage("invert", { image }, this.baseUrl);
  }

  edges(image: string): ApiResponse {
    return fetchImage("edges", { image }, this.baseUrl);
  }

  circle(image: string): ApiResponse {
    return fetchImage("circle", { image }, this.baseUrl);
  }

  wide({ image, factor }: ImageFilterOptions): ApiResponse {
    return fetchImage("wide", { image, factor }, this.baseUrl);
  }

  uglyupclose(image: string): ApiResponse {
    return fetchImage("uglyupclose", { image }, this.baseUrl);
  }

  clown(image: string): ApiResponse {
    return fetchImage("clown", { image }, this.baseUrl);
  }

  rip(image: string): ApiResponse {
    return fetchImage("rip", { image }, this.baseUrl);
  }

  affectbaby(image: string): ApiResponse {
    return fetchImage("affectbaby", { image }, this.baseUrl);
  }

  trash(image: string): ApiResponse {
    return fetchImage("trash", { image }, this.baseUrl);
  }

  boostercard(image: string): ApiResponse {
    return fetchImage("boostercard", { image }, this.baseUrl);
  }

  /* --------------------- Builder Endpoints --------------------- */

  balancecard(): EndpointBuilder {
    return new EndpointBuilder("balancecard", this.baseUrl);
  }

  welcomebanner(): EndpointBuilder {
    return new EndpointBuilder("welcomebanner", this.baseUrl);
  }
}

export default DubstepMadAPI;

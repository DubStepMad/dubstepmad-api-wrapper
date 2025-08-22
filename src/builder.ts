import { BuilderOptions, ApiResponse } from "./types";
import { fetchImage } from "./utils";

export class EndpointBuilder {
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
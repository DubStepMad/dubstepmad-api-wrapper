import { BuilderOptions, ApiResponse, TradingCardOptions } from "./types";
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

export class TradingCardBuilder {
  private payload: TradingCardOptions = {};
  private endpoint = "tradingcard";
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAvatar(v: string) { this.payload.avatar = v; return this; }
  setTitle(v: string) { this.payload.title = v; return this; }
  setDescription(v: string) { this.payload.description = v; return this; }
  setTopLeft(v: string) { this.payload.topLeft = v; return this; }
  setBottomLeft(v: string) { this.payload.bottomLeft = v; return this; }
  setBottomRight(v: string) { this.payload.bottomRight = v; return this; }
  setCardType(v: 'common' | 'uncommon' | 'rare' | 'ultra-rare') { this.payload.cardType = v; return this; }

  setOptions(options: TradingCardOptions) {
    Object.assign(this.payload, options);
    return this;
  }

  async build(): ApiResponse {
    return fetchImage(this.endpoint, this.payload as Record<string, unknown>, this.baseUrl);
  }
}
import { fetchImage } from "./utils.ts";

type BuilderParams = Record<string, string | number | boolean>;

export class EndpointBuilder {
  private endpoint: string;
  private params: BuilderParams = {};
  private baseUrl: string;

  constructor(endpoint: string, baseUrl: string = "https://api.dubstepmad.com/api/v1/") {
    this.endpoint = endpoint;
    this.baseUrl = baseUrl;
  }

  setBackground(url: string) {
    this.params.background = url;
    return this;
  }

  setAvatar(url: string) {
    this.params.avatar = url;
    return this;
  }

  setTitle(title: string) {
    this.params.title = title;
    return this;
  }

  setSubtitle(subtitle: string) {
    this.params.subtitle = subtitle;
    return this;
  }

  setTextColor(color: string) {
    this.params.textColor = color;
    return this;
  }

  setParam(key: string, value: string | number | boolean) {
    this.params[key] = value;
    return this;
  }

  async build(): Promise<Buffer> {
    const arrayBuffer = await fetchImage(this.endpoint, this.params, this.baseUrl);
  return Buffer.from(arrayBuffer); // convert ArrayBuffer → Buffer
}
}

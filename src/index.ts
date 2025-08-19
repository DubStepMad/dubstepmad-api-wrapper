export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
}

export interface DJ {
  id: number;
  name: string;
  show: string;
}

export default class DubstepMadAPI {
  private baseUrl: string;

  constructor(baseUrl: string = "https://dubstepmad.com/api") {
    this.baseUrl = baseUrl;
  }

  private async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${endpoint}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} - ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  async getTracks(): Promise<Track[]> {
    return this.get<Track[]>("tracks");
  }

  async getDjs(): Promise<DJ[]> {
    return this.get<DJ[]>("djs");
  }
}

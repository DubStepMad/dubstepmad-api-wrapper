// src/index.ts
var DubstepMadAPI = class {
  constructor(baseUrl = "https://dubstepmad.com/api") {
    this.baseUrl = baseUrl;
  }
  async get(endpoint) {
    const res = await fetch(`${this.baseUrl}/${endpoint}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }
  async getTracks() {
    return this.get("tracks");
  }
  async getDjs() {
    return this.get("djs");
  }
};
export {
  DubstepMadAPI as default
};

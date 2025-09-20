// src/utils.ts
async function fetchImage(endpoint, params = {}, baseUrl = "https://api.dubstepmad.com/api/v1/") {
  const fetchFn = (await import("node-fetch")).default;
  const query = Object.entries(params).map(([key, value]) => {
    let v = value;
    if (typeof v === "string") {
      try {
        v = decodeURIComponent(v);
      } catch {
      }
    }
    return `${key}=${encodeURIComponent(v)}`;
  }).join("&");
  const url = `${baseUrl}${endpoint}?${query}`;
  const res = await fetchFn(url);
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {
    }
    throw new Error(`HTTP error! status: ${res.status} - ${msg}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

// src/builder.ts
var EndpointBuilder = class {
  endpoint;
  params = {};
  baseUrl;
  constructor(endpoint, baseUrl = "https://api.dubstepmad.com/api/v1/") {
    this.endpoint = endpoint;
    this.baseUrl = baseUrl;
  }
  setBackground(url) {
    this.params.background = url;
    return this;
  }
  setAvatar(url) {
    this.params.avatar = url;
    return this;
  }
  setTitle(title) {
    this.params.title = title;
    return this;
  }
  setSubtitle(subtitle) {
    this.params.subtitle = subtitle;
    return this;
  }
  setTextColor(color) {
    this.params.textColor = color;
    return this;
  }
  setParam(key, value) {
    this.params[key] = value;
    return this;
  }
  async build() {
    return fetchImage(this.endpoint, this.params, this.baseUrl);
  }
};

// src/index.ts
var lisastage = (text) => fetchImage("lisastage", { text });
var drake = (text1, text2) => fetchImage("drake", { text1, text2 });
var worthless = (text) => fetchImage("worthless", { text });
var presidentialalert = (text) => fetchImage("presidentialalert", { text });
var spongebobburnpaper = (text) => fetchImage("spongebobburnpaper", { text });
var changemymind = (text) => fetchImage("changemymind", { text });
var awkwardmonkey = (text) => fetchImage("awkwardmonkey", { text });
var randommeme = () => fetchImage("randommeme");
var blur = ({ image, amount }) => fetchImage("blur", { image, amount });
var invert = (image) => fetchImage("invert", { image });
var edges = (image) => fetchImage("edges", { image });
var circle = (image) => fetchImage("circle", { image });
var wide = ({ image, factor }) => fetchImage("wide", { image, factor });
var uglyupclose = (image) => fetchImage("uglyupclose", { image });
var clown = (image) => fetchImage("clown", { image });
var rip = (image) => fetchImage("rip", { image });
var affectbaby = (image) => fetchImage("affectbaby", { image });
var trash = (image) => fetchImage("trash", { image });
var boostercard = (image) => fetchImage("boostercard", { image });
var balancecard = () => new EndpointBuilder("balancecard");
var welcomebanner = () => new EndpointBuilder("welcomebanner");
export {
  affectbaby,
  awkwardmonkey,
  balancecard,
  blur,
  boostercard,
  changemymind,
  circle,
  clown,
  drake,
  edges,
  invert,
  lisastage,
  presidentialalert,
  randommeme,
  rip,
  spongebobburnpaper,
  trash,
  uglyupclose,
  welcomebanner,
  wide,
  worthless
};

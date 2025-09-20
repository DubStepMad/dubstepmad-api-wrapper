"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  affectbaby: () => affectbaby,
  awkwardmonkey: () => awkwardmonkey,
  balancecard: () => balancecard,
  blur: () => blur,
  boostercard: () => boostercard,
  changemymind: () => changemymind,
  circle: () => circle,
  clown: () => clown,
  drake: () => drake,
  edges: () => edges,
  invert: () => invert,
  lisastage: () => lisastage,
  presidentialalert: () => presidentialalert,
  randommeme: () => randommeme,
  rip: () => rip,
  spongebobburnpaper: () => spongebobburnpaper,
  trash: () => trash,
  uglyupclose: () => uglyupclose,
  welcomebanner: () => welcomebanner,
  wide: () => wide,
  worthless: () => worthless
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});

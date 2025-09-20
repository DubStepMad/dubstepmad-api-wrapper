import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { ImageFilterOptions } from "../src/types";

import {
  lisastage,
  drake,
  worthless,
  presidentialalert,
  spongebobburnpaper,
  changemymind,
  awkwardmonkey,
  randommeme,
  blur,
  invert,
  edges,
  circle,
  wide,
  uglyupclose,
  clown,
  rip,
  affectbaby,
  trash,
  boostercard,
  balancecard,
  welcomebanner
} from "../src/index";

// Helper: returns fake ArrayBuffer image
function mockImageResponse(): ArrayBuffer {
  return new TextEncoder().encode("fake image data").buffer;
}

describe("DubstepMadAPI Functional Tests", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  /* -------------------- Meme Endpoints -------------------- */
  const memeEndpoints: { fn: (...args: any[]) => Promise<any>, name: string, args: [string] | [string, string] | [] }[] = [
    { fn: lisastage, name: "lisastage", args: ["hello"] },         // [string]
    { fn: drake, name: "drake", args: ["top", "bottom"] },        // [string, string]
    { fn: worthless, name: "worthless", args: ["test"] },
    { fn: presidentialalert, name: "presidentialalert", args: ["alert"] },
    { fn: spongebobburnpaper, name: "spongebobburnpaper", args: ["text"] },
    { fn: changemymind, name: "changemymind", args: ["change"] },
    { fn: awkwardmonkey, name: "awkwardmonkey", args: ["monkey"] },
    { fn: randommeme, name: "randommeme", args: [] }             // []
  ];

  memeEndpoints.forEach(({ fn, name, args }) => {
    it(`should fetch ${name} meme`, async () => {
      const query = args.map((a, i) => `text${i + 1}=${encodeURIComponent(a)}`).join("&");
      const url = `https://api.dubstepmad.com/api/v1/${name}${query ? "?" + query : ""}`;
      mock.onGet(url).reply(200, mockImageResponse(), { "content-type": "image/png" });

      const result = await fn(...args);
      expect(result).toBeInstanceOf(ArrayBuffer);
    });
  });

  /* -------------------- Image Filters -------------------- */
  const filterEndpoints: {
    fn: (...args: any[]) => Promise<any>;
    name: string;
    args: [ImageFilterOptions] | [string];
  }[] = [
    { fn: blur, name: "blur", args: [{ image: "img.png", amount: 5 }] },
    { fn: invert, name: "invert", args: ["img.png"] },
    { fn: edges, name: "edges", args: ["img.png"] },
    { fn: circle, name: "circle", args: ["img.png"] },
    { fn: wide, name: "wide", args: [{ image: "img.png", factor: 2 }] },
    { fn: uglyupclose, name: "uglyupclose", args: ["img.png"] },
    { fn: clown, name: "clown", args: ["img.png"] },
    { fn: rip, name: "rip", args: ["img.png"] },
    { fn: affectbaby, name: "affectbaby", args: ["img.png"] },
    { fn: trash, name: "trash", args: ["img.png"] },
    { fn: boostercard, name: "boostercard", args: ["img.png"] }
  ];

  filterEndpoints.forEach(({ fn, name, args }) => {
    it(`should fetch ${name} filter`, async () => {
      const query = args
        .map(arg => {
          if (typeof arg === "object" && arg !== null)
            return Object.entries(arg)
              .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
              .join("&");
          return `image=${encodeURIComponent(arg)}`;
        })
        .join("&");

      const url = `https://api.dubstepmad.com/api/v1/${name}?${query}`;
      mock.onGet(url).reply(200, mockImageResponse(), { "content-type": "image/png" });

      const result = await fn(...args);
      expect(result).toBeInstanceOf(ArrayBuffer);
    });
  });

  /* -------------------- Builder Endpoints -------------------- */
  it("should build balancecard using builder", async () => {
    const builder = balancecard().setParam("user", "123");
    mock.onGet("https://api.dubstepmad.com/api/v1/balancecard?user=123").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const result = await builder.build();
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should build welcomebanner using builder", async () => {
    const builder = welcomebanner().setParam("background", "bg.png").setParam("avatar", "avatar.png").setParam("title", "Welcome!");
    mock.onGet("https://api.dubstepmad.com/api/v1/welcomebanner?background=bg.png&avatar=avatar.png&title=Welcome!").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const result = await builder.build();
    expect(result).toBeInstanceOf(ArrayBuffer);
  });
});

import { describe, it, expect, jest } from "@jest/globals";
import { Buffer } from "buffer";

// 1️⃣ Mock fetchImage module before importing API
jest.unstable_mockModule("../src/utils.ts", () => ({
  fetchImage: jest.fn(async () => Buffer.from("fake image data")),
}));

// 2️⃣ Dynamically import the API wrapper after mocking
const API = await import("../src/index.ts");
const utils = await import("../src/utils.ts");
const { EndpointBuilder } = await import("../src/builder.ts");

// 3️⃣ Helper types for cleaner iteration
type ApiFunction = (...args: any[]) => Promise<Buffer>;

// 4️⃣ Fake image response buffer
const fakeBuffer = Buffer.from("fake image data");

describe("DubstepMadAPI Functional Tests (Mocked, ESM-safe)", () => {
  /* -------------------- Meme Endpoints -------------------- */
  const memeEndpoints: { fn: keyof typeof API; args: any[] }[] = [
    { fn: "lisastage", args: ["hello"] },
    { fn: "drake", args: ["top", "bottom"] },
    { fn: "worthless", args: ["test"] },
    { fn: "presidentialalert", args: ["alert"] },
    { fn: "spongebobburnpaper", args: ["text"] },
    { fn: "changemymind", args: ["change"] },
    { fn: "awkwardmonkey", args: ["monkey"] },
    { fn: "randommeme", args: [] },
  ];

  memeEndpoints.forEach(({ fn, args }) => {
    it(`should fetch ${fn} meme`, async () => {
      const result = await (API as any)[fn](...args);
      expect(result).toBeInstanceOf(Buffer);
      expect((utils.fetchImage as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });
  });

  /* -------------------- Image Filters -------------------- */
  const filterEndpoints: { fn: keyof typeof API; args: any[] }[] = [
    { fn: "blur", args: [{ image: "img.png", amount: 5 }] },
    { fn: "invert", args: ["img.png"] },
    { fn: "edges", args: ["img.png"] },
    { fn: "circle", args: ["img.png"] },
    { fn: "wide", args: [{ image: "img.png", factor: 2 }] },
    { fn: "uglyupclose", args: ["img.png"] },
    { fn: "clown", args: ["img.png"] },
    { fn: "rip", args: ["img.png"] },
    { fn: "affectbaby", args: ["img.png"] },
    { fn: "trash", args: ["img.png"] },
    { fn: "boostercard", args: ["img.png"] },
  ];

  filterEndpoints.forEach(({ fn, args }) => {
    it(`should fetch ${fn} filter`, async () => {
      const result = await (API as any)[fn](...args);
      expect(result).toBeInstanceOf(Buffer);
      expect((utils.fetchImage as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });
  });

  /* -------------------- Builder Endpoints -------------------- */
  const builderEndpoints: { fn: keyof typeof API; params: Record<string, any> }[] = [
    { fn: "balancecard", params: { user: "123" } },
    { fn: "welcomebanner", params: { background: "bg.png", avatar: "avatar.png", title: "Welcome!" } },
  ];

  builderEndpoints.forEach(({ fn, params }) => {
    it(`should build ${fn} using EndpointBuilder`, async () => {
      const builder = (API as any)[fn]() as EndpointBuilder;
      for (const [key, value] of Object.entries(params)) {
        builder.setParam(key, value);
      }
      const result = await builder.build();
      expect(result).toBeInstanceOf(Buffer);
      expect((utils.fetchImage as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });
  });
});

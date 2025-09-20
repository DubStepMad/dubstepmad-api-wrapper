import { describe, it, expect, beforeAll, afterAll, jest } from "@jest/globals";
import { Buffer } from "buffer";

// Mock the utils module for ESM
jest.unstable_mockModule("../src/utils.ts", () => ({
  fetchImage: jest.fn(async () => Buffer.from("fake image data")),
}));

// Now import the mocked modules dynamically
const utils = await import("../src/utils.ts");
const API = await import("../src/index.ts");
const { EndpointBuilder } = await import("../src/builder.ts");

// Helper type extraction
type ApiFunctions = {
  [K in keyof typeof API]: typeof API[K] extends (...args: any) => Promise<Buffer> ? typeof API[K] : never;
};

type ApiFunctionKey = keyof ApiFunctions;

type BuilderFunctions = {
  [K in keyof typeof API]: typeof API[K] extends () => EndpointBuilder ? typeof API[K] : never;
};

type BuilderFunctionKey = keyof BuilderFunctions;

describe("DubstepMadAPI Functional Tests (ESM-safe & Mocked)", () => {
  /* -------------------- Static API Function Tests -------------------- */
  const apiTests: { fn: ApiFunctionKey; args: Parameters<ApiFunctions[ApiFunctionKey]> }[] = [
    { fn: "lisastage", args: ["hello"] },
    { fn: "drake", args: ["top", "bottom"] },
    { fn: "worthless", args: ["test"] },
    { fn: "presidentialalert", args: ["alert"] },
    { fn: "spongebobburnpaper", args: ["text"] },
    { fn: "changemymind", args: ["change"] },
    { fn: "awkwardmonkey", args: ["monkey"] },
    { fn: "randommeme", args: [] },
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
    { fn: "boostercard", args: ["img.png"] }
  ];

  apiTests.forEach(({ fn, args }) => {
    it(`should fetch ${fn}`, async () => {
      const result = await (API as any)[fn](...args);
      expect(result).toBeInstanceOf(Buffer);
      // Ensure our fetchImage mock was called
      expect((utils.fetchImage as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });
  });

  /* -------------------- Dynamic Builder Tests -------------------- */
  const builderKeys = Object.keys(API).filter(key => {
    const fn = (API as any)[key];
    if (typeof fn !== "function") return false;
    try {
      return fn() instanceof EndpointBuilder; // only builders
    } catch {
      return false;
    }
  }) as BuilderFunctionKey[];

  builderKeys.forEach(fnName => {
    it(`should build ${fnName} using EndpointBuilder`, async () => {
      const builder = (API as any)[fnName]() as EndpointBuilder;

      // Automatically detect all setter methods (methods starting with "set")
      const setterKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(builder))
        .filter(k => k.startsWith("set") && typeof (builder as any)[k] === "function");

      setterKeys.forEach(k => {
        try {
          let exampleValue: any = "test"; // default string
          if (k.toLowerCase().includes("amount") || k.toLowerCase().includes("factor")) exampleValue = 5;
          (builder as any)[k](exampleValue);
        } catch {
          // ignore if setter fails
        }
      });

      const result = await builder.build();
      expect(result).toBeInstanceOf(Buffer);
      expect((utils.fetchImage as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });
  });
});

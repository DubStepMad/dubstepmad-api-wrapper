import { jest, describe, it, expect, afterEach, beforeEach } from "@jest/globals";
import DubstepMadAPI from "../src/index";

// Helper to simulate image response
function mockImageResponse(): ArrayBuffer {
  return new TextEncoder().encode("fake image data").buffer;
}

describe("DubstepMadAPI", () => {
  let api: DubstepMadAPI;

  beforeEach(() => {
    api = new DubstepMadAPI("https://mock.api");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocks after each test
  });

  it("should fetch lisastage meme image", async () => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    (globalThis.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      headers: new Map([["content-type", "image/png"]]) as any,
      arrayBuffer: async () => mockImageResponse(),
    } as unknown as Response);

    const result = await api.lisastage("test meme");
    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://mock.api/lisastage?text=test%20meme"
    );
  });

  it("should fetch drake meme image", async () => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    (globalThis.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      headers: new Map([["content-type", "image/png"]]) as any,
      arrayBuffer: async () => mockImageResponse(),
    } as unknown as Response);

    const result = await api.drake("top text", "bottom text");
    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://mock.api/drake?text1=top%20text&text2=bottom%20text"
    );
  });

  it("should fetch blurred image", async () => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    (globalThis.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      headers: new Map([["content-type", "image/png"]]) as any,
      arrayBuffer: async () => mockImageResponse(),
    } as unknown as Response);

    const result = await api.blur({ image: "img.png", amount: 5 });
    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://mock.api/blur?image=img.png&amount=5"
    );
  });

  it("should build welcome banner using builder", async () => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    (globalThis.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      headers: new Map([["content-type", "image/png"]]) as any,
      arrayBuffer: async () => mockImageResponse(),
    } as unknown as Response);

    const builder = api
      .welcomebanner()
      .setBackground("bg.png")
      .setAvatar("avatar.png")
      .setTitle("Welcome!");

    const result = await builder.build();
    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://mock.api/welcomebanner?background=bg.png&avatar=avatar.png&title=Welcome!"
    );
  });

  it("should throw an error for failed requests", async () => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    (globalThis.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ message: "Bad request" }),
    } as unknown as Response);

    await expect(api.drake("foo", "bar")).rejects.toThrow("Bad request");
  });
});

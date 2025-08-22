import { describe, it, expect, afterEach, beforeEach } from "@jest/globals";
import DubstepMadAPI from "../src/index";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

// Helper to simulate image response
function mockImageResponse(): ArrayBuffer {
  return new TextEncoder().encode("fake image data").buffer;
}

describe("DubstepMadAPI", () => {
  let api: DubstepMadAPI;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    api = new DubstepMadAPI("https://mock.api");
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should fetch lisastage meme image", async () => {
    mock.onGet("https://mock.api/lisastage?text=test%20meme").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const result = await api.lisastage("test meme");
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should fetch drake meme image", async () => {
    mock.onGet("https://mock.api/drake?text1=top%20text&text2=bottom%20text").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const result = await api.drake("top text", "bottom text");
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should fetch blurred image", async () => {
    mock.onGet("https://mock.api/blur?image=img.png&amount=5").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const result = await api.blur({ image: "img.png", amount: 5 });
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should build welcome banner using builder", async () => {
    mock.onGet("https://mock.api/welcomebanner?background=bg.png&avatar=avatar.png&title=Welcome!").reply(200, mockImageResponse(), {
      "content-type": "image/png"
    });

    const builder = api
      .welcomebanner()
      .setBackground("bg.png")
      .setAvatar("avatar.png")
      .setTitle("Welcome!");

    const result = await builder.build();
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should throw an error for failed requests", async () => {
    mock.onGet("https://mock.api/drake?text1=foo&text2=bar").reply(400, { message: "Bad request" }, {
      "content-type": "application/json"
    });

    await expect(api.drake("foo", "bar")).rejects.toThrow("Bad request");
  });
});
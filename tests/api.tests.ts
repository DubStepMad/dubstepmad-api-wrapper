import { jest } from '@jest/globals';
import DubstepMadAPI, { Track } from "../src/index";

describe("DubstepMadAPI Wrapper", () => {
  let api: DubstepMadAPI;

  beforeAll(() => {
    api = new DubstepMadAPI("https://dubstepmad.com/api");
  });

  it("should create an instance", () => {
    expect(api).toBeInstanceOf(DubstepMadAPI);
  });

  it("should throw on invalid endpoint", async () => {
    const badApi = new DubstepMadAPI("https://example.com/404");
    await expect(badApi.getTracks()).rejects.toThrow();
  });

  it("should call getTracks and return array (mocked)", async () => {
    const mockApi = new DubstepMadAPI();

    // Create a typed mock function
    const mockGet = jest.fn(async (_endpoint: string): Promise<Track[]> => {
      return [{ id: 1, title: "Test Track", artist: "DJ Test", duration: 300 }];
    });

    // Override private get method
    (mockApi as any).get = mockGet;

    const tracks = await mockApi.getTracks();
    expect(tracks).toHaveLength(1);
    expect(tracks[0].title).toBe("Test Track");
  });
});

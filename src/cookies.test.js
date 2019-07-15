const cookies = require("./cookies");

const mockSet = jest.fn();
const mockGet = jest.fn();
beforeEach(() => {
  Object.defineProperty(document, "cookie", {
    get: mockGet,
    set: mockSet
  });
});

describe("cookies", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("set", () => {
    it("should set a cookie", () => {
      const key = "cookie_key";
      const value = "cookie_value";
      const expires = 24 * 60 * 60 * 1000;
      cookies.set(key, value, expires);

      expect(mockSet).toHaveBeenCalledTimes(1);
      expect(mockSet).toHaveBeenCalledWith(
        `${key}=${value}; expires ${new Date(
          +new Date() + expires
        ).toUTCString()}`
      );
    });
  });

  describe("get", () => {
    const key = "cookie_key";
    const value = "cookie_value";
    beforeEach(() => {
      mockGet.mockImplementation(
        () => `cookieA=valueA; ${key}=${value}; cookieB=valueB;`
      );
    });

    it("should get a cookie", () => {
      expect(cookies.get(key)).toEqual(value);
    });

    it("should not get a cookie", () => {
      expect(cookies.get("non-existent-key")).toEqual(undefined);
    });
  });
});

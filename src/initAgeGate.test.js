const cookie = require("./cookies");
const form = require("./ageGateForm");
const initAgeGate = require("./initAgeGate");

jest.mock("./cookies", () => ({
  get: jest.fn()
}));
jest.mock("./ageGateForm", () => ({
  display: jest.fn()
}));

describe("initAgeGate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should show form if cookie is not set", () => {
    cookie.get.mockImplementation(() => "1");
    const window = jest.fn();

    initAgeGate(window);

    expect(cookie.get).toHaveBeenCalledTimes(1);
    expect(cookie.get).toHaveBeenCalledWith("ac");

    expect(form.display).toHaveBeenCalledTimes(1);
    expect(form.display).toHaveBeenCalledWith(window);
  });

  it("should shows form if cookie is not set", () => {
    cookie.get.mockImplementation(() => null);
    const window = jest.fn();

    initAgeGate(window);

    expect(cookie.get).toHaveBeenCalledTimes(1);
    expect(cookie.get).toHaveBeenCalledWith("ac");

    expect(form.display).toHaveBeenCalledTimes(0);
  });
});

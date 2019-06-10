const cookies = require("./cookies");
const Modal = require("./ageGateModal");
const initAgeGate = require("./initAgeGate");

jest.mock("./cookies", () => ({
  get: jest.fn(),
  set: jest.fn()
}));

jest.mock("./ageGateModal");

const insertBefore = jest.fn();
const firstChild = null;

document.body = document.createElement("body");
document.body.insertBefore = insertBefore;
document.body.firstChild = firstChild;

describe("initAgeGate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Modal.mockClear();
  });

  it("should show form if cookie is not set", () => {
    cookies.get.mockImplementation(() => "true");
    initAgeGate();

    expect(cookies.get).toHaveBeenCalledTimes(1);
    expect(cookies.get).toHaveBeenCalledWith("ac");

    expect(Modal).not.toHaveBeenCalled();
  });

  describe("no cookie", () => {
    let listener;
    let modal;
    let mockDOM;

    beforeEach(() => {
      cookies.get.mockImplementation(() => null);
      initAgeGate();
      modal = Modal.mock.instances[0];
      mockDOM = jest.fn();
      modal.getDOM.mockImplementation(() => mockDOM);
      listener = Modal.mock.calls[0][0];
    });

    it("should shows form if cookie is not set", () => {
      expect(cookies.get).toHaveBeenCalledTimes(1);
      expect(cookies.get).toHaveBeenCalledWith("ac");

      expect(Modal).toHaveBeenCalledTimes(1);
      expect(Modal).toHaveBeenCalledWith(expect.any(Function));
    });

    describe("events", () => {
      beforeEach(() => {});

      describe("modal event loaded", () => {
        it("should inject modal into dom", () => {
          listener("loaded");
          expect(insertBefore).toHaveBeenCalledTimes(1);
          expect(insertBefore).toHaveBeenCalledWith(mockDOM, firstChild);
        });
      });

      describe("modal confirmed", () => {
        it("should set cookie", () => {
          const expectedDom = jest.fn();
          listener("confirmed");
          expect(cookies.set).toHaveBeenCalledTimes(1);
          expect(cookies.set).toHaveBeenCalledWith(
            "ac",
            "true",
            24 * 60 * 60 * 1000
          );
        });
      });

      describe("modal closed", () => {
        it("should remove html from dom", () => {
          listener("closed");
          expect(modal.destroy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});

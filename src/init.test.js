const cookies = require("./cookies");
const { Modal } = require("./modal");
const { init } = require("./init");

jest.mock("./cookies", () => ({
  get: jest.fn(),
  set: jest.fn()
}));

jest.mock("./modal");

const insertBefore = jest.fn();
const firstChild = {
  classList: {
    add: jest.fn(),
    remove: jest.fn()
  }
};

document.body = document.createElement("body");
document.body.insertBefore = insertBefore;
Object.defineProperty(document.body, "children", {
  value: [firstChild]
});

describe("initAgeGate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Modal.mockClear();
  });

  it("should show form if cookie is not set", () => {
    cookies.get.mockImplementation(() => "true");
    init();

    expect(cookies.get).toHaveBeenCalledTimes(1);
    expect(cookies.get).toHaveBeenCalledWith("ac");

    expect(Modal).not.toHaveBeenCalled();
  });

  describe("no cookie", () => {
    let listener;
    let modal;
    let mockDOM;
    const mockTemplate = "<div></div>";

    beforeEach(() => {
      cookies.get.mockImplementation(() => null);
      init(mockTemplate);
      modal = Modal.mock.instances[0];
      mockDOM = jest.fn();
      modal.getDOM.mockImplementation(() => mockDOM);
      [, listener] = Modal.mock.calls[0];
    });

    it("should shows form if cookie is not set", () => {
      expect(cookies.get).toHaveBeenCalledTimes(1);
      expect(cookies.get).toHaveBeenCalledWith("ac");

      expect(Modal).toHaveBeenCalledTimes(1);
      expect(Modal).toHaveBeenCalledWith(mockTemplate, expect.any(Function));
    });

    describe("events", () => {
      beforeEach(() => {});

      describe("modal event loaded", () => {
        it("should inject modal into dom", () => {
          listener("loaded");
          expect(insertBefore).toHaveBeenCalledTimes(1);
          expect(insertBefore).toHaveBeenCalledWith(mockDOM, firstChild);
          expect(firstChild.classList.add).toHaveBeenCalledWith("hidden");
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

          expect(firstChild.classList.remove).toHaveBeenCalledWith("hidden");
        });
      });
    });
  });
});

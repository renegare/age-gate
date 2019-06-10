const $ = require("jquery");
const createElements = require("./createElements");
const insertAfter = require("./insertAfter");
const form = require("./ageGateForm");

jest.mock("./createElements", () => jest.fn());
jest.mock("./insertAfter", () => jest.fn());

const callback = jest.fn();

expect.extend({
  toBeVisible: dom => {
    try {
      expect(dom).toEqual(expect.any(Element));
    } catch (e) {
      return {
        message: () => `expected DOM Element but received "${typeof dom}"`,
        pass: false
      };
    }

    return {
      message: () =>
        `expected DOM with class(es) "${[].slice
          .call(dom.classList)
          .join(" ")}" to not contain the class hidden`,
      pass: !dom.classList.contains("hidden")
    };
  }
});

describe("ageGateForm", () => {
  let dom, $html;
  beforeEach(() => {
    jest.resetAllMocks();
    form.display(callback);

    dom = callback.mock.calls[0][1];
    $html = $(dom);
  });

  it("should trigger callback with loaded event", () => {
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("loaded", dom);
  });

  afterEach(() => {
    dom = null;
    $html = null;
  });

  it("should display form", () => {
    const $html = $(dom);

    expect($html.find(".ag-modal-container")).toHaveLength(1);

    $confirmModal = $html.find(".ag-confirm-modal");
    expect($confirmModal).toHaveLength(1);
    expect($confirmModal[0]).toBeVisible();

    $cancelModal = $html.find(".ag-cancel-modal");
    expect($cancelModal).toHaveLength(1);
    expect($cancelModal[0]).not.toBeVisible();

    expect($html.find(".ag-confirm-modal h1")).toHaveLength(1);
    expect($html.find(".ag-confirm-modal h1").text()).toEqual(
      "Age Restricted Content"
    );
    expect($html.find(".ag-confirm-modal p")).toHaveLength(1);
    expect($html.find(".ag-confirm-modal p").text()).toEqual(
      "Please confirm you are above the legal drinking age in your country"
    );

    expect($html.find(".ag-confirm-modal .ag-confirm")).toHaveLength(1);
    expect($html.find(".ag-confirm-modal .ag-cancel")).toHaveLength(1);
  });

  describe("confirm", () => {
    it("should hide modal", () => {
      callback.mockReset();

      const $button = $html.find(".ag-options .ag-confirm");

      $button.click();
      $confirmModal = $html.find(".ag-confirm-modal");
      expect($confirmModal[0]).not.toBeVisible();

      $cancelModal = $html.find(".ag-cancel-modal");
      expect($cancelModal[0]).not.toBeVisible();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("confirmed", dom);
    });
  });

  describe("cancel", () => {
    beforeEach(() => {
      callback.mockReset();
      const $button = $html.find(".ag-options .ag-cancel");
      $button.click();
    });

    it("should trigger cancelled event", () => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("cancelled", dom);
    });

    it("should display cancel modal form", () => {
      $confirmModal = $html.find(".ag-confirm-modal");
      expect($confirmModal[0]).not.toBeVisible();

      $cancelModal = $html.find(".ag-cancel-modal");
      expect($cancelModal[0]).toBeVisible();

      expect($html.find(".ag-cancel-modal h1")).toHaveLength(1);
      expect($html.find(".ag-cancel-modal h1").text()).toEqual("Sorry!");
      expect($html.find(".ag-cancel-modal p")).toHaveLength(1);
      expect($html.find(".ag-cancel-modal p").text()).toEqual(
        "You need to be of legal drinking age to visit our website"
      );

      expect($html.find(".ag-cancel-modal .ag-close")).toHaveLength(1);
    });

    describe("close", () => {
      beforeEach(() => {
        callback.mockReset();
        const $button = $html.find(".ag-cancel-modal .ag-close");
        $button.click();
      });

      it("should trigger close event", () => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("closed", dom);
      });

      it("should hide modal", () => {
        $confirmModal = $html.find(".ag-confirm-modal");
        expect($confirmModal[0]).not.toBeVisible();

        $cancelModal = $html.find(".ag-cancel-modal");
        expect($cancelModal[0]).not.toBeVisible();
      });
    });
  });
});

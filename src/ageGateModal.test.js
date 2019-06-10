const $ = require("jquery");
const Modal = require("./ageGateModal");

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
  let dom, $html, modal;
  beforeEach(() => {
    jest.resetAllMocks();

    modal = new Modal(callback);

    dom = modal.dom;
    $html = $(dom);
  });

  describe("display", () => {
    it("should trigger callback with loaded event", () => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("loaded");
    });

    it("show provide references to dom elements", () => {
      expect(modal.dom).toEqual(expect.any(Element));
      expect(modal.confirmModal).toEqual(expect.any(Element));
      expect(modal.cancelModal).toEqual(expect.any(Element));
    });

    it("should display form", () => {
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
  });

  describe("destroy", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      modal.dom.remove = jest.fn();
      modal.destroy();
    });
    it("should destroy the dom", () => {
      expect(dom.remove).toHaveBeenCalledTimes(1);
    });

    it("should trigger callback with loaded event", () => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("destroyed");
    });

    it("should remove references to dom", () => {
      expect(modal.dom).toBe(null);
      expect(modal.confirmModal).toBe(null);
      expect(modal.cancelModal).toBe(null);
    });
  });

  describe("events", () => {
    describe("confirm", () => {
      beforeEach(() => {
        callback.mockReset();

        const $button = $html.find(".ag-options .ag-confirm");

        $button.click();

        expect(callback).toHaveBeenCalledTimes(2);
      });

      it("should trigger confirmed event", () => {
        expect(callback).toHaveBeenCalledWith("confirmed");
      });

      it("should trigger closed event", () => {
        expect(callback).toHaveBeenCalledWith("closed");
      });

      it("should hide modal", () => {
        $confirmModal = $html.find(".ag-confirm-modal");
        expect($confirmModal[0]).not.toBeVisible();

        $cancelModal = $html.find(".ag-cancel-modal");
        expect($cancelModal[0]).not.toBeVisible();
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
        expect(callback).toHaveBeenCalledWith("cancelled");
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
          expect(callback).toHaveBeenCalledWith("closed");
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
});

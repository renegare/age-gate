const $ = require("jquery");
const {
  Modal,
  ROLE_AGE_DAY,
  ROLE_AGE_MONTH,
  ROLE_AGE_YEAR,
  ROLE_CONFIRM
} = require("./ageGateModal");

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
    jest.useFakeTimers();

    modal = new Modal(callback);

    dom = modal.dom;
    $html = $(dom);
    jest.runAllTimers();
  });

  describe("display", () => {
    describe("initial state", () => {
      it("should trigger callback with loaded event", async () => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("loaded");
      });

      it("show provide references to root dom", () => {
        expect(modal.getDOM()).toEqual(expect.any(Element));
        expect(modal.confirmModal).toEqual(expect.any(Element));
        expect(modal.cancelModal).toEqual(expect.any(Element));
      });

      it("should not display cancel modal", () => {
        $cancelModal = $html.find(".ag-cancel-modal");
        expect($cancelModal).toHaveLength(1);
        expect($cancelModal[0]).not.toBeVisible();
      });

      describe.only("form modal", () => {
        let $confirmModal;
        beforeEach(() => {
          $confirmModal = $html.find(".ag-confirm-modal");
        });

        it("should display", () => {
          expect($confirmModal).toHaveLength(1);
          expect($confirmModal[0]).toBeVisible();
        });

        it("should display content", () => {
          expect($confirmModal.find("h1")).toHaveLength(1);
          expect($confirmModal.find("h1").text()).toEqual("GIN D'AZUR");
          expect($confirmModal.find("p")).toHaveLength(1);
          expect($confirmModal.find("p").text()).toEqual(
            "You must be of legal drinking age to enter"
          );
        });

        it("should display age fields", () => {
          expect(
            $confirmModal.find(`input[role=${ROLE_AGE_DAY}]`)
          ).toHaveLength(1);
          expect(
            $confirmModal.find(`input[role=${ROLE_AGE_MONTH}]`)
          ).toHaveLength(1);
          expect(
            $confirmModal.find(`input[role=${ROLE_AGE_YEAR}]`)
          ).toHaveLength(1);
        });

        it("should display confirm button", () => {
          expect($confirmModal.find(`[role=${ROLE_CONFIRM}]`)).toHaveLength(1);
        });
        // it('should display remember me field');
      });
    });
  });

  describe("destroy", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.useFakeTimers();
      modal.dom.remove = jest.fn();
      modal.destroy();
      jest.runAllTimers();
    });
    it("should destroy the dom", () => {
      expect(dom.remove).toHaveBeenCalledTimes(1);
    });

    it("should trigger callback with destroyed event", () => {
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
        jest.runAllTimers();
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
        jest.runAllTimers();
      });

      describe("close", () => {
        beforeEach(() => {
          callback.mockReset();
          const $button = $html.find(".ag-cancel-modal .ag-close");
          $button.click();
          jest.runAllTimers();
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

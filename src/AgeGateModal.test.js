const $ = require("jquery");
const { Modal, Roles, Events } = require("./ageGateModal");

const callback = jest.fn();

const TEMPLATE = `
<div>
  <div role="${Roles.CONFIRM_MODAL}">
    
    <h1>Age Restricted Content</h1>
    <p>Please confirm you are above the legal drinking age in your country</p>

    <button role="${Roles.CONFIRM}">Confirm</button>
    <button role="${Roles.CANCEL}">Cancel</button>
  </div>
  <div role="${Roles.CANCEL_MODAL}">
    <h1>Sorry!</h1>
    <p>You need to be of legal drinking age to visit our website</p>

    <button role="${Roles.CLOSE}">Close</button>
  </div>
</div>`;

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
        `expected DOM [role=${dom.getAttribute(
          "role"
        )}] not to contain the class hidden`,
      pass: !dom.classList.contains("hidden")
    };
  }
});

describe("ageGateForm", () => {
  let dom, $html, modal;
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();

    modal = new Modal(callback, TEMPLATE);

    dom = modal.dom;
    $html = $(dom);
    jest.runAllTimers();
  });

  describe("display", () => {
    it("should trigger callback with loaded event", async () => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("loaded");
    });

    it("show provide references to dom elements", () => {
      expect(modal.dom).toEqual(expect.any(Element));
      expect(modal.confirmModal).toEqual(expect.any(Element));
      expect(modal.cancelModal).toEqual(expect.any(Element));
    });

    it("should display form", () => {
      $confirmModal = $html.find(`[role=${Roles.CONFIRM_MODAL}]`);
      expect($confirmModal).toHaveLength(1);
      expect($confirmModal[0]).toBeVisible();

      $cancelModal = $html.find(`[role=${Roles.CANCEL_MODAL}]`);
      expect($cancelModal).toHaveLength(1);
      expect($cancelModal[0]).not.toBeVisible();

      expect(
        $html.find(`[role=${Roles.CONFIRM_MODAL}] [role=${Roles.CONFIRM}]`)
      ).toHaveLength(1);
      expect(
        $html.find(`[role=${Roles.CONFIRM_MODAL}] [role=${Roles.CANCEL}]`)
      ).toHaveLength(1);
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
      expect(callback).toHaveBeenCalledWith(Events.DESTROYED);
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

        const $button = $html.find(`[role=${Roles.CONFIRM}]`);

        $button.click();
        jest.runAllTimers();
        expect(callback).toHaveBeenCalledTimes(2);
      });

      it("should trigger confirmed event", () => {
        expect(callback).toHaveBeenCalledWith(Events.CONFIRMED);
      });

      it("should trigger closed event", () => {
        expect(callback).toHaveBeenCalledWith(Events.CLOSED);
      });

      it("should hide modal", () => {
        $confirmModal = $html.find(`[role=${Roles.CONFIRM_MODAL}]`);
        expect($confirmModal[0]).not.toBeVisible();

        $cancelModal = $html.find(`[role=${Roles.CANCEL_MODAL}]`);
        expect($cancelModal[0]).not.toBeVisible();
      });
    });

    describe("cancel", () => {
      beforeEach(() => {
        callback.mockReset();
        const $button = $html.find(`[role=${Roles.CANCEL}]`);
        $button.click();
        jest.runAllTimers();
      });

      it("should trigger cancelled event", () => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(Events.CANCELLED);
      });

      it("should display cancel modal form", () => {
        $confirmModal = $html.find(`[role=${Roles.CONFIRM_MODAL}]`);
        expect($confirmModal[0]).not.toBeVisible();

        $cancelModal = $html.find(`[role=${Roles.CANCEL_MODAL}]`);
        expect($cancelModal[0]).toBeVisible();

        expect(
          $html.find(`[role=${Roles.CANCEL_MODAL}] [role=${Roles.CLOSE}]`)
        ).toHaveLength(1);
      });

      describe("closed", () => {
        beforeEach(() => {
          callback.mockReset();
          const $button = $html.find(
            `[role=${Roles.CANCEL_MODAL}] [role=${Roles.CLOSE}]`
          );
          $button.click();
          jest.runAllTimers();
        });

        it("should trigger closed event", () => {
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(Events.CLOSED);
        });

        it("should hide modal", () => {
          $confirmModal = $html.find(`[role=${Roles.CONFIRM_MODAL}]`);
          expect($confirmModal[0]).not.toBeVisible();

          $cancelModal = $html.find(`[role=${Roles.CANCEL_MODAL}]`);
          expect($cancelModal[0]).not.toBeVisible();
        });
      });
    });
  });
});

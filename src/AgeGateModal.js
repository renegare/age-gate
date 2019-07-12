const Roles = Object.freeze({
  CONFIRM: "confirm",
  CANCEL: "cancel",
  CLOSE: "close",
  CONFIRM_MODAL: "confirm_modal",
  CANCEL_MODAL: "cancel_modal"
});

const Events = Object.freeze({
  LOADED: "loaded",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  CLOSED: "closed",
  DESTROYED: "destroyed"
});

const HIDDEN_CLASS = "hidden";

const noOp = () => {};

class Modal {
  constructor(listener, template) {
    this.listener = listener || noOp;
    this.dom = null;
    this.confirmModal = null;
    this.cancelModal = null;
    this.loadModal(template);
  }

  trigger(event) {
    setTimeout(() => {
      this.listener(event);
    });
  }

  getDOM() {
    return this.dom;
  }

  loadModal(template) {
    const dom = document.createElement("div");
    dom.innerHTML = template;
    dom.addEventListener("click", this.handleOptions.bind(this));

    this.confirmModal = dom.querySelector(`[role=${Roles.CONFIRM_MODAL}]`);
    this.cancelModal = dom.querySelector(`[role=${Roles.CANCEL_MODAL}]`);
    this.cancelModal.classList.add(HIDDEN_CLASS);

    this.dom = dom;
    this.trigger(Events.LOADED);
  }

  destroy() {
    this.dom.remove();
    this.dom = null;
    this.confirmModal = null;
    this.cancelModal = null;
    this.trigger(Events.DESTROYED);
  }

  handleOptions(event) {
    const role = event.target.getAttribute("role");
    switch (role) {
      case Roles.CONFIRM:
      case Roles.CLOSE:
        this.confirmModal.classList.add(HIDDEN_CLASS);
        this.cancelModal.classList.add(HIDDEN_CLASS);
        if (role === Roles.CONFIRM) {
          this.trigger(Events.CONFIRMED);
        }
        this.trigger(Events.CLOSED);
        break;
      case Roles.CANCEL:
        this.confirmModal.classList.add(HIDDEN_CLASS);
        this.cancelModal.classList.remove(HIDDEN_CLASS);
        this.trigger(Events.CANCELLED);
        break;
    }
  }
}

module.exports = {
  Modal,
  Roles,
  Events,
  HIDDEN_CLASS
};

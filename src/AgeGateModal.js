const Roles = Object.freeze({
  CONFIRM: "confirm",
  CANCEL: "cancel",
  CLOSE: "close"
});

const Events = Object.freeze({
  LOADED: "loaded",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  CLOSED: "closed",
  DESTROYED: "destroyed"
});

const noOp = () => {};

class Modal {
  constructor(listener) {
    this.listener = listener || noOp;
    this.dom = null;
    this.confirmModal = null;
    this.cancelModal = null;
    this.loadModal();
  }

  trigger(event) {
    setTimeout(() => {
      this.listener(event);
    });
  }

  getDOM() {
    return this.dom;
  }

  loadModal() {
    const dom = document.createElement("div");
    dom.innerHTML = `<div class="ag-modal-container">
      <div class="ag-confirm-modal">
        <div class="ag-content">
          <h1>Age Restricted Content</h1>
          <p>Please confirm you are above the legal drinking age in your country</p>
        </div>

        <div class="ag-options">
          <button class="ag-confirm" role="${Roles.CONFIRM}">Confirm</button>
          <button class="ag-cancel" role="${Roles.CANCEL}">Cancel</button>
        </div>
      </div>
      <div class="ag-cancel-modal hidden">
        <div class="ag-content">
          <h1>Sorry!</h1>
          <p>You need to be of legal drinking age to visit our website</p>
        </div>
        <div class="ag-options">
          <button class="ag-close" role="${Roles.CLOSE}">Close</button>
        </div>
      </div>
    </div>`;
    dom.addEventListener("click", this.handleOptions.bind(this));

    this.confirmModal = dom.querySelector(".ag-confirm-modal");
    this.cancelModal = dom.querySelector(".ag-cancel-modal");

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
        this.confirmModal.classList.add("hidden");
        this.cancelModal.classList.add("hidden");
        if (role === Roles.CONFIRM) {
          this.trigger(Events.CONFIRMED);
        }
        this.trigger(Events.CLOSED);
        break;
      case Roles.CANCEL:
        this.confirmModal.classList.add("hidden");
        this.cancelModal.classList.remove("hidden");
        this.trigger(Events.CANCELLED);
        break;
    }
  }
}

module.exports = {
  Modal,
  Roles,
  Events
};

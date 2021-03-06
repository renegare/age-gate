const ROLE_CONFIRM = "confirm";
const ROLE_CANCEL = "cancel";
const ROLE_CLOSE = "close";
const ROLE_AGE_DAY = "day";
const ROLE_AGE_MONTH = "month";
const ROLE_AGE_YEAR = "year";

const EVENT_LOADED = "loaded";
const EVENT_CONFIRMED = "confirmed";
const EVENT_CANCELLED = "cancelled";
const EVENT_CLOSED = "closed";
const EVENT_DESTROYED = "destroyed";

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
          <h1>GIN D'AZUR</h1>
          <p>You must be of legal drinking age to enter</p>
        </div>

        <form>
          <input role="${ROLE_AGE_DAY}" placeholder="DD"/>
          <input role="${ROLE_AGE_MONTH}" placeholder="DD"/>
          <input role="${ROLE_AGE_YEAR}" placeholder="DD"/>
        </form>

        <div class="ag-options">
          <button class="ag-confirm" role="${ROLE_CONFIRM}">ENTER</button>
        </div>
      </div>
      <div class="ag-cancel-modal hidden">
        <div class="ag-content">
          <h1>Sorry!</h1>
          <p>You need to be of legal drinking age to visit our website</p>
        </div>
        <div class="ag-options">
          <button class="ag-close" role="${ROLE_CLOSE}">Close</button>
        </div>
      </div>
    </div>`;
    dom.addEventListener("click", this.handleOptions.bind(this));

    this.confirmModal = dom.querySelector(".ag-confirm-modal");
    this.cancelModal = dom.querySelector(".ag-cancel-modal");

    this.dom = dom;
    this.trigger(EVENT_LOADED);
  }

  destroy() {
    this.dom.remove();
    this.dom = null;
    this.confirmModal = null;
    this.cancelModal = null;
    this.trigger(EVENT_DESTROYED);
  }

  handleOptions(event) {
    const role = event.target.getAttribute("role");
    switch (role) {
      case ROLE_CONFIRM:
      case ROLE_CLOSE:
        this.confirmModal.classList.add("hidden");
        this.cancelModal.classList.add("hidden");
        if (role === ROLE_CONFIRM) {
          this.trigger(EVENT_CONFIRMED);
        }
        this.trigger(EVENT_CLOSED);
        break;
      case ROLE_CANCEL:
        this.confirmModal.classList.add("hidden");
        this.cancelModal.classList.remove("hidden");
        this.trigger(EVENT_CANCELLED);
        break;
    }
  }
}

module.exports = {
  Modal,
  ROLE_AGE_DAY,
  ROLE_AGE_MONTH,
  ROLE_AGE_YEAR,
  ROLE_CONFIRM
};

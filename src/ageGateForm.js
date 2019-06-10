const createElements = require("./createElements");
const insertAfter = require("./insertAfter");

const ROLE_CONFIRM = "confirm";
const ROLE_CANCEL = "cancel";
const ROLE_CLOSE = "close";

const EVENT_LOADED = "loaded";
const EVENT_CONFIRMED = "confirmed";
const EVENT_CANCELLED = "cancelled";
const EVENT_CLOSED = "closed";

const noOp = () => {};

const display = cb => {
  cb = cb || noOp;

  const dom = document.createElement("div");
  dom.innerHTML = `<div class="ag-modal-container">
    <div class="ag-confirm-modal">
      <div class="ag-content">
        <h1>Age Restricted Content</h1>
        <p>Please confirm you are above the legal drinking age in your country</p>
      </div>

      <div class="ag-options">
        <button class="ag-confirm" role="${ROLE_CONFIRM}">Confirm</button>
        <button class="ag-cancel" role="${ROLE_CANCEL}">Cancel</button>
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

  const confirmModal = dom.querySelector(".ag-confirm-modal");
  const cancelModal = dom.querySelector(".ag-cancel-modal");

  dom.addEventListener("click", (a, b, c) => {
    const role = a.target.getAttribute("role");
    switch (role) {
      case ROLE_CONFIRM:
        confirmModal.classList.add("hidden");
        cb(EVENT_CONFIRMED, dom);
        break;
      case ROLE_CANCEL:
        confirmModal.classList.add("hidden");
        cancelModal.classList.remove("hidden");
        cb(EVENT_CANCELLED, dom);
        break;
      case ROLE_CLOSE:
        confirmModal.classList.add("hidden");
        cancelModal.classList.add("hidden");
        cb(EVENT_CLOSED, dom);
        break;
    }
  });

  cb(EVENT_LOADED, dom);
};

module.exports = {
  display
};

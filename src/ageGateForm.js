const createElements = require("./createElements");
const insertAfter = require("./insertAfter");

const display = () => {
  const dom = document.createElement("div");
  dom.innerHTML = `<div class="ag-modal-container">
    <div class="ag-confirm-modal visible">
      <div class="ag-content">
        <h1>Age Restricted Content</h1>
        <p>Please confirm you are above the legal drinking age in your country</p>
      </div>

      <div class="ag-options">
        <button class="ag-confirm">Confirm</button>
        <button class="ag-cancel">Cancel</button>
      </div>
    </div>
    <div class="ag-cancel-modal hidden"></div>
  </div>`;
  insertAfter(dom);
};

module.exports = {
  display
};

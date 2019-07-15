const cookies = require("./cookies");
const { Modal } = require("./modal");
const { Roles, HIDDEN_CLASS } = require("./constants");

const AGE_GATE_COOKIE_NAME = "ac";

const LOADED = "loaded";
const CONFIRMED = "confirmed";
const CLOSED = "closed";

module.exports = {
  init: template => {
    const isValid = cookies.get(AGE_GATE_COOKIE_NAME);
    if (!isValid) {
      let firstChild = document.body.children[0];
      const modal = new Modal(template, event => {
        switch (event) {
          case LOADED:
            document.body.insertBefore(modal.getDOM(), firstChild);
            firstChild.classList.add(HIDDEN_CLASS);
            break;
          case CONFIRMED:
            cookies.set(AGE_GATE_COOKIE_NAME, "true", 24 * 60 * 60 * 1000);
            break;
          case CLOSED:
            modal.destroy();
            firstChild.classList.remove(HIDDEN_CLASS);
            break;
        }
      });
    }
  }
};

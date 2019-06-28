const cookies = require("./cookies");
const { Modal } = require("./AgeGateModal");

const AGE_GATE_COOKIE_NAME = "ac";

const LOADED = "loaded";
const CONFIRMED = "confirmed";
const CLOSED = "closed";

module.exports = () => {
  const isValid = cookies.get(AGE_GATE_COOKIE_NAME);
  if (!isValid) {
    const modal = new Modal(event => {
      switch (event) {
        case LOADED:
          document.body.insertBefore(modal.getDOM(), document.body.firstChild);
          break;
        case CONFIRMED:
          cookies.set(AGE_GATE_COOKIE_NAME, "true", 24 * 60 * 60 * 1000);
          break;
        case CLOSED:
          modal.destroy();
          break;
      }
    });
  }
};

const cookies = require("./cookies");
const form = require("./ageGateForm");

const AGE_GATE_COOKIE_NAME = "ac";

module.exports = () => {
  const isValid = cookies.get(AGE_GATE_COOKIE_NAME);
  if (isValid) {
    form.display();
  }
};

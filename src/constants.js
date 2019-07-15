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

module.exports = {
  noOp,
  Roles,
  Events,
  HIDDEN_CLASS
};

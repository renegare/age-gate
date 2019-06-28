console.log("loading mock file");
const mockGetDOM = jest.fn();
const Modal = jest.fn().mockImplementation(() => {
  console.log("Calling constructor");
  return { getDOM: mockGetDOM };
});

module.exports = {
  Modal,
  mockGetDOM
};

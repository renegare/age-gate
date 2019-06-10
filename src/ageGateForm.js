const createElements = require("./createElements");
const insertAfter = require("./insertAfter");
const AG_DOM_STRUCTURE = [
  {
    tag: "div",
    className: "ag-container",
    children: [
      {
        tag: "div",
        className: "ag-modal",
        children: [
          {
            tag: "div",
            className: "ag-content",
            children: [
              {
                tag: "h1",
                children: ["Age Restricted Content"]
              },
              {
                tag: "p",
                children: [
                  "Please confirm you are above the legal drinking age in your country"
                ]
              }
            ]
          },
          {
            tag: "div",
            className: "ag-options",
            children: [
              {
                tag: "button",
                className: "ag-confirm"
              },
              {
                tag: "button",
                className: "ag-cancel"
              }
            ]
          }
        ]
      }
    ]
  }
];

const display = () => {
  const dom = document.createElement("div");
  dom.innerHTML = `<div class="ag-modal"></div>`;
  insertAfter(dom);
};

module.exports = {
  display
};

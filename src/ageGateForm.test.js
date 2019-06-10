const $ = require("jquery");
const createElements = require("./createElements");
const insertAfter = require("./insertAfter");
const form = require("./ageGateForm");

jest.mock("./createElements", () => jest.fn());
jest.mock("./insertAfter", () => jest.fn());

const EXPECTED_DOM_STRUCTURE = [
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

describe("ageGateForm", () => {
  it("should display form", () => {
    form.display();

    expect(insertAfter).toHaveBeenCalledTimes(1);
    expect(insertAfter).toHaveBeenCalledWith(expect.any(Element));

    const $html = $(insertAfter.mock.calls[0]);
    console.log($html.find(".ag-modal"));
  });

  // describe("confirm", () => {
  //   it("should set cookie");

  //   it("should close form");
  // });

  // describe("cancel", () => {
  //   it("should not set the cookie");

  //   it("should close form");
  // });
});

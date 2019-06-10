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

    expect($html.find(".ag-modal-container")).toHaveLength(1);

    expect($html.find(".ag-confirm-modal.visible")).toHaveLength(1);

    expect($html.find(".ag-confirm-modal h1")).toHaveLength(1);
    expect($html.find(".ag-confirm-modal h1").text()).toEqual(
      "Age Restricted Content"
    );
    expect($html.find(".ag-confirm-modal p")).toHaveLength(1);
    expect($html.find(".ag-confirm-modal p").text()).toEqual(
      "Please confirm you are above the legal drinking age in your country"
    );

    expect($html.find(".ag-options .ag-confirm")).toHaveLength(1);
    expect($html.find(".ag-options .ag-cancel")).toHaveLength(1);

    expect($html.find(".ag-cancel-modal.hidden")).toHaveLength(1);
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

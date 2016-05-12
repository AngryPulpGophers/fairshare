import React from "react";
import { shallow } from "enzyme";
import Profile from "../../client/components/profile";


describe('Component : Profile ', () => {
    beforeEach(function() {
      let {TestUtils} = React.addons;

      this.component = TestUtils.renderIntoDocument(<Profile initialName="my first test" />);
      this.renderedDOM = () => React.findDOMNode(this.component);
    });

    it("renders a paragraph which greets someone", function() {
      let renderedParagraphs = this.renderedDOM().querySelectorAll("div");

      expect(this.renderedDOM().children.length).toEqual(1);
      expect(renderedParagraphs.length).toEqual(1);
      expect(renderedParagraphs[0].textContent).toEqual("Hello, my first test!");
  });

  // it("wraps a paragraph with a <div> with a proper class name", function() {
  //   let rootElement = this.renderedDOM();

  //   expect(rootElement.tagName).toEqual("DIV");
  //   expect(rootElement.classList.length).toEqual(1);
  //   expect(rootElement.classList[0]).toEqual("greeter");
  // });
});

// it renders three input fields
// one is labeled name
    // it contains text of username

// one is labeled username
    // it contains username
    // username can't be longer than 40 chars

// one is labeled email
    // it must be a valid email
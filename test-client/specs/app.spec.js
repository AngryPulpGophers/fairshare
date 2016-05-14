import React from "react";
import { shallow } from "enzyme";

import RootProd from "../../client/containers/app";
  const wrapper = shallow( <div/>);

  describe('FrontEnd @app.js container renders an element', () => {
  it('renders as a  <Navigation/> element', () => {
    expect(wrapper.type()).to.eql('div');
  });
});

// jshint undef:false
import React from "react";
import { shallow } from "enzyme";

import RootProd from "../../client/containers/app";

  describe('FrontEnd : app.js wrapper ', () => {
  it('renders as a  <Navigation/> element', () => {
    const wrapper = shallow( <div/>);
    expect(wrapper.type()).to.eql('div');
  });

});

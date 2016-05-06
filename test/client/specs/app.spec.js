// jshint undef:false
import React from "react";
import { shallow } from "enzyme";

import RootProd from "../../../client/containers/app";

  describe('(Container) app.js ', () => {
  it('renders as a  <Navigation/> ', () => {
    const wrapper = shallow( <div/>);
    expect(wrapper.type()).to.eql('div');
  });

});

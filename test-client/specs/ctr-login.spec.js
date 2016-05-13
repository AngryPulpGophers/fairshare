import React from "react";
import { shallow } from "enzyme";
import Login from "../../client/containers/page-login";


describe('Front End @Login Container', () => {
  const wrapper = shallow( <div/>);
    it('renders as a  <Login/> element', () => {
      expect(wrapper.type()).to.eql('div');
    });
});
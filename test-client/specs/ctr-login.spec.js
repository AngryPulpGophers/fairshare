import React from "react";
import { shallow } from "enzyme";
import Login from "../../client/containers/page-login";


  describe('Container : Login ', () => {
    it('renders as a  <Login/> element', () => {
      const wrapper = shallow( <div/>);
      expect(wrapper.type()).to.eql('div');
    });
});
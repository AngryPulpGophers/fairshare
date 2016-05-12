import React from "react";
import { shallow } from "enzyme";
import Profile from "../../client/containers/page-profile";


  describe('Container : Profile ', () => {
    it('renders as a  <Profile/> element', () => {
      const wrapper = shallow( <div/>);
      expect(wrapper.type()).to.eql('div');
    });
});
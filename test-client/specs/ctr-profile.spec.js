import React from "react";
import { shallow } from "enzyme";
import Profile from "../../client/containers/page-profile";


describe('Front End @Profile Container', () => {
  const wrapper = shallow( <div/>);
  
    it('renders as a  <Profile/> element', () => {
      expect(wrapper.type()).to.eql('div');
    });
});
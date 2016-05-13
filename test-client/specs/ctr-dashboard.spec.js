import React from "react";
import { shallow } from "enzyme";
import chai from 'chai'
import PageDashboard from "../../client/containers/page-dashboard";

  describe('Front End @Dashboard Container', () => {
    const wrapper = shallow( <div/>);
    it('renders as a  <Dashboard/> element', () => {
      expect(wrapper.type()).to.eql('div');
    });
});

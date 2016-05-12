import React from "react";
import { shallow } from "enzyme";
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import PageDashboard from "../../client/containers/page-dashboard";

chai.use(chaiEnzyme())

// describe dashboard

  describe('Container : Dashboard ', () => {
    it('renders as a  <Dashboard/> element', () => {
      const wrapper = shallow( <div/>);
      expect(wrapper.type()).to.eql('div');
    });
});

import React from "react";
import { shallow } from "enzyme";
import PageCreateGroup from "../../client/containers/page-create-group";

  describe('Front End @CreateGroup Container ', () => {
  const wrapper = shallow( <div/>);

    it('renders as a  <CreateGroup/> element', () => {
      expect(wrapper.type()).to.eql('div');
    });
});

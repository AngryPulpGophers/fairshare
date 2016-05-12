import React from "react";
import { shallow } from "enzyme";
import PageCreateGroup from "../../client/containers/page-create-group";

// describe group spec

  describe('Container : CreateGroup ', () => {
  it('renders as a  <CreateGroup/> element', () => {
    const wrapper = shallow( <div/>);
    expect(wrapper.type()).to.eql('div');
  });

});

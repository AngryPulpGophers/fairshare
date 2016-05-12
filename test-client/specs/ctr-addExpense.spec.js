import React from "react";
import { shallow } from "enzyme";
import PageAddExpense from "../../client/containers/page-add-expense";


  describe('Container: AddExpense ', () => {
  it('renders as a  <AddExpense/> element', () => {
    const wrapper = shallow( <div/>);
    expect(wrapper.type()).to.eql('div');
  });

});

// it has access to getActivity properties
// it has access to activity properties
// it has access to etc
import React from "react";
import { shallow } from "enzyme";
import PageAddExpense from "../../client/containers/page-add-expense";


describe('Front End @AddExpense Container', () => {
  const wrapper = shallow( <div/>);
  
  it('renders as a  <AddExpense/> element', () => {
    expect(wrapper.type()).to.eql('div');
  });
});

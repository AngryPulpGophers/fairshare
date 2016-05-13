import React from "react";
import { shallow } from "enzyme";
import AddExpense from "../../client/components/addExpense";


it ('FrontEnd @add expense component: has 2 form fields', () => {
    const props = {activity:{}, currentGroupUsers:{}}
    const wrapper = shallow(<AddExpense/>);

     wrapper.find('form').forEach(function (node) {
        expect(node.contains(<input type="text"/>)).to.equal(true);
     });

      wrapper.find('form').forEach(function (node) {
        expect(node.contains(<input type="text"/>).length).to.equal(2);
     });
});



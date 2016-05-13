import React from "react";
import { shallow } from "enzyme";
import Profile from "../../client/components/profile";

describe('Front End @Profile Component', () => {
  const wrapper = shallow(<Profile/>);

  console.log("wrapper_renderedComponent inside of profile ", wrapper.props);

    it ('should contain three form input fields ', () => {
      expect(wrapper.prop('fields').length).to.eql(3);
    });

    it('has an image element ', () => {
        wrapper.find('.image').forEach(function (node) {
        expect(node.hasClass('.image')).to.equal(true);
      });
    });

    it('has an name field ', () => {
      const context = { name: 'Christina Mitchell' };
      const wrapper = shallow(<Profile/>, { context });
         wrapper.find('div').forEach(function (node) {
          expect(wrapper.text()).to.equal('Christina Mitchell');
        });   
    });

    it('has a form ', () => {
        wrapper.find('div').forEach(function (node) {
        expect(node.hasClass('.profile-form')).to.equal(true);

      });
    });

});


// wrapper.find('button').simulate('click');
//     expect(onButtonClick.calledOnce).to.equal(true);
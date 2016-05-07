import React from "react";
import { shallow } from "enzyme";
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import PageDashboard from "../../../client/components/dashboard";

// shallow takes an element as it's argument

describe('Component : Dashboard - login', () => {

  it('renders without exploding', ()=> {
    expect(
      shallow(<Dashboard/>
      ).length
    ).isEqual(1);
  });
  
  // it(" handles clicking 'login' button ", () => {
  //   const wrapper = shallow( <Dashboard/>);
  //   // TestUtils.Simulate.click(dashboard.refs.createQuoteLink)
  //  // expect(wrapper.).to.have.been.called
  // })

  //   it('simulates click events to /login', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(
  //     <Dashboard onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });

})

// access className "component-wrapper"
// try the /login
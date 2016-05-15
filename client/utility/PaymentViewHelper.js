import React from 'react';

var PayHelp = module.exports;

//obj in function params is refering to 'this' when the function is called in context

//fires onChange event in paymentForm--redux form wouldn't capture value associated with button
//This updates a local state variable with the chosen userID.

PayHelp.getRadioButtons = (elementClass) => {
  let elements = document.getElementsByClassName(elementClass);
  for(var i = 0; i< elements.length; i++){
  	if(elements[i].checked){
  		return elements[i].value;
  	}
  }
};

//builds up object for post request to payments

PayHelp.buildPaymentEntry = (obj,data) => {
  data.group_id= window.location.href.split('=')[1];
  data.recipient = obj.state.chosenOne;
  data.payee = obj.props.userInfo.id;
  data.amount = Number(data.amount);
  data.group_id = Number(data.group_id);
  data.pending = 1;
  obj.props.destroyForm();
  return data;
};

PayHelp.handleSubmit = (obj,data) => {
  obj.setState({isModalOpen:false, chosenOne: null});
  data = PayHelp.buildPaymentEntry(obj,data);
  console.log('data in form:', data);
  if(sessionStorage.getItem('cash')){
    delete data.email;
    sessionStorage.clear();
    obj.props.makePayment(JSON.stringify(data));
  }else{
    let dbPaymentEntry = Object.assign({},data);
    delete dbPaymentEntry.email;
    data.returnURL = window.location.href.match(/g.+/)[0];
    sessionStorage.clear();
    obj.props.usePaypal(JSON.stringify(data),JSON.stringify(dbPaymentEntry));
  }
};

//following functions controls form modal

PayHelp.openModal = (obj) => {
  obj.setState({isModalOpen: true});
};

PayHelp.closeModal = (obj) => {
  obj.setState({isModalOpen: false});
};


PayHelp.makeRadioButton = (data,obj) => {
    return (
      <label key={data.user_id}><input className='recip' name='recipient' onChange={obj.onChange} type='radio' value={data.user_id} required/>{data.name}</label>
    )
  }

//creates JSX elements for form radio buttons using previous func while excluding the signed in user;

PayHelp.memberButtons = (obj,func) => obj.props.groupMembers.filter( member => {
  return member.user_id !== obj.props.userInfo.id;
  }).map( member => {
    return func(member,obj);
  })



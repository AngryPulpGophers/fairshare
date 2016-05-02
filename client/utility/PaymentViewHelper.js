import React from 'react';

var PayHelp = module.exports

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
}

//builds up object for post request to payments

PayHelp.buildPaymentEntry = (obj,data) => {
  data.group_id= window.location.href.split('=')[1];
  data.recipient = obj.state.chosenOne;
  data.payee = obj.props.userInfo.id;
  data.amount = Number(data.amount);
  data.group_id = Number(data.group_id);
  obj.props.destroyForm();
  return data;
}

//following functions control both form modal and inner modal using local state variable

PayHelp.openModal = (obj) => {
    if(obj.state.isModalOpen){
      obj.setState({isInnerModalOpen: true})
    }else{
      obj.setState({isModalOpen: true})
    }
  }

PayHelp.closeModal = (obj) => {
    if(obj.state.isInnerModalOpen){
      obj.setState({isInnerModalOpen: false});
    }else{
      obj.setState({isModalOpen: false})
    }

  }


PayHelp.makeRadioButton = (data,obj) => {
    return (
      <label><input className='recip' name='recipient' onChange={obj.onChange} type='radio' value={data.user_id}/>{data.name}</label>
    )
  }
//creates JSX elements for form radio buttons using previous func while excluding the signed in user;

PayHelp.memberButtons = (obj,func) => obj.props.groupMembers.filter( member => {
      return member.user_id !== obj.props.userInfo.id;
    }).map( member => { 
      return func(member,obj);  
    })



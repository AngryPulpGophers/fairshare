import React from 'react';

var SocialHelper = module.exports;

SocialHelper.assignSpecificProps = (obj) => {
	var socialObj = {};
	socialObj.id = obj.id
	socialObj.primary = obj.primary;
	socialObj.Facebook = obj.facebook;
	socialObj.Google = obj.google;
	socialObj.PayPal = obj.paypal;
	return socialObj;
} 


SocialHelper.makeButtons = (socialObj,key, context) => {
  let smallKey = key.toLowerCase();
  let id = socialObj.id;
  let primary = socialObj.primary;
  
  if(primary !== key){
	  return (
      <button className="button info button tiny" onClick={()=> context.props.unlinkSocialAcc({id:{id}, smallKey:0, provider:{smallKey}})}><i className="fa fa-lock"></i>{key}</button>
    )
  }else{
  	return (
  	  <div> You are logged in with: {primary}</div>
  	)
  }
}

SocialHelper.makeAnchors = (key) => {
	let ref = 'auth/'+key.toLowerCase();
	return(
	  <a href= {ref} className="button alert button tiny"><i className="fa fa-unlock"></i>{key}</a>
  )
}


SocialHelper.createLinkedAccounts = (obj, buttonMaker, anchorMaker, context) => {
	let socialAccounts = SocialHelper.assignSpecificProps(obj);
	let [buttons,anchors] = [[],[]];

	for(var key in socialAccounts){
	  if(key !== 'id' && key !== 'primary'){
		  if(!socialAccounts[key]){
        anchors.push(anchorMaker(key))
		  }else{
		    buttons.push(buttonMaker(socialAccounts, key, context))
		  }
	  }
	}
	return [buttons,anchors];
}

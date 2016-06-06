"use strict";

import React from 'react';

var SocialHelper = module.exports;

SocialHelper.assignSpecificProps = (obj) => {
  let socialObj = {
    id:       obj.id,
    primary:  obj.primary,
    facebook: obj.facebook,
    google:   obj.google,
    //paypal:   obj.paypal
  };

  return socialObj;
};


SocialHelper.makeButtons = (socialObj,key, context, fClass) => {
  let authSource = key;
  let id = socialObj.id;
  let primary = socialObj.primary.toLowerCase();

  if(primary !== key){
	  return (
      <button className= {fClass} onClick={()=> context.props.unlinkSocialAcc({id:id, provider:authSource})}><i className="fa fa-lock"></i>{key}</button>
    )
  }else{
  	return (
  	  <div> You are logged in with: {socialObj.primary}</div>
  	)
  }
}

SocialHelper.makeAnchors = (key, fClass) => {
	let ref = 'auth/'+key.toLowerCase();
	return(
	  <a href= {ref} key={key} className={fClass}><i className="fa fa-unlock"></i>{key}</a>
  )
}


SocialHelper.createLinkedAccounts = (obj, context) => {
	let socialAccounts = SocialHelper.assignSpecificProps(obj);
	let [buttons,anchors] = [[],[]];

	for(let key in socialAccounts){
	  if(key !== 'id' && key !== 'primary'){
		  if(!socialAccounts[key]){
        anchors.push(SocialHelper.makeAnchors(key,"button alert button tiny"))
		  }else{
		    buttons.push(SocialHelper.makeButtons(socialAccounts, key, context, "button info button tiny"))
		  }
	  }
	}
	return [buttons.sort((a,b) => b.type - a.type),anchors];
}

SocialHelper.createModalAnchors = (obj) => {
	let [socialAccounts,links] = [{},[]];
	socialAccounts.facebook = obj.facebook;
	socialAccounts.google = obj.google;
	for(let key in socialAccounts){
		if(!socialAccounts[key]){
			links.push(SocialHelper.makeAnchors(key,"button info extended block"));
		}
	}
	return links;
}

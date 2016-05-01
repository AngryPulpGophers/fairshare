import { CALL_API } from '../middleware';

export const PAYMENT_REQUEST = 'CREATE_REQUEST';
export const PAYMENT_SUCCESS = 'CREATE_SUCCESS';
export const PAYMENT_FAILURE = 'CREATE_FAILURE';

export function makePayment(members, formData) {
  console.log('called Payment action with:', members, formData);
  // return {
  //   [CALL_API]: {
  //     endpoint: 'groups',
  //     body: processPayment(members,formData),
  //     req: 'POST',
  //     types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE]
  //   }

  // }
}


function processGroup(members,formData){
  console.log('all our stuff:', members, formData)
  let paymentObj = {};
  groupObj.name = formData.groupName.value;
  groupObj.desc = formData.groupDesc.value;
  groupObj.members= [];
  for(var i = 0; i < members.length; i++){
    groupObj.members.push(Number(members[i].value))
  }
  return JSON.stringify(groupObj);
}


// req.body = {
//   group_id: 'group id number',
//   payee: 'your user id number',
//   recipient: 'recipients user id number',
//   amount: 'number with 2 decimals, max 8 digits',
//   note: 'text'
// };
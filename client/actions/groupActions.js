import { CALL_API } from '../middleware';

export const GROUPS_REQUEST = 'GROUPS_REQUEST';
export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
export const GROUPS_FAILURE = 'GROUPS_FAILURE';

export function getGroups() {
  // console.log('got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'groups/',
      req: 'GET',
      types: [GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE]
    }
  }
}

export const GROUP_CLEAR = 'GROUP_CLEAR';
export function clearEdit() {
  return {
      type: GROUP_CLEAR
  }
}
export const ACTIVITY_CLEAR = 'ACTIVITY_CLEAR';
export function clearActivity() {
  return {
      type: ACTIVITY_CLEAR
  }
}

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE';

export function updateGroup(members,formData, id) {
  //console.log('$$$$$$$$$$$$got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'groups/',
      body: processGroup(members,formData, id),
      id: id,
      req: 'PUT',
      types: [UPDATE_GROUP_REQUEST, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAILURE]
    }
  }
}

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';
export const GROUP_FAILURE = 'GROUP_FAILURE';

export function getGroup(id) {
  //console.log('$$$$$$$$$$$$got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'groups/'+id,
      req: 'GET',
      types: [GROUP_REQUEST, GROUP_SUCCESS, GROUP_FAILURE]
    }
  }
}

export const ACTIVITY_REQUEST = 'ACTIVITY_REQUEST';
export const ACTIVITY_SUCCESS = 'ACTIVITY_SUCCESS';
export const ACTIVITY_FAILURE = 'ACTIVITY_FAILURE';

export function getActivity(id) {
  return {
    [CALL_API]: {
      endpoint: 'groups/activity/'+id,
      id: id,
      req: 'GET',
      types: [ACTIVITY_REQUEST, ACTIVITY_SUCCESS, ACTIVITY_FAILURE]
    }
  }
}

export const CURRENT_GROUP = 'CURRENT_GROUP';
export function setCurrentGroup(id) {
  return {
      type: CURRENT_GROUP,
      id: id
  }
}

export const USERBYGROUP_REQUEST = 'USERBYGROUP_REQUEST';
export const USERBYGROUP_SUCCESS = 'USERBYGROUP_SUCCESS';
export const USERBYGROUP_FAILURE = 'USERBYGROUP_FAILURE';

export function getUserByGroup(id) {
   //console.log('pj got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'groups/users/'+id,
      id: id,
      types: [USERBYGROUP_REQUEST, USERBYGROUP_SUCCESS, USERBYGROUP_FAILURE]

    }
  }
}

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export function createGroup(members, formData) {
  //console.log('called actions with:', members, formData)
  return {
    [CALL_API]: {
      endpoint: 'groups',
      body: processGroup(members,formData),
      req: 'POST',
      types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE]
    }
  }
}

export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export function deleteGroup(id) {
  //console.log('triggered', id)
  return {
    [CALL_API]: {
      endpoint: 'groups/'+id.id,
      req: 'DELETE',
      types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE]
    }
  }
}

export const EXPENSE_REQUEST = 'EXPENSE_REQUEST';
export const EXPENSE_SUCCESS = 'EXPENSE_SUCCESS';
export const EXPENSE_FAILURE = 'EXPENSE_FAILURE';

export function addExpense(formData) {
  //console.log('called actions with:', members, formData)
  return {
    [CALL_API]: {
      endpoint: 'groups/expenses',
      body: formData,
      req: 'POST',
      types: [EXPENSE_REQUEST, EXPENSE_SUCCESS, EXPENSE_FAILURE]
    }
  }
}

export const UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_FAILURE = 'UPDATE_EXPENSE_FAILURE';

export function updateExpense(formData,id) {
  //console.log('called actions with:', members, formData)
  return {
    [CALL_API]: {
      id: id,
      endpoint: 'groups/expenses',
      body: formData,
      req: 'PUT',
      types: [UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAILURE]
    }

  }
}


export const PAYMENT_REQUEST = 'PAYMENT_REQUEST';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';

export function makePayment(formData) {
  sessionStorage.clear();
  return {
    [CALL_API]: {
      endpoint: 'groups/payments',
      body: formData,
      req: 'POST',
      types: [PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE]
    }
  }
}

export const INDBALANCE_REQUEST = 'INDBALANCE_REQUEST';
export const INDBALANCE_SUCCESS = 'INDBALANCE_SUCCESS';
export const INDBALANCE_FAILURE = 'INDBALANCE_FAILURE';
//object should have properties of user id group id and balance to that group
export function indBalance(indObj) {
  //console.log('updated user balance to group:', indObj);
  return {
    [CALL_API]: {
      endpoint: 'groups/balance/',
      body: indObj,
      req: 'PUT',
      types: [INDBALANCE_REQUEST, INDBALANCE_SUCCESS, INDBALANCE_FAILURE]
    }
  }
}

export const PAYPAL_PAYMENT_REQUEST = 'PAYPAL_PAYMENT_REQUEST';
export const PAYPAL_PAYMENT_SUCCESS = 'PAYPAL_PAYMENT_SUCCESS';
export const PAYPAL_PAYMENT_FAILURE = 'PAYPAL_PAYMENT_FAILURE';


export function usePaypal(formData,dbEntry) {
  sessionStorage.setItem('locale', window.location.href);
  sessionStorage.setItem('dbEntry', dbEntry);
  return {
    [CALL_API]: {
      endpoint: 'payment/paypal',
      body: formData,
      req: 'POST',
      types: [PAYPAL_PAYMENT_REQUEST, PAYPAL_PAYMENT_SUCCESS, PAYPAL_PAYMENT_FAILURE],
    }
  }
}

export const UPDATE_PAYSTAT_REQUEST = 'UPDATE_PAYSTAT_REQUEST';
export const UPDATE_PAYSTAT_SUCCESS = 'UPDATE_PAYSTAT_SUCCESS';
export const UPDATE_PAYSTAT_FAILURE = 'UPDATE_PAYSTAT_FAILURE';

export function updatePaymentStatus(data) {
  //console.log('called Payment action with:', data);
  return {
    [CALL_API]: {
      endpoint: 'groups/payments',
      body: JSON.stringify(data),
      req: 'PUT',
      types: [UPDATE_PAYSTAT_REQUEST, UPDATE_PAYSTAT_SUCCESS, UPDATE_PAYSTAT_FAILURE]
    }

  }
}

export const CLEAR_ERROR = 'CLEAR_ERROR';
export function clearError() {
  sessionStorage.clear()
  return {
      type: CLEAR_ERROR,
  }
}

function processGroup(members,formData, id){
  //console.log('all our stuff:', members, formData, id)
  let groupObj = {};
  if(id != undefined){
   groupObj.id = id;
   } 

  groupObj.name = formData.groupName.value;
  groupObj.desc = formData.groupDesc.value;
  groupObj.members= [];
  for(var i = 0; i < members.length; i++){
    groupObj.members.push( Number(members[i].value || members[i].user_id))
  }
  //console.log('our entire group object to send to server', groupObj)
  return JSON.stringify(groupObj);
}

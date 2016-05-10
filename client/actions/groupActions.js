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

export const ACTIVITY_REQUEST = 'ACTIVITY_REQUEST';
export const ACTIVITY_SUCCESS = 'ACTIVITY_SUCCESS';
export const ACTIVITY_FAILURE = 'ACTIVITY_FAILURE';

export function getActivity(id) {
  // console.log('got an id:', id)
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
   console.log('pj got an id:', id)
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
  console.log('called actions with:', members, formData)
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
  console.log('triggered', id)
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

export const PAYMENT_REQUEST = 'PAYMENT_REQUEST';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';

export function makePayment(formData) {
  console.log('called Payment action with:', formData);
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
      endpoint: 'groups/balance/'+indObj.user_id+'/'+indObj.group_id+'/'+indObj.balance,
      body: indObj,
      req: 'PUT',
      types: [INDBALANCE_REQUEST, INDBALANCE_SUCCESS, INDBALANCE_FAILURE]
    }

  }
}






function processGroup(members,formData){
  console.log('all our stuff:', members, formData)
  let groupObj = {};
  groupObj.name = formData.groupName.value;
  groupObj.desc = formData.groupDesc.value;
  groupObj.members= [];
  for(var i = 0; i < members.length; i++){
    groupObj.members.push(Number(members[i].value))
  }
  return JSON.stringify(groupObj);
}

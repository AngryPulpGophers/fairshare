import { CALL_API } from '../middleware';

export const GROUPS_REQUEST = 'GROUPS_REQUEST';
export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
export const GROUPS_FAILURE = 'GROUPS_FAILURE';

export function getGroups(id) {
  // console.log('got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'groups',
      id: id,
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
      endpoint: 'groups/activity',
      id: id,
      req: 'GET',
      types: [ACTIVITY_REQUEST, ACTIVITY_SUCCESS, ACTIVITY_FAILURE]
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

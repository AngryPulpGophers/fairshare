import { CALL_API } from '../middleware';

export const MEMBER_ADDED = 'MEMBER_ADDED';

export function addMember(id) {
  // console.log('got an id:', id)
  return {
      type: MEMBER_ADDED,
      id: id,
  }

}

export const MEMBER_REMOVED = 'MEMBER_REMOVED';

export function removeMember(id) {
  // console.log('got an id:', id)
  return {
      type: MEMBER_REMOVED,
      id: id,
  }

}

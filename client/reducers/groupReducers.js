import * as ActionTypes from '../actions/groupActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
//console.log(ActionTypes);

export function groups(state = { isFetching: false, currentGroup: {}, isDeleting: false, newGroup:{}, groups: [],activity : [], currentGroupUsers: []}, action) {
    //console.log('groups actions:', action)
    switch (action.type) {

      // GET GROUP DATA
      case ActionTypes.GROUPS_REQUEST:
      return update(state, 
        {isFetching: {$set: true}}
        )

      case ActionTypes.GROUPS_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          groups: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.GROUPS_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      //set CURRENT group
      case ActionTypes.CURRENT_GROUP:
       console.log('time to set the current group with', action.id)
        return update(state, {
          currentGroup: {$set:{id:action.id}}
        })

      case ActionTypes.CREATE_REQUEST:
        return update(state, {
          isFetching: {$set: true}})

      case ActionTypes.CREATE_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          groups: {$push: [JSON.parse(action.response)]}
        })

      case ActionTypes.CREATE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

       //DELETE GROUP DATA
      case ActionTypes.DELETE_REQUEST:
        return update(state, 
          {isDeleting: {$set: true}}
        )

      case ActionTypes.DELETE_SUCCESS:
      console.log('HERE is OUR RESPONSE:',action)
        const index = state.groups.map(item => item.id).indexOf(action.id)

        return update(state, {
          isDeleting: {$set: false},
          groups: {$splice: [[index, 1]]},
          //activity:deleteExpenseFromActiviies(action.id,state)
        })

      case ActionTypes.DELETE_FAILURE:
        return update(state, {
          isDeleting: {$set: false}})

      case ActionTypes.ACTIVITY_REQUEST:
        return update(state, {isFetching: {$set: true}})

      case ActionTypes.ACTIVITY_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          activity: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.ACTIVITY_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.USERBYGROUP_REQUEST:
      return update(state, {isFetching: {$set: true}})

        // return Object.assign({}, state, {
        //   isFetching: true
        // })
      case ActionTypes.USERBYGROUP_SUCCESS:
        // console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          currentGroupUsers: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.USERBYGROUP_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.EXPENSE_REQUEST:
        return update(state, {
          isFetching: {$set: true}})

      case ActionTypes.EXPENSE_SUCCESS:
        //console.log('got our type and resp:', action.response)
        // console.log('pj test pexpense',JSON.parse(action.response))
        return update(state, {
          isFetching: {$set: false},
          activity: {$unshift: [JSON.parse(action.response)]}
        })

      case ActionTypes.EXPENSE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.UPDATE_EXPENSE_REQUEST:
        return update(state, {
          isFetching: {$set: true}})

      case ActionTypes.UPDATE_EXPENSE_SUCCESS:
        var activityIndex
        for (var i = 0 ; i < state.activity.length ; i++){
          if (action.id === state.activity[i].id){
            activityIndex=i
          }
        }

        //console.log('got our type and resp:', action.response)
        // console.log('pj test pexpense',JSON.parse(action.response))
        return update(state, {
          isFetching: {$set: false},
          activity: {$splice: [[actionIndex, 1,JSON.parse(action.response)]]}
        })

      case ActionTypes.UPDATE_EXPENSE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.PAYMENT_REQUEST:
        return update(state, {
          isFetching: {$set: true}
        })

      case ActionTypes.PAYMENT_SUCCESS:
      // console.log('pj test payment',JSON.parse(action.response))
        return update(state, {
          isFetching: {$set: false},
          activity: {$unshift: [JSON.parse(action.response)]}
        })

      case ActionTypes.PAYMENT_FAILURE:
        return update(state, {
          isFetching: {$set: false}
        })
      
      case ActionTypes.INDBALANCE_REQUEST:
        return update(state, {
          isFetching: {$set: true}})
      case ActionTypes.INDBALANCE_SUCCESS:
        //console.log('got our type and resp:', action.response)
        //console.log('pj test pexpense',JSON.parse(action.response))
        return update(state, {
          isFetching: {$set: false}})
        
      case ActionTypes.INDBALANCE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      default:
        return state
      }
    }

   
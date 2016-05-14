import * as ActionTypes from '../actions/groupActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
//console.log(ActionTypes);

export function groups(state = { isFetching: false, editGroup: {}, currentGroup: {}, isDeleting: false, newGroup:{}, groups: [],activity : [], currentGroupUsers: [], activityError: false, errorMessage:"", isUpdating: false}, action) {
    //console.log('groups actions:', action)
    // console.log('groups actions:', action)
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


      // getting single group by id
      case ActionTypes.GROUP_REQUEST:
      return update(state, 
        {isFetching: {$set: true}}
        )

      case ActionTypes.GROUP_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          editGroup: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.GROUP_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      //update a group
      case ActionTypes.UPDATE_GROUP_REQUEST:
        return update(state, {
          isUpdating: {$set: true}
        })

      case ActionTypes.UPDATE_GROUP_SUCCESS:
        var groupIndex;
        for (var i = 0; i < state.groups.length; i++) {
          if(action.id === state.groups[i].id){
            groupIndex = i; 
          }
        }
        return update(state, {
          isUpdating: {$set: false},
          groups: {$splice: [[groupIndex, 1, JSON.parse(action.response)]]}
        })

      case ActionTypes.UPDATE_GROUP_FAILURE:
        return update(state, {
          isUpdating: {$set: false}
        })

      case ActionTypes.GROUP_CLEAR:
        //console.log('trigger clearing editGroup State')
        return update(state, {
          editGroup: {$set: {} }
        })
        case ActionTypes.ACTIVITY_CLEAR:
        //console.log('trigger clearing editGroup State')
        return update(state, {
          activity: {$set: [] }
        })

      //set CURRENT group
      case ActionTypes.CURRENT_GROUP:
       //console.log('time to set the current group with', action.id)
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
        // console.log('pj test UPDATE EXPENSE',JSON.parse(action.response))
        return update(state, {
          isFetching: {$set: false},
          activity: {$splice: [[activityIndex, 1,JSON.parse(action.response)]]}
        })

      case ActionTypes.UPDATE_EXPENSE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.PAYMENT_REQUEST:
        return update(state, {
          isFetching: {$set: true},
        })

      case ActionTypes.PAYMENT_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          activity: {$unshift: [JSON.parse(action.response)]}
        })

      case ActionTypes.PAYMENT_FAILURE:
        return update(state, {
          isFetching: {$set: false},
        })

       case ActionTypes.PAYPAL_PAYMENT_REQUEST:
       //console.log('action in paypal req:', action)
        return update(state, {
          isFetching: {$set: true}
        })
      case ActionTypes.PAYPAL_PAYMENT_SUCCESS:
       sessionStorage.setItem('success',true);
       var authURL = JSON.parse(action.response)
       window.location.href = authURL.redirect;
        return update(state, {
          isFetching:{$set: false},
        })
      case ActionTypes.PAYPAL_PAYMENT_FAILURE:
        return update(state, {
          isFetching: {$set: false},
          activityError:{$set: true},
          errorMessage:{$set: "There was a problem processing the payment.\nVerify the email address before trying again."}
        })

      case ActionTypes.UPDATE_PAYSTAT_REQUEST:
        return update(state, {
          isFetching: {$set: true}
        })
      case ActionTypes.UPDATE_PAYSTAT_SUCCESS:
        var action = JSON.parse(action.response);
        var idx;
        state.activity.forEach((obj,i) => {if(obj.id === action.id && obj.type === action.type) idx = i})
        return update(state,{
          isFetching: {$set:false},
          activity:{$splice:[[idx,1,action]]}
        })      
        case ActionTypes.UPDATE_PAYSTAT_FAILURE:
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

      case ActionTypes.CLEAR_ERROR:
        return update(state, {
          activityError:{$set: false},
          errorMessage: {$set: null}
        })
      default:
        return state
      }
    }
  


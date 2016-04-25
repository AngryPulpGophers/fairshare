import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import GroupList from './groupList';


export default class GroupView extends Component {
  
  componentWillMount(){
    //call our get groups function
    this.props.getActivity(1)
  }
  
   /*
      <div classname = 'groupView'>
        <img src="http://i.imgur.com/4GXzMQB.jpg" />
      </div>
      */

  render() {
    console.log('get activity!:',this.props.activity)
     
  // setting this to bypas the need for authentication
    return(
      <div>
        <h2>Activity</h2>
         {this.props.activity.map(function(activity){
            return <div className="secondary">
           
            
                    <p>type:{activity.type} unote:{activity.note} members:{} groupID:{activity.group_id} </p>
                 
                   
                  </div>
          })}
      </div>
     
    )
  }
}

// Dashboard.propTypes = {

  // getGroups: PropTypes.func.isRequired
// }

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';


export default class GroupView extends Component {
  
  componentWillMount(){
    //call our get groups function
    var clickedOnGroup = (this.props.url.location.query.id)
    this.props.getActivity(clickedOnGroup)
  }
  
  prettyDate(milliseconds){
    console.log('samsam',this.props.location,'and pj', this.props.params)
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var date = new Date(milliseconds);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var time = monthNames[monthIndex]+" "+day+", " +year;
    return time;

  }
   /*
      <div classname = 'groupView'>
        <img src="http://i.imgur.com/4GXzMQB.jpg" />
      </div>
      */
  

  render() {
    //var { query } = this.props.location
   // console.log('samsam',this.props,'and pj', this.props.params)
     //var what = new Date(this.props.activity[0].created_at)
  //console.log(this.props.currentGroup)
     
  // setting this to bypas the need for authentication
    return(
      <div>
        <h2>Activity</h2>
         {this.props.activity.map(function(activity){
            return <div className="callout success">
           
            
                    <p>type:{activity.type} note:{activity.note} created:{this.prettyDate(activity.created_at)} groupID:{activity.group_id} </p>
                 
                   
                  </div>
          }.bind(this))}
      </div>
     
    )
  }
}

// GroupView.propTypes = {

//   prettyDate: PropTypes.func.isRequired
// }

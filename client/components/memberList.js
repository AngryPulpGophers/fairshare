import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

//a helpful function when looking at retrieved data
function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

export default class GroupList extends Component {
  componentWillMount(){
    //call our get groups function
    //this.props.getGroups()
  }
  render(){
    //console.log('get groups!:',this.props.groups)
    return (
      <ul>
        <li>Member Name <a href="#">Remove</a></li>
         {/*
          this.props.groups.map(function(group){
            return <div className="callout secondary">
                    <p>{group.name} <button className="float-right tiny button">View</button></p>
                  </div>;
          })
        */}
        {/*puke(this.props.groups)*/}
      </ul>
    )
  }
}
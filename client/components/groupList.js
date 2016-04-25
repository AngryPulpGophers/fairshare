import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

export default class GroupList extends Component {
  // componentWillMount(){
  //   console.log('get groups!:',this.props.getGroups(1))
  //   //console.log('componentWillMount');
  // }
  render(){
    console.log('get groups!:',this.props.getGroups(1))
    return(
      <div>
        <h2>Groups</h2>

        {/*<div className="callout secondary">
          <p>{this.props.title}</p>
        </div>
      */}
      </div>
    )
  }
}
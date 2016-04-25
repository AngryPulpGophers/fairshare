import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}



export default class GroupList extends Component {
  componentWillMount(){
    //call our get groups function
    this.props.getGroups(1)
  }
  render(){
    console.log('get groups!:',this.props.groups)
    return(
      <div>
        <h2>Groups</h2>
        {puke(this.props.groups)}
        {/*<div className="callout secondary">
          <p>{this.props.title}</p>
        </div>
      */}
      </div>
    )
  }
}
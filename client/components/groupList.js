import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import SocialModal from '../components/socialPromptModal';


function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

export default class GroupList extends Component {
  componentWillMount(){
    //console.log('USER ID', this.props.userInfo.id)
    this.props.getGroups(this.props.userInfo.id)
  }

  render(){
    return(
      <div>
        <SocialModal/>
      <div>
         {this.props.groups.map(function(group){
            return <Link  to={{pathname:'/groupView',query:{ id: group.id }}} title="groupView" className="callout callout-nav">{group.name}</Link> 

          })}
      </div>
    </div>
    )
  }
}


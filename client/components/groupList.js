import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import defaultPicture from '../images/fs-logo.png';

import {prettyDate} from '../utility/groupViewHelper';



function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

export default class GroupList extends Component {
  componentWillMount(){
    this.props.getGroups()
  }

  render(){
    return(
      <div>
      <div>
         {this.props.groups.map(function(group){
            return (

              <Link key={group.id} to={{pathname:'/groupView',query:{ id: group.id }}} title="groupView" className="callout callout-nav">
                <div className="row">
                  <div className="small-12 large-8 columns">
                    <h5>{group.name} </h5>
                  </div>
                  <div className="small-12 large-4 columns">
                    <span>Balance: </span>
                    <span style = {group.balance>=0 ? {color:'green'} : {color:'red'}}>${group.balance}</span>
                      {group.members.map(function(member){
                        return (
                          <Link key={group.created_at + member.user_id} to={{pathname:'/profile', query:{ username: member.username }}}>
                            <img className="group-avatar" src={member.img_url|| defaultPicture} />
                          </Link>
                        )
                      })}
                  </div>
                  <div className="small-12 columns">
                    <span className="small-aside">{prettyDate(group.created_at)}</span>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
    )
  }
}

GroupList.propTypes = {
  userInfo: PropTypes.object.isRequired,
}


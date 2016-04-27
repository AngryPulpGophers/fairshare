import React, { Component, PropTypes } from 'react';
import MemberList from './memberList';


export default class CreateGroup extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="small-12 large-7 columns">
            <h2>Create a New Group</h2>
            <form>
              <label>Group Name
                <input type="text" placeholder="Make sure you're specific! (Trip to Detroit, College Reunion)" />
              </label>
              <label>Description
                <input type="text" placeholder="Describe the group" />
              </label>
              <div className="row">
                <div className="small-7 columns">
                  <label>Add someone to the group
                    <input placeholder="evensteven@email.com" className="input-group-field" type="email" />
                  
                  </label>
                </div>
                <div className="small-5 columns">
                    <a className="button add-member">+ add</a>
                </div>
                
              </div>
              <br />
              <input value="+ Create Group" type="submit" className="expanded success button" />
            </form>
          </div>
          <div className="small-12 large-5 columns">
            <h3>Group Members</h3>
            <MemberList />
          </div>
        </div>
      </div>
    )
  }
}

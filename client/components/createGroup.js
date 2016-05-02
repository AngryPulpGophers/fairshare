import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MemberList from './memberList';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import SelectSearch from 'react-select-search';

export const fields = [ 'groupName', 'groupDesc' ];

export default class CreateGroup extends Component {

  handleSubmit(data) {
    console.log(data)
  }

  //handles adding members to the page
  renderMembers(data) {
    //console.log('called', data)
    return (
      <li><img className="small-mem" src={data.image} /><strong>{data.name} - <a className="tiny alert button remove-user" onClick={() => { this.props.removeMember(Number(data.value))}}> remove</a></strong></li>
    )
  }

  componentWillMount(){
    //call our get users function, but only if we haven't called it already
    if(this.props.users.length === 0){
      this.props.getUsers()
    } else {
      this.props.clearMembers();
    }
  }

  componentWillUpdate(nextProps, nextState){
    //this conditional handles if groups was updated - render the new group view
    if(nextProps.groups.length !== this.props.groups.length){
      let dest = nextProps.groups.pop()
      browserHistory.push('/groupView?id='+ dest.id);
    }
  }

  render() {

    const {
        fields: { groupName, groupDesc },
        handleSubmit,
        resetForm,
        submitting
      } = this.props

    const memberElements = this.props.members.map((data) => {
      return this.renderMembers(data);
    })

    return (  
      
        <div className="row">
          <div className="small-12 large-9 large-centered columns">
            <div className="component-wrapper">
              <div className="row">
                <div className="small-12 columns">
                  <h2>Create a New Group</h2>
                </div>
                <div className="small-12 large-7 columns">
                  <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <label>Group Name
                      <input
                        type="text"
                        placeholder="Make sure you're specific! (Trip to Detroit, College Reunion)" 
                        {...groupName}
                      />
                    </label>
                    <label>Description
                      <input 
                        type="text" 
                        placeholder="Describe the group" 
                        {...groupDesc}
                      />
                    </label>
                    <label>Add a few folks</label>
                    { this.props.users.length === 0 ? null :  
                      <div className="input-group">
                        <SelectSearch valueChanged={this.props.handleNewMem} options={this.props.users} ref="users" />
                        <a id="add" onClick={() => { this.props.addMember(this.props.newMem, this.props.groupForm) }} className="input-group-button button">+ add</a>
                      </div>
                    }
                  </form>
                  <button disabled={!this.props.members.length} onClick={() => { this.props.createGroup(this.props.members,this.props.groupForm) }} className="expanded primary button">+ Create New Group!</button>
                </div>
                <div className="small-12 large-5 columns">
                  <div className="callout text-center members-list">
                    <h4>Current Members</h4>
                    {this.props.members.length === 0 ? <span className="warning label"><strong>No one added yet!</strong></span> : null}
                    <ul>
                      {[...memberElements]}
                    </ul>
                  </div>
                </div>  
              </div>     
            </div> 
          </div>
          <div className="small-12 large-3 columns"></div>
        </div>
    )
  }
}

CreateGroup.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  addMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  handleNewMem: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  memState: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'group',
  fields,

})(CreateGroup)
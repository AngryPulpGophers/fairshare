import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MemberList from './memberList';
import { reduxForm } from 'redux-form';
export const fields = [ 'groupName', 'groupDesc' ];

export default class CreateGroup extends Component {

  handleSubmit(data) {
    console.log(date)
  }
  componentWillMount(){
    //call our get users function, but only if we haven't called it already
    if(this.props.users.length === 0){
      this.props.getUsers()
    } else {
      this.props.clearMembers();
    }

  }
  render() {
    let hide = false;
    
    console.log('createGroup prop',this.props.createGroup)
    const {
        fields: { groupName, groupDesc },
        handleSubmit,
        resetForm,
        submitting
      } = this.props

    return (  
      
        <div className="row">
          <div className="small-12 large-7 large-centered columns">
            <h2>Create a New Group</h2>
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
              <br />
              {/*<button type="submit" disabled={submitting} className="expanded success button">
                Continue
              </button>*/}
            </form>
          </div>
          <div className="small-12 large-5 columns"></div>
        
        <div className="small-12 large-7 large-centered columns">
          <MemberList 
            users={this.props.users}
            addMember={this.props.addMember}
            removeMember={this.props.removeMember}
            members={this.props.members}
            handleNewMem={this.props.handleNewMem}
            newMem={this.props.newMem}
            createGroup={this.props.createGroup}
            memState={this.props.state}
            groupForm={this.props.groupForm}
            groups={this.props.groups}
            />
        </div>
        <div className="small-12 large-5 columns"></div>
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
  createGroup: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'group',
  fields,

})(CreateGroup)
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MemberList from './memberList';
import { reduxForm } from 'redux-form';
export const fields = [ 'groupName', 'groupDesc' ];

let hide = false;

export default class CreateGroup extends Component {
  // componentWillMount(){
  //   //call our get groups function
  //   this.props.getUsers()
  // }

  handleSubmit(data) {
    hide = true;
  }
  componentWillMount(){
    //call our get groups function
    this.props.getUsers()
  }
  render() {

    //console.log(this.props.newGroup)
    const {
      fields: { groupName, groupDesc },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return !hide ? (  
      
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
              <button type="submit" disabled={submitting} className="expanded success button">
                {submitting ? "Creating" : "+ Create Group"} Submit
              </button>
            </form>
          </div>
          <div className="small-12 large-5 columns"></div>
        </div>
      
    ) : (
      <div className="row">
        <div className="small-12 large-7 large-centered columns">
          <MemberList 
            users={this.props.users}
            addMember={this.props.addMember}
            removeMember={this.props.removeMember}
            members={this.props.members}
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
  removeMember: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'simple',
  fields,

})(CreateGroup)
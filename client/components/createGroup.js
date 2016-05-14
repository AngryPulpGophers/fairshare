import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import SelectSearch from 'react-select-search';
import DeleteGroup from './deleteGroup';

export const fields = [ 'groupName', 'groupDesc' ];

export default class CreateGroup extends Component {

  handleSubmit(data) {
    console.log("data on create group", data);
  }

  //handles adding members to the page
  renderMembers(data) {
    return (
      <li key={data.name}><img className="small-mem" src={data.img_url} /><strong>{data.name} - <a disabled={data.disabled} className="tiny alert button remove-user" onClick={!data.disabled ? () => { this.props.removeMember(Number(data.value))}: null}> remove</a></strong></li>
    )
  }

  componentWillMount(){
    //call our get users function, but only if we haven't called it already
    if(this.props.users.length === 0){
      this.props.getUsers(true)
    } else {
      this.props.clearMembers();
    }
  }

  componentWillUpdate(nextProps, nextState){
    //this conditional handles if groups was updated - render the new group view
    if(nextProps.groups.length < this.props.groups.length){
      browserHistory.push('/');
    } else if(nextProps.groups.length !== this.props.groups.length){
      let dest = nextProps.groups.pop()
      browserHistory.push('/groupView?id='+ dest.id);
    } else if(nextProps.groups !== this.props.groups){
      browserHistory.push('/groupView?id='+ this.props.groupID);
    }
  }
  componentWillUnmount(){
    //clear out our saved form data
    this.props.clearEdit();
  }
  clearSearch(){
    if(
      document.getElementsByClassName("select-search-box__search") &&
      document.getElementsByClassName("select-search-box__search")[0] &&
      document.getElementsByClassName("select-search-box__search")[0].value
      ){
      let searchVal = document.getElementsByClassName("select-search-box__search")[0].value;
      console.log(searchVal);
      document.getElementsByClassName("select-search-box__search")[0].value = '';
    }
  }
  render() {
    var submitButton;
    var formAction;
    if(this.props.groupID){
      submitButton = (
          <button onClick={ () => { this.props.updateGroup(this.props.members,this.props.groupForm,this.props.groupID) }} className="expanded primary button">Update Group!</button>
        );
      formAction = 'Update';
    } else {
      submitButton = (
          <button disabled={!this.props.members.length} onClick={ () => { this.props.createGroup(this.props.members,this.props.groupForm) }} className="expanded primary button">+ Create New Group!</button>
        );
      formAction = 'Create';
    }
    const {
        fields: { groupName, groupDesc },
        handleSubmit,
        resetForm,
        submitting
      } = this.props

    const memberElements = this.props.members.map((data) => {
      return this.renderMembers(data);
    })
    const updating = this.props.initialValues ? true : false;

    return (

        <div className="row">
          <div className="small-12 large-9 large-centered columns">
            <div className="component-wrapper">
              <div className="row">
                <div className="small-12 columns">
                  <h2 className="float-left">{formAction} Group</h2>
                  <DeleteGroup
                    deleteGroup = {this.props.deleteGroup}
                    groupID = {this.props.groupID}
                  />
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
                        <SelectSearch
                          onBlur={this.clearSearch()}
                          valueChanged={this.props.handleNewMem}
                          options={this.props.users}
                          clearInput={true}
                          ref="users"
                        />
                        <a id="add" onClick={() => { this.props.addMember(this.props.newMem, this.props.groupForm) }} className="input-group-button button">+ add</a>
                      </div>
                    }
                  </form>
                  {submitButton}
                </div>
                <div className="small-12 large-5 columns">
                  <div className="callout text-center members-list">
                    <h4>Current Members</h4>
                    {this.props.members.length === 0 ? <span className="warning label"><strong>Just you so far!</strong></span> : null}
                    <ul>
                      {[...memberElements]}
                      {this.props.members.length > 0 ? <span>(and you!)</span> : null}
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
  memState: PropTypes.object.isRequired,
  updateGroup: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'group',
  fields,

})(CreateGroup)

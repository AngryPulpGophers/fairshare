import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Route, Link } from 'react-router';
import { getUsers } from '../actions/userActions';
import { addMember, removeMember, clearMembers } from '../actions/memberActions';
import { createGroup, getGroup, clearEdit, updateGroup, deleteGroup } from '../actions/groupActions';
import { formatData } from '../utility/createGroupHelper';
import CreateGroup from '../components/createGroup';

class PageCreateGroup extends Component {

  constructor(props,context){
    super(props);
    this.state = ({
      newMem: {}
    });
  }

  componentWillMount(){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login');
    }
    //call
    if (this.props.location.query.id){
      this.props.getGroup(this.props.location.query.id);
    }
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.isAuthed){
      browserHistory.push('/login');
    }
    if(this.props.editGroup && this.props.editGroup.members && this.props.editGroup.members.length && this.props.members.length == 0){
      for (var i = 0; i < this.props.editGroup.members.length; i++) {
        if(this.props.currUser.id !== this.props.editGroup.members[i].user_id){
         this.props.addMember(this.props.editGroup.members[i]);
        }
      }
    }
  }

  componentWillUnmount(){
    //clear out our saved form data
    this.props.clearEdit();
  }

  handleNewMem(option, state){
    //set a temp state to handle our fuzzy search
    this.setState({ newMem: option});
  }

  render() {
    let formData = formatData(this.props.editGroup,this.props.currUser);
    return (
      <div className="create-group">
        <CreateGroup
          getUsers={this.props.getUsers}
          users={this.props.users}
          addMember={this.props.addMember}
          removeMember={this.props.removeMember}
          members={this.props.members}
          newMem={this.state.newMem}
          handleNewMem={this.handleNewMem.bind(this)}
          createGroup={this.props.createGroup}
          memState ={this.state}
          groups={this.props.groups}
          groupForm={this.props.groupForm}
          clearMembers={this.props.clearMembers}
          initialValues ={formData}
          clearEdit={this.props.clearEdit}
          groupID ={this.props.location.query.id}
          updateGroup = {this.props.updateGroup}
          deleteGroup = {this.props.deleteGroup}
        />
      </div>
    );
  }
}

PageCreateGroup.PropTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  addMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  clearMembers: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  updateGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    users: state.users.users,
    members: state.members.members,
    isAuthed: state.auth.isAuthed,
    groupForm: state.form.group,
    editGroup: state.groups.editGroup,
    currUser: state.auth.userInfo
  };
}
PageCreateGroup.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(mapStateToProps, {
  getUsers,
  addMember,
  removeMember,
  createGroup,
  clearMembers,
  getGroup,
  clearEdit,
  deleteGroup,
  updateGroup
})(PageCreateGroup);

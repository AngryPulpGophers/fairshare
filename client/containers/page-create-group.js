import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Router, Route, Link } from 'react-router'
import { getUsers } from '../actions/userActions';
import { addMember, removeMember, clearMembers } from '../actions/memberActions';
import { createGroup, getGroup } from '../actions/groupActions';
import { formatData } from '../utility/createGroupHelper';
import CreateGroup from '../components/createGroup';

class PageCreateGroup extends Component {


  constructor(props,context){
    super(props)
    this.state = {newMem: {}, formData: {} }

  }
  componentWillMount(){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
    }
    //call
    if (this.props.location.query.id){
      this.props.getGroup(this.props.location.query.id);
    }

  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.isAuthed){
      browserHistory.push('/login')
    }
  }

  handleNewMem(option, state){
    //set a temp state to handle our fuzzy search
    this.setState({ newMem: option})
  }

  render() {
    let formData = formatData(this.props.editGroup)
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
  isAuthed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    users: state.users.users,
    members: state.members.members,
    isAuthed: state.auth.isAuthed,
    groupForm: state.form.group,
    editGroup: state.groups.editGroup
  };
}
PageCreateGroup.contextTypes = {
    router: React.PropTypes.func.isRequired
};
export default connect(mapStateToProps, {
  getUsers,
  addMember,
  removeMember,
  createGroup,
  clearMembers,
  getGroup
})(PageCreateGroup);

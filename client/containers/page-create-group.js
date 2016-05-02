import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getUsers } from '../actions/userActions';
import { addMember, removeMember, clearMembers } from '../actions/memberActions';
import { createGroup } from '../actions/groupActions';
import CreateGroup from '../components/createGroup';

class PageCreateGroup extends Component {
 
  constructor(props){
    super(props)
    this.state = {newMem: {}}
  }
  componentWillMount(){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
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
    //console.log('checking members existence:',this.state.members)
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
  };
}

export default connect(mapStateToProps, {
  getUsers,
  addMember,
  removeMember,
  createGroup,
  clearMembers
})(PageCreateGroup);

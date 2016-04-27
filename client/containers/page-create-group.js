import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';
import { addMember, removeMember } from '../actions/memberActions';
import { createGroup } from '../actions/groupActions';
import CreateGroup from '../components/createGroup';

class PageCreateGroup extends Component {
 
  constructor(props){
    super(props)
    this.state = {newMem: {}}
  }

  handleNewMem(option, state){
    //console.log('our user object:',option)
   // console.log('passed in state', state === this.state)
   // this.state.newMem[option.id] = option.name;
    this.setState({ newMem: option})
   // this.props.newMem = option
    //console.log('our new state:',this.state)
  }

  render() {
    console.log('checking state again:',this.state.newMem)
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
          groupForm={this.props.groupForm}
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
  createGroup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log('current state:',state);
  return {
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
  createGroup
})(PageCreateGroup);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';
import { addMember, removeMember } from '../actions/memberActions';
import CreateGroup from '../components/createGroup';
class PageCreateGroup extends Component {

  render() {
    return (
      <div className="create-group">
        <CreateGroup 
          getUsers={this.props.getUsers} 
          users={this.props.users}
          addMember={this.props.addMember}
          removeMember={this.props.removeMember}
          members={this.props.members}
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
}

function mapStateToProps(state) {
  // console.log('mapstatetprops called:',state);
  return {
    users: state.users.users,
    members: state.members.members
  };
}

export default connect(mapStateToProps, {
  getUsers,
  addMember,
  removeMember
})(PageCreateGroup);

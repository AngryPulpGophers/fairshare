import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateGroup from '../components/createGroup';
class PageCreateGroup extends Component {

  render() {
    return (
      <div className="create-group">
        <CreateGroup />
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log('mapstatetprops called:',state);
  return {
  };
}

export default connect(mapStateToProps, {
})(PageCreateGroup);

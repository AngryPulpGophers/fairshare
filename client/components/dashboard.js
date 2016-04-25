import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import GroupList from './groupList'

export default class Dashboard extends Component {

  renderCalout(data) {
    const refName = `callout-${data.id}`
    return (
      <div className={"callout "+data.type} ref={refName} key={refName}>
        <h5>{data.header}</h5>
        <p>{data.message}</p>
        <button className="close-button" aria-label="Dismiss alert" type="button" onClick={() => {
          const elem = ReactDOM.findDOMNode(this.refs[refName])
          $(elem).fadeOut().trigger('closed.zf')
          // trigger action after fade transition finished
          setTimeout(() => {
            this.props.removeCallout(data.id)
          }, 500)
        }}>
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }

  render() {
  // setting this to bypas the need for authentication
  const isAuthed = true;
    const calloutElements = this.props.callouts.map((data) => {
      return this.renderCalout(data);
    })
    return isAuthed ? (
      <div className="dashboard">
        <GroupList getGroups={this.props.getGroups} groups={this.props.groups}/>
      </div>
      ) 
      : (
      <div className="dashboard">
        <div className="row">
          <div className="small-12 large-centered columns text-center">
            <h1>Welcome to Divvy</h1>
            <Link to='/login' title="Get Started" className="button primary"><i className="fa fa-balance-scale"></i>Get Started</Link>
          </div>
        </div>
        {[...calloutElements]}
      </div>
    )
  }
}

Dashboard.propTypes = {
  callouts: PropTypes.array.isRequired,
  removeCallout: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired
}

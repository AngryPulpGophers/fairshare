import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class ExpireAlert extends Component {
  constructor(props){
    super(props);
    this.state = {visible: false};
  }

  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.set) {
      this.setTimer();
      this.setState({visible: true});
    }
  }
  componentDidMount() {
      this.setTimer();
  }
  setTimer() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({visible: false});
      this.props.reset();
      this._timer = null;
    }.bind(this), this.props.delay);
  }
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  render() {
    let alertStyling = this.props.status +' callout';
    return this.state.visible
           ? <div className={alertStyling}>{this.props.children}</div>
           : <span />;
  }
};

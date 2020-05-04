import React, { Component } from 'react';

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label } = this.props;
    return <button type="button">{label}</button>;
  }
}

export default ActionButton;

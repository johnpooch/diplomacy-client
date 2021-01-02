// Adapted from https://konvajs.org/docs/react/DOM_Portal.html

import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
  componentDidMount() {
    this.renderPortal();
  }

  componentDidUpdate() {
    this.renderPortal();
  }

  componentWillUnmount() {
    const { node } = this.props;

    ReactDOM.unmountComponentAtNode(this.defaultNode || node);
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  renderPortal() {
    let { children } = this.props;
    if (!children) return;

    const { node } = this.props;
    if (!node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof children.type === 'function') {
      children = React.cloneElement(children);
    }

    ReactDOM.render(children, node || this.defaultNode);
  }

  render() {
    return null;
  }
}

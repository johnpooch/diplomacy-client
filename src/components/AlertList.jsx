import React from 'react';
import { connect } from 'react-redux';

import Alert from './Alert';

const AlertList = (props) => {
  const { alerts } = props;
  if (!alerts || !alerts.length) return null;
  const elements = [];
  alerts.forEach((alert) => {
    if (alert.pending !== true) {
      elements.push(
        <Alert
          key={alert.id}
          id={alert.id}
          text={alert.message}
          category={alert.category}
        />
      );
    }
  });
  return <ul>{elements}</ul>;
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps, null)(AlertList);

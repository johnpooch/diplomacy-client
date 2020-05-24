import React from 'react';
import { connect } from 'react-redux';

import Alert from './Alert';

const AlertList = (props) => {
  const { alerts } = props;
  const messages = [];
  alerts.forEach((alert) => {
    if (alert.pending !== true) {
      messages.push(
        <Alert
          key={alert.id}
          id={alert.id}
          text={alert.message}
          category={alert.category}
        />
      );
    }
  });
  return <ol>{messages}</ol>;
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps, null)(AlertList);

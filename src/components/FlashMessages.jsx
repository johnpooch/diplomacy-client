import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';

const FlashMessages = (props) => {
  const { alerts } = props;
  const messages = [];
  alerts.forEach((alert) => {
    if (alert.pending !== true) {
      messages.push(
        <FlashMessage
          key={alert.id}
          id={alert.id}
          text={alert.message}
          category={alert.category}
        />
      );
    }
  });
  return <div>{messages}</div>;
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps, null)(FlashMessages);

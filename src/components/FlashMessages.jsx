import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';

const FlashMessages = (props) => {
  const { alerts } = props;
  const messages = [];
  alerts.forEach((alert) => {
    messages.push(
      <FlashMessage
        key={alert.id}
        id={alert.id}
        text={alert.message}
        type={alert.type}
      />
    );
  });
  return messages;
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(FlashMessages);

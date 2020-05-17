import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import alertActions from '../store/actions/alerts';

const FlashMessages = (props) => {
  const { alerts, onClick } = props;
  const messages = [];
  for (let index = 0; index < alerts.length; index += 1) {
    const alert = alerts[index];
    messages.push(
      <FlashMessage
        key={index}
        text={alert.message}
        type={alert.type}
        _click={onClick}
      />
    );
  }
  return messages;
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(alertActions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);

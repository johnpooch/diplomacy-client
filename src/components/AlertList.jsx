import React from 'react';

import Alert from './Alert';

const AlertList = (props) => {
  const { alerts, onClick } = props;
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
          onClick={onClick}
        />
      );
    }
  });
  return <ul>{elements}</ul>;
};

export default AlertList;

import React from 'react';

import TurnStatus from './TurnStatus';

const NonParticipatingStatusBar = (props) => {
  const { turn, setTurn } = props;

  return (
    <div>
      <div className="playing-as">You are not participating in this game.</div>
      <TurnStatus
        turn={turn}
        _click={(turnId) => {
          setTurn(turnId);
        }}
      />
    </div>
  );
};

export default NonParticipatingStatusBar;

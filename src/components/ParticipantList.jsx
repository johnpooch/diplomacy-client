import React from 'react';
import { connect } from 'react-redux';

import ParticipantPending from './ParticipantPending';
import ParticipantActive from './ParticipantActive';

const ParticipantList = (props) => {
  const { game, turn, user: currentUser } = props;
  const participantDivs = [];
  const { participants } = game;
  if (!turn) {
    participants.forEach((participant) => {
      const { username } = participant;
      participantDivs.push(
        <ParticipantPending key={username} username={username} />
      );
    });
    return <div>{participantDivs}</div>;
  }
  const { nation_states: nationStates } = turn;
  nationStates.forEach((nationState) => {
    const { user } = nationState;
    const { username } = user;
    participantDivs.push(
      <ParticipantActive
        key={username}
        currentUser={currentUser}
        nationState={nationState}
      />
    );
  });

  return <div>{participantDivs}</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps, null)(ParticipantList);

import React from 'react';
import { connect } from 'react-redux';

import ParticipantPending from './ParticipantPending';
import ParticipantActive from './ParticipantActive';

import { getParticipatingUsers } from '../store/selectors';

const ParticipantList = (props) => {
  const { game, participatingUsers } = props;
  const participantDivs = [];
  const { current_turn: turn } = game;
  if (!turn) {
    participatingUsers.forEach((participant) => {
      const { username } = participant;
      participantDivs.push(
        <ParticipantPending key={username} username={username} />
      );
    });
    return <div>{participantDivs}</div>;
  }
  participatingUsers.forEach((participant) => {
    participantDivs.push(
      <ParticipantActive
        key={participant.id}
        game={game}
        participant={participant}
      />
    );
  });

  return <div>{participantDivs}</div>;
};

const mapStateToProps = (state, props) => {
  const { game } = props;
  return {
    participatingUsers: getParticipatingUsers(state, game),
  };
};

export default connect(mapStateToProps, null)(ParticipantList);

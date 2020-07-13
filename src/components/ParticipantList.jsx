import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';

import Flag from './Flag';

const StyledDivFlags = styled.div`
  display: flex;
  justify-content: space-between;

  .username {
    margin-right: ${spacing[1]}px;
    margin-bottom: ${spacing[1]}px;
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.color};
  }
`;
const StyledDivNoFlags = styled.div`
  margin-bottom: ${spacing[1]}px;
`;

const ParticipantList = (props) => {
  const { game, turn, user } = props;
  const participantDivs = [];
  if (!turn) {
    const { participants } = game;
    participants.forEach((participant) => {
      const { username } = participant;
      participantDivs.push(
        <StyledDivNoFlags key={username} className="participant-div">
          <span className="username">{username}</span>
        </StyledDivNoFlags>
      );
    });
    return <div>{participantDivs}</div>;
  }
  const { nation_states: nationStates } = turn;
  nationStates.forEach((nationState) => {
    const { user: u, nation } = nationState;
    const { username, id } = u;
    const currentUser = user.id === id;
    let fontWeight = 'normal';
    let color = 'inherit';
    if (currentUser) {
      fontWeight = 'bold';
      color = colors.nations[nation.id];
    }
    const { flag_as_data: flagData } = nation;
    participantDivs.push(
      <StyledDivFlags
        className="participant-div"
        fontWeight={fontWeight}
        color={color}
      >
        <span className="username">{username}</span>
        <Flag flagData={flagData} />
      </StyledDivFlags>
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

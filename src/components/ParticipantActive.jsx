import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';
import { getUserNation } from '../store/selectors';

import Flag from './Flag';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  .username {
    margin-right: ${spacing[1]}px;
    margin-bottom: ${spacing[1]}px;
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.color};
  }
`;

const ParticipantActive = (props) => {
  const { nation, participant, user } = props;
  const { id, username } = participant;
  const isCurrentUser = user.id === id;
  let fontWeight = 'normal';
  let color = 'inherit';
  if (isCurrentUser) {
    fontWeight = 'bold';
    color = colors.nations[nation.id];
  }
  return (
    <StyledDiv
      className="participant-div"
      fontWeight={fontWeight}
      color={color}
    >
      <span className="username">{username}</span>
      <Flag nationId={nation.id} size="small" />
    </StyledDiv>
  );
};

const mapStateToProps = (state, props) => {
  const { game, participant } = props;
  return {
    nation: getUserNation(state, game, participant),
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(ParticipantActive);

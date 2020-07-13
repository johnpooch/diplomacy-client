import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat } from '../utils';
import { colors, spacing, sizes } from '../variables';

import Flag from './Flag';
import PlayerCount from './PlayerCount';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover .name {
    text-decoration: underline;
`;

const StyledListItem = styled.li`
  border-left: ${sizes.border}px solid transparent;
  border-color: ${(props) => props.color};
  padding: 0 ${spacing[3]}px;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;

  a {
    text-decoration: none;
    color: ${colors.base};

    &:hover .name {
      text-decoration: underline;
    }
  }

  header {
    margin-bottom: ${spacing[2]}px;
  }

  p {
    &:not(:last-of-type) {
      margin-bottom: ${spacing[1]}px;
    }
  }

  .name {
    font-weight: 600;
  }

  .label {
    font-style: italic;

    &:after {
      content: ': ';
    }
  }

  .value {
    text-transform: capitalize;
  }

  .player-count {
    margin-bottom: ${spacing[2]}px;
  }
`;

const renderParticipants = (currentTurn) => {
  if (!currentTurn) return null;
  const { nation_states: nationStates } = currentTurn;
  const participantDivs = [];
  nationStates.forEach((nationState) => {
    const { user, nation } = nationState;
    const { username } = user;
    const { flag_as_data: flagData } = nation;
    participantDivs.push(
      <div
        className="participant-div"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span style={{ marginRight: '1rem', marginBottom: `${spacing[1]}px` }}>
          {username}
        </span>
        <Flag flagData={flagData} />
      </div>
    );
  });
  return <div>{participantDivs}</div>;
};

const GameSummary = (props) => {
  const { game, user } = props;
  const {
    created_at: createdAt,
    id,
    name,
    description,
    participants,
    num_players: numPlayers,
    current_turn: currentTurn,
  } = game;

  const getUserNationState = () => {
    if (!currentTurn) return null;
    const { nation_states: nationStates } = currentTurn;
    let userNationState = null;
    for (let i = 0; i < nationStates.length; i += 1) {
      const nationState = nationStates[i];
      if (nationState.user.id === user.id) {
        userNationState = nationState;
        break;
      }
    }
    return userNationState;
  };

  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);

  const userNationState = getUserNationState();

  let color = 'transparent';
  if (userNationState) {
    color = colors.nations[userNationState.nation.id];
  }

  return (
    <StyledLink to={`/game/${id}`}>
      <StyledListItem key={id} color={color}>
        <div>
          <article>
            <header>
              <span className="name">{name}</span>
            </header>
            <section>
              <p className="description" style={{ fontStyle: 'italic' }}>
                <span className="value">{description}</span>
              </p>
              <p className="created">
                <span className="label">Created</span>
                <time className="value" dateTime={createdAt}>
                  {dateString}
                </time>
              </p>
              <p className="players" />
            </section>
          </article>
        </div>
        <div style={{ textAlign: 'right' }}>
          <PlayerCount
            numParticipants={participants.length}
            numPlayers={numPlayers}
          />
          {renderParticipants(currentTurn)}
        </div>
        <div />
      </StyledListItem>
    </StyledLink>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps, null)(GameSummary);

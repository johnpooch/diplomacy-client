import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat } from '../utils';
import { colors, sizes, spacing } from '../variables';

const StyledListItem = styled.li`
  border-left: ${sizes.border}px solid transparent;
  border-color: ${(props) => props.color};
  padding: 0 ${spacing[3]}px;
  /* padding: ${(props) => (props.hasJoinedGame ? `${spacing[2]}px` : 0)}; */
  /* border-radius: ${sizes.borderRadius[0]}px; */

  a {
    text-decoration: none;
    color: inherit;

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
`;

const GameSummary = (props) => {
  const { game, user } = props;
  const {
    created_at: createdAt,
    id,
    name,
    status,
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

  const renderPlayingAs = () => {
    if (!userNationState) return null;
    return (
      <p className="playing-as">
        <span className="label">Playing as</span>
        <span className="value">{userNationState.nation.name}</span>
      </p>
    );
  };

  return (
    <StyledListItem key={id} color={color}>
      <Link to={`/game/${id}`}>
        <article>
          <header>
            <span className="name">{name}</span>
          </header>
          <section>
            <p className="created">
              <span className="label">Created</span>
              <time className="value" dateTime={createdAt}>
                {dateString}
              </time>
            </p>
            <p className="status">
              <span className="label">Status</span>
              <span className="value">{status}</span>
            </p>
            <p className="players">
              <span className="label">Players</span>
              <span className="value">
                {participants.length} / {numPlayers}
              </span>
            </p>
            {renderPlayingAs()}
          </section>
        </article>
      </Link>
    </StyledListItem>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps, null)(GameSummary);

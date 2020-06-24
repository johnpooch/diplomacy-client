import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat, getCurrentTurn } from '../utils';
import { colors, spacing } from '../variables';

const StyledListItem = styled.li`
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
`;

const GameSummary = (props) => {
  const { game, user } = props;
  const {
    created_at: createdAt,
    id,
    name,
    status,
    players,
    current_turn: currentTurn,
  } = game;

  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);

  const renderPlayingAs = () => {
    if (!currentTurn) {
      return null;
    }
    const { nation_states: nationStates } = currentTurn;
    let userNationState = null;
    for (let i = 0; i < nationStates.length; i += 1) {
      const nationState = nationStates[i];
      if (nationState.user.id === user.id) {
        userNationState = nationState;
      }
    }
    if (userNationState) {
      const { nation } = userNationState;
      const { name: nationName } = nation;
      return (
        <p className="playing-as">
          <span className="label">Playing as</span>
          <span className="value">{nationName}</span>
        </p>
      );
    }
    return null;
  };

  return (
    <StyledListItem key={id}>
      <Link to={`/game/${id}`}>
        <article>
          <header>
            <span className="name">{name}</span>
          </header>
          <section>
            <p className="created-at">
              <span className="label">Created</span>
              <time className="value" dateTime={createdAt}>
                {dateString}
              </time>
            </p>
            <p className="status">
              <span className="label">Status</span>
              <span className="value">{status}</span>
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

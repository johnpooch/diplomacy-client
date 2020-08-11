import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat, getUserNationState } from '../utils';
import { colors, spacing, sizes } from '../variables';

import GameStatus from './GameStatus';
import PlayerCount from './PlayerCount';
import ParticipantList from './ParticipantList';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: ${colors.white};
  padding: ${spacing[2]}px;
  border: solid 1px ${colors.border};
  border-radius: ${sizes[0]}px;

  &:hover .name {
    text-decoration: underline;
`;

const StyledListItem = styled.li`
  border-left: ${sizes.line}px solid transparent;
  border-color: ${(props) => props.color};
  padding: 0 ${spacing[3]}px;

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: ${spacing[5]}px;

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

  .player-count {
    margin-bottom: ${spacing[2]}px;
    text-align: right;
  }
`;

const GameSummary = ({ game, user }) => {
  const {
    created_at: createdAt,
    id,
    slug,
    name,
    description,
    participants,
    num_players: numPlayers,
    current_turn: currentTurn,
  } = game;

  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);
  const userNationState = getUserNationState(currentTurn, user);

  let color = 'transparent';
  if (userNationState) {
    color = colors.nations[userNationState.nation];
  }
  return (
    <StyledLink to={`/game/${slug}`}>
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
              <p className="game-status">
                <GameStatus game={game} />
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
        <div>
          <PlayerCount
            numParticipants={participants.length}
            numPlayers={numPlayers}
          />
          <ParticipantList game={game} turn={currentTurn} />
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

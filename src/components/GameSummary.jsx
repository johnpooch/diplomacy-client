import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, fontSizes, spacing, sizes } from '../variables';

import GameStatus from './GameStatus';
import PlayerCount from './PlayerCount';
import ParticipantList from './ParticipantList';
import { getCurrentTurn, getUserNation } from '../store/selectors';

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

  .game-status {
    margin-bottom: 0.5rem;
  }
  .secondary-text {
    font-size: ${fontSizes.sans[2]}px;
    color: ${colors.lightText};
    line-height: 1.2rem;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover .name {
      text-decoration: underline;
    }
  }

  header {
    padding-bottom: ${spacing[2]}px;
    margin-bottom: ${spacing[2]}px;
    border-bottom: 1px solid ${colors.lightLine};
  }

  p {
    &:not(:last-of-type) {
      margin-bottom: ${spacing[1]}px;
    }
  }

  .name {
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

const GameSummary = (props) => {
  const { game, currentTurn } = props;
  const {
    id,
    slug,
    name,
    description,
    participants,
    status,
    userNation,
    num_players: numPlayers,
  } = game;

  let color = 'transparent';
  if (userNation) {
    color = colors.nations[userNation];
  }
  return (
    <StyledLink to={`/game/${slug}`}>
      <StyledListItem key={id} color={color}>
        <div>
          <article>
            <p className="game-status secondary-text">
              <GameStatus status={status} turn={currentTurn} />
            </p>
            <header>
              <span className="name">{name}</span>
            </header>
            <section>
              <p className="description secondary-text">
                <span className="value">{description}</span>
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
          <ParticipantList game={game} />
        </div>
        <div />
      </StyledListItem>
    </StyledLink>
  );
};

const mapStateToProps = (state, props) => {
  const { game } = props;
  const { user } = state.auth;
  return {
    user,
    userNation: getUserNation(state, game, user),
    currentTurn: getCurrentTurn(state, game),
  };
};

export default connect(mapStateToProps, null)(GameSummary);

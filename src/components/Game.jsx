import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Players from './Players';
import { selectNationsByTurn, selectNationByUser } from '../store/selectors';
import { turnSelectors } from '../store/turns';
import { userSelectors } from '../store/users';

const StyledGame = styled.div`
  background: ${(p) => p.theme.colors.muted};
  padding: ${(p) => p.theme.space[3]};
  border: ${(p) => p.theme.borders[0]};
  display: grid;
  grid-template-columns: 3fr 2fr;
  position: relative;
  text-align: left;
  grid-column-gap: ${(p) => p.theme.space[6]};

  .overlay:hover ~ .details .name {
    text-decoration: underline;
  }

  .players {
    border-left: ${(p) => p.theme.borders[0]};
    height: 100%;
    padding-left: ${(p) => p.theme.space[2]};
  }

  > div {
    display: grid;
    grid-row-gap: ${(p) => p.theme.space[2]};
    height: max-content;
  }
`;

const Status = ({ game, turn }) => {
  const { status } = game;
  let message = 'Unknown status';
  if (status === 'pending') {
    message = 'Waiting for players to join';
  } else if (turn) {
    const { phase, season, year } = turn;
    message = `${season} ${year} - ${phase}`;
  }
  return <span>{message}</span>;
};

const Game = ({ game, participants, userNation, turn }) => {
  const { description, id, name, slug, status } = game;
  return (
    <StyledGame key={id} userNation={userNation}>
      <Link
        className="overlay"
        to={status === 'active' ? `/game/${slug}` : `/pre-game/${slug}`}
      />
      <div className="details">
        <Status game={game} turn={turn} />
        <h2 className="name">{name}</h2>
        <p className="description">{description}</p>
      </div>
      <div className="players">
        <Players game={game} participants={participants} />
      </div>
    </StyledGame>
  );
};

const mapStateToProps = (state, { game }) => {
  const { user } = state.auth;
  const { currentTurn } = game;
  const turn = turnSelectors.selectById(state, currentTurn);
  const userNation = selectNationByUser(state, user.id);
  let participants = game.participants.map((p) =>
    userSelectors.selectById(state, p)
  );
  if (!currentTurn) return { participants };
  // TODO clean up this janky logic. Maybe memoize too
  const nations = currentTurn ? selectNationsByTurn(state, currentTurn) : null;
  const nsMap = nations.reduce(
    (obj, ns) => Object.assign(obj, { [ns.user]: ns }),
    {}
  );
  participants = participants.map((p) => {
    const nation = nsMap[p.id];
    return { ...p, nation };
  });
  return { participants, turn, userNation };
};

export default connect(mapStateToProps, null)(Game);

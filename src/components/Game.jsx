import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Players from './Players';
import { variables } from '../variables';
import { selectNationsByTurn, selectNationByUser } from '../store/selectors';
import { turnSelectors } from '../store/turns';
import { userSelectors } from '../store/users';

const StyledGame = styled.div`
  background: ${variables.colors.white};
  padding: ${variables.spacing[3]}px;
  border: solid ${variables.sizes.border}px ${variables.colors.darkgray};
  display: grid;
  grid-template-columns: 3fr 2fr;
  position: relative;
  text-align: left;
  grid-column-gap: ${variables.spacing[6]}px;

  .link-overlay:hover ~ .details .name {
    text-decoration: underline;
  }

  .players {
    border-left: solid ${variables.sizes.border}px ${variables.colors.gray};
    height: 100%;
    padding-left: ${variables.spacing[2]}px;
  }

  > div {
    display: grid;
    grid-row-gap: ${variables.spacing[2]}px;
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

const Game = ({ browser, game, participants, userNation, turn }) => {
  const { description, id, name, slug, status } = game;
  const isMobile = browser.lessThan.small;
  return (
    <StyledGame key={id} userNation={userNation}>
      <Link
        className="link-overlay"
        to={status === 'active' ? `/game/${slug}` : `/pre-game/${slug}`}
      />
      <div className="details">
        <Status game={game} turn={turn} />
        <h2 className="name">{name}</h2>
        {!isMobile && <p className="description">{description}</p>}
      </div>
      <div className="players">
        <Players game={game} participants={participants} />
      </div>
    </StyledGame>
  );
};

const mapStateToProps = (state, { game }) => {
  const { browser } = state;
  const { user } = state.auth;
  const { currentTurn } = game;
  const turn = turnSelectors.selectById(state, currentTurn);
  const userNation = selectNationByUser(state, user.id);
  let participants = game.participants.map((p) =>
    userSelectors.selectById(state, p)
  );
  if (!currentTurn) return { browser, participants };
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
  return { browser, participants, turn, userNation };
};

export default connect(mapStateToProps, null)(Game);

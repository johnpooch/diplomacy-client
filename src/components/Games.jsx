import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Players from './Players';
import { variables } from '../variables';

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

export const Status = ({ game }) => {
  const { status, turns } = game;
  let message = 'Unknown status';
  if (status === 'pending') {
    message = 'Waiting for players to join';
  } else if (turns) {
    const currentTurn = turns.find((t) => t.current_turn === true);
    const { phase, season, year } = currentTurn;
    message = `${season} ${year} - ${phase}`;
  }
  return <span>{message}</span>;
};

const Game = (props) => {
  const { game } = props;
  const { description, id, name, slug, status, userNation } = game;
  return (
    <StyledGame key={id} userNation={userNation}>
      <Link
        className="link-overlay"
        to={status === 'active' ? `/game/${slug}` : `/pre-game/${slug}`}
      />
      <div className="details">
        <Status game={game} />
        <h2 className="name">{name}</h2>
        <p className="description">{description}</p>
      </div>
      <div className="players">
        <Players game={game} />
      </div>
    </StyledGame>
  );
};

const StyledGames = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: ${variables.spacing[5]}px;
  grid-column-gap: ${variables.spacing[5]}px;
`;

const Games = ({ games }) => {
  if (!games) return null;
  if (!games.length) return <p>No games found!</p>;
  const elements = games.map((game) => {
    return <Game key={game.id} game={game} />;
  });
  return <StyledGames>{elements}</StyledGames>;
};

export default Games;

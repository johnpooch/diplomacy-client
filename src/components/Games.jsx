import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Players from './Players';

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

export const Status = ({ game }) => {
  const { status, currentTurn } = game;
  let message = 'Unknown status';
  if (status === 'pending') {
    message = 'Waiting for players to join';
  } else if (currentTurn) {
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
        className="overlay"
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
  grid-row-gap: ${(p) => p.theme.space[5]};
  grid-column-gap: ${(p) => p.theme.space[5]};
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

import { Container } from '@material-ui/core';
import React from 'react';

import GameCard from '../../components/GameCard/GameCard';
import GameCardGrid from '../../components/GameCardGrid/GameCardGrid';
import NavBar from '../../components/NavBar/NavBar';

import { BrowseGamesPageProps } from './BrowseGames.types';

const BrowseGames: React.FC<BrowseGamesPageProps> = ({ games }) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <GameCardGrid>
          {games.map((game) => (
            <GameCard game={game} key={game.slug} />
          ))}
        </GameCardGrid>
      </Container>
    </>
  );
};

export default BrowseGames;

import React from 'react';
import styled from '@emotion/styled';

import BrowseGame from '../components/BrowseGame';
import GamesList from '../components/GamesList';
import Loading from '../components/Loading';
import FilterForm from '../components/FilterForm';
import { PageWrapper } from '../styles';
import * as API from '../api';
import gameService from '../services/game';

const StyledList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

class BrowseGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this.fetchGames = this.fetchGames.bind(this);
  }

  componentDidMount() {
    this.fetchGamesAndChoices();
  }

  static getDateDisplayFormat() {
    return {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  fetchGamesAndChoices() {
    const fetchGames = gameService.get();
    const fetchChoices = gameService.getChoices();
    Promise.all([fetchGames, fetchChoices]).then(([games, choices]) => {
      this.setState({
        games,
        choices,
        isLoaded: true,
      });
    });
  }

  fetchGames(filters) {
    gameService.get(filters).then((json) => {
      const games = json.length ? json.slice() : [];
      this.setState({ games, isLoaded: true });
    });
  }

  renderView() {
    const { isLoaded, games, choices } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    const gamesList = [];
    games.forEach((game) => {
      gamesList.push(
        <BrowseGame
          key={game.id}
          id={game.id}
          status={game.status}
          createdAt={game.created_at}
          createdBy={game.created_by}
          variant={game.variant}
          name={game.name}
        />
      );
    });
    return (
      <div>
        <FilterForm choices={choices} callback={this.fetchGames} />
        <StyledList>{gamesList}</StyledList>
      </div>
    );
  }

  render() {
    const { isLoaded, games, choices } = this.state;
    if (!isLoaded) {
      return <Loading />;
    }
    return (
      <PageWrapper className="grid">
        <FilterForm choices={choices} callback={this.fetchGames} />
        <GamesList games={games} />
      </PageWrapper>
    );
  }
}

export default BrowseGames;

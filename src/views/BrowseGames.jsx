import React from 'react';

import GameFilters from '../components/GameFilters';
import GameSummaryList from '../components/GameSummaryList';
import Page from '../components/Page';
import gameService from '../services/game';

class BrowseGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: null,
      choices: null,
      isLoaded: false,
    };
    this.getFilteredGames = this.getFilteredGames.bind(this);
  }

  componentDidMount() {
    this.getGamesAndChoices();
  }

  getGamesAndChoices() {
    const fetchGames = gameService.get();
    const fetchChoices = gameService.getChoices();
    Promise.all([fetchGames, fetchChoices])
      .then(([games, choices]) => {
        this.setState({
          games,
          choices,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  getFilteredGames(filters) {
    gameService.get(filters).then((json) => {
      const games = json.length ? json.slice() : [];
      this.setState({ games, isLoaded: true });
    });
  }

  getHeadingText() {
    const { games } = this.state;
    let text = 'No games available';
    if (games && games.length === 1) {
      text = '1 game available';
    } else if (games && games.length > 1) {
      text = `${games.length} games available`;
    }
    return text;
  }

  render() {
    const { choices, games, isLoaded } = this.state;
    return (
      <Page isLoaded={isLoaded}>
        <GameSummaryList games={games} />
      </Page>
    );
  }
}

export default BrowseGames;

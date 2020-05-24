import React from 'react';

import FilterForm from '../components/FilterForm';
import GamesList from '../components/GamesList';
import Loading from '../components/Loading';
import Page from '../components/Page';
import gameService from '../services/game';

class BrowseGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    Promise.all([fetchGames, fetchChoices]).then(([games, choices]) => {
      this.setState({
        games,
        choices,
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
    if (games.length === 1) {
      text = '1 game available';
    } else if (games.length > 1) {
      text = `${games.length} games available`;
    }
    return text;
  }

  render() {
    const { isLoaded, games, choices } = this.state;
    if (!isLoaded) return <Loading />;
    return (
      <Page headingText={this.getHeadingText()}>
        <FilterForm choices={choices} callback={this.getFilteredGames} />
        <GamesList games={games} />
      </Page>
    );
  }
}

export default BrowseGames;

import React from 'react';
import { connect } from 'react-redux';

import GameFilters from '../components/GameFilters';
import GameSummaryList from '../components/GameSummaryList';
import Page from '../components/Page';
import gameService from '../services/game';
import authActions from '../store/actions/auth';

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
    const { logout, token } = this.props;
    const fetchGames = gameService.getGames(token);
    const fetchChoices = gameService.getChoices();
    Promise.all([fetchGames, fetchChoices])
      .then(([games, choices]) => {
        this.setState({
          games,
          choices,
          isLoaded: true,
        });
      })
      .catch((error) => {
        const { status } = error;
        if (status === 401) {
          logout();
        }
        this.setState({
          isLoaded: true,
        });
      });
  }

  getFilteredGames(filters) {
    const { token } = this.props;
    gameService.getGames(token, filters).then((json) => {
      const games = json.length ? json.slice() : [];
      this.setState({ games, isLoaded: true });
    });
  }

  render() {
    const { choices, games, isLoaded } = this.state;
    return (
      <Page headingText={null} isLoaded={isLoaded}>
        <GameFilters choices={choices} callback={this.getFilteredGames} />
        <GameSummaryList games={games} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

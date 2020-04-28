import React from 'react';
import styled from '@emotion/styled';

import Alert from '../components/Alert';
import BrowseGame from '../components/BrowseGame';
import GamesList from '../components/GamesList';
import Loading from '../components/Loading';
import FilterForm from '../components/FilterForm';
import { PageWrapper } from '../styles';
import * as API from '../api';

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
    // should have separate 'gamesLoaded' state.
    this.fetchFilteredGames = this.fetchFilteredGames.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
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

  fetchAPI() {
    const { headers } = this.props;
    const options = { method: 'GET', headers };
    const fetchGames = fetch(API.ALLGAMESURL, options);
    const fetchChoices = fetch(API.GAMEFILTERCHOICESURL, options);

    Promise.all([fetchGames, fetchChoices])
      .then((responses) => {
        return Promise.all(responses.map((r) => r.json()));
      })
      .then(([games, choices]) => {
        this.setState({
          games,
          choices,
          isLoaded: true,
        });
      });
  }

  fetchFilteredGames(data) {
    const queryParams = new URLSearchParams(data).toString();
    const { headers } = this.props;
    const options = { method: 'GET', headers };
    fetch(`${API.ALLGAMESURL}?${queryParams}`, options)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to connect to service');
        }
        return response.json();
      })
      .then((json) => {
        const games = json.length ? json.slice() : [];
        this.setState({
          games,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  renderView() {
    const { isLoaded, games, choices } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    if (!games || !games.length) {
      return <Alert text="No games found" type="error" />;
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
        <FilterForm choices={choices} callback={this.fetchFilteredGames} />
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
        <FilterForm choices={choices} callback={this.fetchFilteredGames} />
        <GamesList games={games} />
      </PageWrapper>
    );
  }
}

export default BrowseGames;

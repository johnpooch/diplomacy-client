import React from 'react';
import styled from '@emotion/styled';

import Alert from '../components/Alert';
import BrowseGame from '../components/BrowseGame';
import Loading from '../components/Loading';
import { PageWrapper } from '../globals';
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
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    const { headers } = this.props;
    fetch(API.ALLGAMESURL, {
      method: 'GET',
      headers,
    })
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
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoaded: true,
        });
      });
  }

  renderView() {
    const { isLoaded, games } = this.state;

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
    return <StyledList>{gamesList}</StyledList>;
  }

  render() {
    return <PageWrapper>{this.renderView()}</PageWrapper>;
  }
}

export default BrowseGames;

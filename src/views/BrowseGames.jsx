import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import Alert from '../components/Alert';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import { StyledWrapper } from '../globals';
import * as API from '../api';
import { colors, spacing } from '../variables';

const StyledList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${spacing[5]}px;
  }

  a {
    text-decoration: none;
    color: ${colors.base};

    &:hover .name {
      text-decoration: underline;
    }
  }

  header {
    margin-bottom: ${spacing[2]}px;
  }

  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: ${spacing[2]}px;
    }
  }

  .name {
    font-weight: 600;
  }

  .id {
    margin-left: ${spacing[1]}px;

    &:before {
      content: '#';
    }
  }

  .label {
    font-style: italic;

    &:after {
      content: ': ';
    }
  }
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

  static getDateDisplayFormat() {
    return {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  static renderGamesListItem(game) {
    const date = new Date(game.created_at);
    const dateString = date.toLocaleDateString(
      'en-GB',
      BrowseGames.getDateDisplayFormat()
    );

    return (
      <StyledListItem key={game.id}>
        <Link to={`/game/${game.id}`}>
          <header>
            <span className="name">{game.name}</span>
            <span className="id">{game.id}</span>
          </header>
          <main>
            <p className="created-at">
              <span className="label">Created</span>
              <time className="value" dateTime={game.created_at}>
                {dateString}
              </time>
            </p>
            <p className="created-by">
              <span className="label">By player</span>
              <span className="value">{game.created_by}</span>
            </p>
            <p className="variant">
              <span className="label">Variant</span>
              <span className="value">{game.variant.name}</span>
            </p>
          </main>
        </Link>
      </StyledListItem>
    );
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
      gamesList.push(BrowseGames.renderGamesListItem(game));
    });
    return <StyledList>{gamesList}</StyledList>;
  }

  render() {
    return (
      <StyledWrapper>
        <Heading text="Browse Games" />
        {this.renderView()}
      </StyledWrapper>
    );
  }
}

export default BrowseGames;

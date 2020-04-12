import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import Alert from '../components/Alert';
import Loading from '../components/Loading';
import * as API from '../api';
import { colors, sizes } from '../variables';

export const StyledDiv = styled.div`
  padding: ${sizes.p}px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: ${colors.base};

    &:hover .name {
      text-decoration: underline;
    }
  }

  header {
    margin-bottom: ${sizes.p}px;
  }

  .game-list > li {
    &:not(:last-child) {
      margin-bottom: ${sizes.p * 2}px;
    }
  }

  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: ${sizes.p / 2}px;
    }
  }

  .name {
    font-weight: 600;
  }

  .id {
    margin-left: ${sizes.p / 2}px;

    &:before {
      content: '#';
    }
  }

  .label {
    color: ${colors.gray};

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
    this.getAllGames();
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

  getAllGames() {
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

  renderGamesList() {
    const { isLoaded, games } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    if (!games || !games.length) {
      return <Alert text="No games found" type="error" />;
    }

    const gamesList = [];
    games.forEach((g) => {
      const date = new Date(g.created_at);
      const dateString = date.toLocaleDateString(
        'en-GB',
        BrowseGames.getDateDisplayFormat()
      );
      gamesList.push(
        <li key={g.id} className="game" data-id={g.id}>
          <Link to={`/game/${g.id}`}>
            <header>
              <span className="name">{g.name}</span>
              <span className="id">{g.id}</span>
            </header>
            <main>
              <p className="created_at">
                <span className="label">Created</span>
                <time dateTime={g.created_at}>{dateString}</time>
              </p>
              <p className="created_by">
                <span className="label">By player</span>
                {g.created_by}
              </p>
              <p className="variant">
                <span className="label">Variant</span>
                {g.variant.name}
              </p>
            </main>
          </Link>
        </li>
      );
    });

    return <ul className="game-list">{gamesList}</ul>;
  }

  render() {
    return (
      <StyledDiv>
        <h1>Browse Games</h1>
        {this.renderGamesList()}
      </StyledDiv>
    );
  }
}

export default BrowseGames;
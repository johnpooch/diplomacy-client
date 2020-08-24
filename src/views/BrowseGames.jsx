import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { spacing } from '../variables';

import GameFilters from '../components/GameFilters';
import GameSummaryList from '../components/GameSummaryList';
import Page from '../components/Page';
import gameService from '../services/game';
import { logout } from '../store/auth';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

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
    const { onUnauthorized, token } = this.props;
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
          onUnauthorized();
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
        <StyledDiv>
          <div>
            <GameFilters choices={choices} callback={this.getFilteredGames} />
            <GameSummaryList games={games} />
          </div>
          <div>My active games</div>
        </StyledDiv>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUnauthorized: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

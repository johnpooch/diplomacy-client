import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { spacing } from '../variables';

import GameSummaryList from '../components/GameSummaryList';
import Page from '../components/Page';
import { getGames } from '../store/selectors';
import { logout } from '../store/auth';
import { gameActions } from '../store/games';
import { variantActions } from '../store/variants';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

const BrowseGames = (props) => {
  const {
    loadVariants,
    loadGames,
    location,
    loading,
    games,
    token,
    variants,
  } = props;

  useEffect(() => {
    if (!variants.allIds.length) {
      loadVariants(token);
    }
    // TODO add some sort of logic to determine when to load games again
    if (!games.length) {
      loadGames(token);
    }
  }, [location.pathname]);

  return (
    <Page headingText={null} isLoaded={!loading}>
      <StyledDiv>
        <div>
          {/* <GameFilters choices={choices} callback={this.getFilteredGames} /> */}
          <GameSummaryList games={games} />
        </div>
        <div>My active games</div>
      </StyledDiv>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.entities.games.loading,
    games: getGames(state),
    variants: state.entities.variants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUnauthorized: () => dispatch(logout()),
    loadGames: () => dispatch(gameActions.loadGames()),
    loadVariants: () => dispatch(variantActions.loadVariants()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

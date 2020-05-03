import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  browserHistory,
} from 'react-router-dom';
import styled from '@emotion/styled';

import BrowseGames from './BrowseGames';
import Error from './Error';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import FlashMessage from '../components/FlashMessage';
import Header from '../components/Header';
import alertActions from '../store/actions/alert';
import { sizes } from '../variables';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${sizes.headerHeight}px;
`;

function routeChange() {
  const dispatch = useDispatch();
  dispatch(alertActions.clear());
}

function App(props) {
  const { alert } = props;

  return (
    <div>
      <Router history={browserHistory}>
        <StyledDiv>
          <Header />
          <FlashMessage text={alert.message} type={alert.type} />
          <Switch>
            // TODO implement private routes
            <Route path="/game/:id">
              <Game />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <BrowseGames />
            </Route>
            <Route>
              <Error text="Page not found" />
            </Route>
          </Switch>
        </StyledDiv>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, null)(App);

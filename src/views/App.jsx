import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled from '@emotion/styled';

import BrowseGames from './BrowseGames';
import Error from './Error';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import Header from '../components/Header';
import alertActions from '../store/actions/alert';
import { history } from '../utils';
import { sizes } from '../variables';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${sizes.headerHeight}px;
`;

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Router>
        <StyledDiv>
          <Header />
          {/* <Alert> // TODO this is nicer than above
            <Flash />
          </Alert> */}
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
  // return {
  //   isAuthenticated: state.token !== null,
  // };
};

export default connect(mapStateToProps, null)(App);

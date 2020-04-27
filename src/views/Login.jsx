import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { css } from '@emotion/core';

import Heading from '../components/Heading';
import Loading from '../components/Loading';
import { PageWrapper, GenericForm, FormLabel } from '../styles';
import * as actions from '../store/actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    const { onAuth, history } = this.props;
    onAuth(username, password);
    history.push('/');
  }

  render() {
    const { username, password } = this.state;
    const { error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    return (
      <PageWrapper>
        <Heading text="Log in" />
        {errorMessage}
        <GenericForm onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            <FormLabel>Username</FormLabel>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="password">
            <FormLabel>Password</FormLabel>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </label>
          <p>
            <button type="submit">Log in</button>
          </p>
          <p>
            Not a member? <Link to="/register">Create an account</Link>
          </p>
        </GenericForm>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

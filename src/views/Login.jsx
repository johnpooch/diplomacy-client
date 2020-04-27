import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Error from './Error';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import {
  PageWrapper,
  GenericForm,
  FormLabel,
  Button,
  TwoColumns,
} from '../styles';
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
    if (error) {
      return <Error text={error.message} />;
    }
    return (
      <PageWrapper>
        <Heading text="Login" />
        <GenericForm onSubmit={this.handleSubmit}>
          <TwoColumns>
            <label htmlFor="username">
              <FormLabel>Username</FormLabel>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="username"
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
                autoComplete="current-password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </label>
          </TwoColumns>
          <p>
            <Button type="submit">Log in</Button>
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

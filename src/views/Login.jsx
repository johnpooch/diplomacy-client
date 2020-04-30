import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Alert from '../components/Alert';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import {
  PageWrapper,
  GenericForm,
  FormLabel,
  Button,
  TwoColumns,
} from '../styles';
import authActions from '../store/actions/auth';

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

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { onAuth } = this.props;
    onAuth(username, password);
  }

  render() {
    const { username, password } = this.state;
    const { error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    let alert = null;
    if (error) {
      alert = <Alert type="error" text="Invalid username or password" />;
    }
    return (
      <PageWrapper>
        <Heading text="Login" />
        {alert}
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
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(authActions.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

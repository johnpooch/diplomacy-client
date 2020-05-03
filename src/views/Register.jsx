import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    const { username, email, password } = this.state;
    const { onAuth } = this.props;
    onAuth(username, email, password);
  }

  render() {
    const { error } = this.props;
    const {
      username,
      email,
      password,
      passwordConfirmation,
      loading,
    } = this.state;
    if (loading) {
      return <Loading />;
    }
    let alert = null;
    if (error) {
      alert = <Alert type="error" text={error.message} />;
    }
    return (
      <PageWrapper>
        <Heading text="Register" />
        {alert}
        <GenericForm onSubmit={this.handleSubmit}>
          <TwoColumns>
            <label htmlFor="username">
              <FormLabel>Username</FormLabel>
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="email">
              <FormLabel>Email address</FormLabel>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="password">
              <FormLabel>Password</FormLabel>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="passwordConfirmation">
              <FormLabel>Confirm password</FormLabel>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirm password"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={this.handleChange}
                required
              />
            </label>
          </TwoColumns>
          <p>
            <Button type="submit">Register</Button>
          </p>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </GenericForm>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // loading: state.loading,
    // error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password) =>
      dispatch(authActions.register(username, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import {
  PageWrapper,
  GenericForm,
  FormLabelText,
  Button,
  Grid,
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

    return (
      <PageWrapper>
        <Header />
        <Heading text="Register" />
        <GenericForm onSubmit={this.handleSubmit}>
          <Grid columns={2}>
            <label htmlFor="username">
              <FormLabelText>Username</FormLabelText>
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
              <FormLabelText>Email address</FormLabelText>
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
              <FormLabelText>Password</FormLabelText>
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
              <FormLabelText>Confirm password</FormLabelText>
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
          </Grid>
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
    registered: state.register.registered,
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password) =>
      dispatch(authActions.register(username, email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));

import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

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

class Login extends React.Component {
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
    const { loggedIn } = this.props;

    if (loggedIn === undefined) {
      return <Loading />;
    }

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <PageWrapper>
        <Heading text="Login" />
        <GenericForm onSubmit={this.handleSubmit}>
          <Grid columns={2}>
            <label htmlFor="username">
              <FormLabelText>Username</FormLabelText>
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
              <FormLabelText>Password</FormLabelText>
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
          </Grid>
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

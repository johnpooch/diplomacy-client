import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Page from '../components/Page';
import authActions from '../store/actions/auth';
import { GenericForm, FormLabelText, Button } from '../styles';

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
    return (
      <Page headingText="Login" isLoaded>
        <GenericForm onSubmit={this.handleSubmit}>
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
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            <Button type="submit">Log in</Button>
          </p>
          <p>
            Not a member? <Link to="/register">Create an account</Link>
          </p>
        </GenericForm>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(authActions.login(username, password)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));

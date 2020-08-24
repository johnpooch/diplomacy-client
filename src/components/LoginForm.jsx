import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { login } from '../store/auth';
import FormContainer from './FormContainer';
import { GenericForm, FormLabelText, Button } from '../styles';

const LoginForm = (props) => {
  const [{ username, password }, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { onAuth } = props;
    onAuth(username, password);
  };

  return (
    <FormContainer>
      <GenericForm onSubmit={handleSubmit}>
        <label htmlFor="username">
          <FormLabelText>Username</FormLabelText>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={handleChange}
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
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <p>
          <Button type="submit">Log in</Button>
        </p>
        <p className="forgot-password-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <hr />
        <p>
          Not a member? <Link to="/register">Create an account</Link>
        </p>
      </GenericForm>
    </FormContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(login(username, password)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));

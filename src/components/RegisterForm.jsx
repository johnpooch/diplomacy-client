import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { register } from '../store/auth';
import FormContainer from './FormContainer';
import { GenericForm, FormLabelText, Button } from '../styles';

const RegisterForm = (props) => {
  const [{ email, username, password }, setState] = useState({
    email: '',
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
    onAuth(username, email, password);
  };

  return (
    <FormContainer>
      <GenericForm onSubmit={handleSubmit}>
        <label htmlFor="email">
          <FormLabelText>Email address</FormLabelText>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
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
          <Button type="submit">Register</Button>
        </p>
        <hr />
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </GenericForm>
    </FormContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password) =>
      dispatch(register(username, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RegisterForm));

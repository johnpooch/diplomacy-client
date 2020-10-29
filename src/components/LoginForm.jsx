import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import useForm from '../hooks/useForm';
import FieldError from './FieldError';
import FormContainer from './FormContainer';
import NonFieldErrors from './NonFieldErrors';
import { GenericForm, FormLabelText, Button } from '../styles';

const LoginForm = (props) => {
  const [{ username, password }, handleChange] = useForm({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    nonFieldErrors: [],
  });

  const { onAuth } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(setErrors, username, password);
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
          <FieldError error={errors.username} />
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
          <FieldError error={errors.password} />
        </label>
        <p>
          <Button type="submit">Log in</Button>
        </p>
        <NonFieldErrors errors={errors.non_field_errors} />
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

export default withRouter(LoginForm);

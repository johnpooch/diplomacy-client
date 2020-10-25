import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import FieldError from './FieldError';
import FormContainer from './FormContainer';
import NonFieldErrors from './NonFieldErrors';
import useForm from '../hooks/useForm';
import { GenericForm, FormLabelText, Button } from '../styles';

const RegisterForm = (props) => {
  const [{ email, username, password }, handleChange] = useForm({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    nonFieldErrors: [],
  });

  const { onAuth } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(setErrors, username, email, password);
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
          <FieldError error={errors.email} />
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
          <Button type="submit">Register</Button>
        </p>
        <NonFieldErrors errors={errors.non_field_errors} />
        <hr />
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </GenericForm>
    </FormContainer>
  );
};

export default withRouter(RegisterForm);

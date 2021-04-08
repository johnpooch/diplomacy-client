import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { Button } from '../components/Button';
import Form, { LabelText, FormWrapper } from '../components/Form';

const Register = ({ errors, onAuth }) => {
  const [{ email, username, password }, handleChange] = useForm({
    email: '',
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(username, email, password);
  };

  return (
    <Page title="Register">
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <LabelText>Email address</LabelText>
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
            <LabelText>Username</LabelText>
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
            <LabelText>Password</LabelText>
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

          <Button type="submit">Register</Button>

          <NonFieldErrors errors={errors.non_field_errors} />

          <hr />

          <p className="forgot-password-link">
            Forgotten password?{' '}
            <Link to="/forgot-password">Reset password</Link>
          </p>

          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Form>
      </FormWrapper>
    </Page>
  );
};

export default withRouter(Register);

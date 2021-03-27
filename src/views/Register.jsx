import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import { Button } from '../components/Button';
import Form, { FormLabel } from '../components/Form';
import FormWrapper from '../components/FormWrapper';

const Register = ({ errors, onAuth }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ username, email, password }) =>
    onAuth(username, email, password);

  return (
    <Page title="Register">
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <FormLabel>Email address</FormLabel>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              ref={register}
              required
            />
            <FieldError error={errors.email} />
          </label>

          <label htmlFor="username">
            <FormLabel>Username</FormLabel>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="username"
              ref={register}
              required
            />
            <FieldError error={errors.username} />
          </label>

          <label htmlFor="password">
            <FormLabel>Password</FormLabel>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              ref={register}
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

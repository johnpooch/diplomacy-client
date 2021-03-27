import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import { Button } from '../components/Button';
import Form, { FormLabel } from '../components/Form';
import FormWrapper from '../components/FormWrapper';

const LoginForm = ({ errors, onAuth }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ username, password }) => {
    onAuth(username, password);
  };

  return (
    <Page title="Log in">
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <p>
            <Button type="submit">Log in</Button>
          </p>

          <NonFieldErrors errors={errors.non_field_errors} />

          <hr />

          <p className="forgot-password-link">
            Forgotten password?{' '}
            <Link to="/forgot-password">Reset password</Link>
          </p>

          <p>
            Not a member yet? <Link to="/register">Create an account</Link>
          </p>
        </Form>
      </FormWrapper>
    </Page>
  );
};

export default withRouter(LoginForm);

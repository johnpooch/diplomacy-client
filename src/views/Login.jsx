import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

import { Button } from '../components/Button';
import Form, { LabelText, FormWrapper } from '../components/Form';
import FieldError from '../components/FormError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';

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
            <LabelText>Email or username</LabelText>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Email or username"
              autoComplete="username"
              autoCapitalize="off"
              ref={register}
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

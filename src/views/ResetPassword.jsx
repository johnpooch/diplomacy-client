import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import { Button } from '../components/Button';
import FieldError from '../components/FieldError';
import Form, { LabelText, FormWrapper } from '../components/Form';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';

const ResetPassword = ({ errors, history, location, onAuth }) => {
  const { register, handleSubmit } = useForm();

  const token = new URLSearchParams(location.search).get('token');
  if (!token) history.push('/');

  const onSubmit = ({ password }) => {
    onAuth(password);
  };

  return (
    <Page title="Reset Password">
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p>Enter your new password.</p>

          <label htmlFor="password">
            <LabelText>Password</LabelText>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              ref={register}
              required
            />
            <FieldError error={errors.password} />
          </label>
          <Button type="submit">Reset password</Button>
          <NonFieldErrors errors={errors.non_field_errors} />
        </Form>
      </FormWrapper>
    </Page>
  );
};

export default withRouter(ResetPassword);

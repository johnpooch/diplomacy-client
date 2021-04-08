import React from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import { Button } from '../components/Button';
import Form, { LabelText, FormWrapper } from '../components/Form';

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

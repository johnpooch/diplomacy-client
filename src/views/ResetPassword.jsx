import React from 'react';
import { withRouter } from 'react-router-dom';

import FieldError from '../components/FieldError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { Button } from '../components/Button';
import Form, { FormLabel, FormWrapper } from '../components/Form';

const ResetPassword = ({ errors, history, location, onAuth }) => {
  const [{ password }, handleChange] = useForm({ password: '' });

  const token = new URLSearchParams(location.search).get('token');
  if (!token) history.push('/');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(token, password);
  };

  return (
    <Page title="Reset Password">
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <p>Enter your new password.</p>

          <label htmlFor="password">
            <FormLabel>Password</FormLabel>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              value={password}
              onChange={handleChange}
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

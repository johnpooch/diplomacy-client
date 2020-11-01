import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FieldError from '../components/FieldError';
import Form from '../components/Form';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { FormLabel, Button } from '../styles';

const ResetPassword = ({ history, location, onAuth }) => {
  const [{ password }, handleChange] = useForm({ password: '' });

  const [errors, setErrors] = useState({
    nonFieldErrors: [],
  });

  const token = new URLSearchParams(location.search).get('token');
  if (!token) history.push('/');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(setErrors, token, password);
  };

  return (
    <Page title="Reset Password" centered>
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
    </Page>
  );
};

export default withRouter(ResetPassword);

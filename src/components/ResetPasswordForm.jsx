import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FieldError from './FieldError';
import FormContainer from './FormContainer';
import NonFieldErrors from './NonFieldErrors';
import useForm from '../hooks/useForm';
import { GenericForm, FormLabelText, Button } from '../styles';

const ResetPassword = ({ history, location, onAuth }) => {
  const [{ password }, handleChange] = useForm({ password: '' });

  const [errors, setErrors] = useState({
    nonFieldErrors: [],
  });

  const token = new URLSearchParams(location.search).get('token');
  if (!token) {
    history.push('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(setErrors, token, password);
  };

  return (
    <FormContainer>
      <GenericForm onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>Enter your new password.</p>
        <label htmlFor="password">
          <FormLabelText>Password</FormLabelText>
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
        <p>
          <Button type="submit">Reset password</Button>
        </p>
        <NonFieldErrors errors={errors.non_field_errors} />
      </GenericForm>
    </FormContainer>
  );
};

export default withRouter(ResetPassword);

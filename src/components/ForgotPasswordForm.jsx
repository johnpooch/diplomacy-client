import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import FieldError from './FieldError';
import FormContainer from './FormContainer';
import NonFieldErrors from './NonFieldErrors';
import useForm from '../hooks/useForm';
import { GenericForm, FormLabelText, Button } from '../styles';

const ForgotPassword = ({ onAuth }) => {
  const [{ email }, handleChange] = useForm({ email: '' });

  const [errors, setErrors] = useState({
    nonFieldErrors: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(setErrors, email);
  };

  return (
    <FormContainer>
      <GenericForm onSubmit={handleSubmit}>
        <p className="forgot-password-paragraph">
          <strong>Forgotten your password?</strong> Enter your email and
          we&apos;ll send you a link to get back into your account.
        </p>
        <label htmlFor="email">
          <FormLabelText>Email</FormLabelText>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            required
          />
          <FieldError error={errors.email} />
        </label>
        <NonFieldErrors errors={errors.non_field_errors} />
        <p>
          <Button type="submit">Send reset link</Button>
        </p>
        <hr />
        <p>
          Not a member? <Link to="/register">Create an account</Link>
        </p>
      </GenericForm>
    </FormContainer>
  );
};

export default withRouter(ForgotPassword);

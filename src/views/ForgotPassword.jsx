import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import FieldError from '../components/FieldError';
import Form from '../components/Form';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import { FormLabel, Button } from '../styles';

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
    <Page title="Forgot password" centered>
      <Form onSubmit={handleSubmit}>
        <p>
          Enter your email and we&apos;ll send you a link to get back into your
          account.
        </p>

        <label htmlFor="email">
          <FormLabel>Email</FormLabel>
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

        <Button type="submit">Send reset link</Button>

        <hr />

        <p>
          Remebered your password? <Link to="/login">Log in</Link>
        </p>

        <p>
          Not a member yet? <Link to="/register">Create an account</Link>
        </p>
      </Form>
    </Page>
  );
};

export default withRouter(ForgotPassword);

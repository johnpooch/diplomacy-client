import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

import { Button } from '../components/Button';
import Form, { LabelText, FormWrapper } from '../components/Form';
import FieldError from '../components/FormError';
import NonFieldErrors from '../components/NonFieldErrors';
import Page from '../components/Page';

const ForgotPassword = ({ errors, onAuth }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email }) => onAuth(email);

  return (
    <Page title="Forgot password">
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p>
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </p>

          <label htmlFor="email">
            <LabelText>Email</LabelText>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              ref={register}
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
      </FormWrapper>
    </Page>
  );
};

export default withRouter(ForgotPassword);

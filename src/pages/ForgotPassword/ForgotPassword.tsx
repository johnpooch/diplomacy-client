import { Typography } from '@material-ui/core';
import React from 'react';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormLink,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';

const ForgotPassword: React.FC = () => {
  const sumbitButton = <PrimaryButton>Forgot Password</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Forgot Password">
        <Form button={sumbitButton} onSubmit={() => null}>
          <Typography variant="body2">
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </Typography>
          <FormFieldWrapper
            name="email"
            label="Email"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'email',
              type: 'email',
            }}
          />
        </Form>
        <div className="form-links">
          <FormLink
            prompt="Remembered your password?"
            link="/login"
            label="Log in"
          />
          <FormLink
            prompt="Not a member yet?"
            link="/register"
            label="Create an account"
          />
        </div>
      </FormWrapper>
    </FormContainer>
  );
};

export default ForgotPassword;

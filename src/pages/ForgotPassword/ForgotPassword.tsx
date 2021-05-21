import { Typography } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormLink,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';
import actions from '../../store/actions';

export const ForgotPassword: React.FC<ReduxProps> = ({ errors, onSubmit }) => {
  const sumbitButton = (
    <PrimaryButton type="submit">Send reset link</PrimaryButton>
  );
  return (
    <FormContainer>
      <FormWrapper title="Forgot Password">
        <Form button={sumbitButton} errors={errors} onSubmit={onSubmit}>
          <Typography variant="body2">
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </Typography>
          <FormFieldWrapper
            name="email"
            label="Email"
            errors={errors.email}
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

const mapState = (state) => {
  const errors = state.errors.resetPasswordStatus || {};
  return { errors };
};
const mapDispatch = { onSubmit: actions.resetPassword };
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotPassword);

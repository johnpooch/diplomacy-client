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

export const Register: React.FC<ReduxProps> = ({ errors, onSubmit }) => {
  const sumbitButton = <PrimaryButton type="submit">Register</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Register">
        <Form button={sumbitButton} errors={errors} onSubmit={onSubmit}>
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
          <FormFieldWrapper
            name="username"
            label="Username"
            errors={errors.username}
            field={{
              fieldClass: Input,
              id: 'username',
              type: 'text',
            }}
          />
          <FormFieldWrapper
            name="password"
            label="Password"
            errors={errors.password}
            field={{
              fieldClass: Input,
              id: 'password',
              type: 'password',
            }}
          />
        </Form>
        <div className="form-links">
          <FormLink
            prompt="Forgotten password?"
            link="/forgot-password"
            label="Reset password"
          />
          <FormLink
            prompt="Already have an account?"
            link="/login"
            label="Log in"
          />
        </div>
      </FormWrapper>
    </FormContainer>
  );
};

const mapState = (state) => {
  const errors = state.errors.registerStatus || {};
  return { errors };
};
const mapDispatch = { onSubmit: actions.register };
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Register);

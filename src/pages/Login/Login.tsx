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
import { authActions } from '../../store/auth';

const Login: React.FC<ReduxProps> = ({ login }) => {
  const sumbitButton = <PrimaryButton type="submit">Login</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Login">
        <Form button={sumbitButton} onSubmit={login}>
          <FormFieldWrapper
            name="username"
            label="Username or email"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'username',
              type: 'text',
            }}
          />
          <FormFieldWrapper
            name="password"
            label="Password"
            errors={[]}
            field={{
              fieldClass: Input,
              id: 'password',
              type: 'password',
            }}
          />
        </Form>
        <div className="form-links">
          <FormLink
            prompt="Not a member yet?"
            link="/register"
            label="Create an account"
          />
          <FormLink
            prompt="Forgotten password?"
            link="/forgot-password"
            label="Reset password"
          />
        </div>
      </FormWrapper>
    </FormContainer>
  );
};

const mapDispatch = { login: authActions.login };
const connector = connect(null, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Login);

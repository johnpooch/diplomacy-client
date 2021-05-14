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

const Login: React.FC = () => {
  const sumbitButton = <PrimaryButton>Login</PrimaryButton>;
  return (
    <FormContainer>
      <FormWrapper title="Login">
        <Form button={sumbitButton} onSubmit={() => null}>
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

export default Login;

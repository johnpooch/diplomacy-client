import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import AlertList from '../../components/AlertList/AlertList';
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
import selectors from '../../store/selectors';

export const Login: React.FC<ReduxProps> = ({
  alerts,
  alertsClear,
  errors,
  onSubmit,
}) => {
  const sumbitButton = <PrimaryButton type="submit">Log in</PrimaryButton>;
  return (
    <>
      <AlertList alerts={alerts} onClose={alertsClear} />
      <FormContainer>
        <FormWrapper title="Login">
          <Form button={sumbitButton} errors={errors} onSubmit={onSubmit}>
            <FormFieldWrapper
              name="username"
              label="Username or email"
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
    </>
  );
};

const mapState = (state) => {
  const alerts = selectors.selectAlerts(state);
  const errors = state.errors.loginStatus ? state.errors.loginStatus : {};
  return { alerts, errors };
};
const mapDispatch = {
  alertsClear: actions.alertsClear,
  onSubmit: actions.login,
};
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Login);

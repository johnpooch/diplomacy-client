import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';
import actions from '../../store/actions';

export const CreateGame: React.FC<ReduxProps> = ({ errors, onSubmit }) => {
  const submitButton = <PrimaryButton type="submit">Create Game</PrimaryButton>;
  // TODO selects and required
  return (
    <FormContainer>
      <FormWrapper title="Create Game">
        <Form button={submitButton} errors={errors} onSubmit={onSubmit}>
          <FormFieldWrapper
            name="name"
            label="Name"
            errors={errors.name}
            field={{
              fieldClass: Input,
              id: 'name',
              type: 'text',
            }}
          />
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

const mapState = (state) => {
  const errors = state.errors.createGameStatus || {};
  return { errors };
};
const mapDispatch = {
  onSubmit: actions.createGame,
};
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CreateGame);

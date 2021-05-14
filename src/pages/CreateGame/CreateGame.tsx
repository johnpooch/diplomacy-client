import React from 'react';

import { PrimaryButton } from '../../components/Button/Button';
import {
  Form,
  FormContainer,
  FormFieldWrapper,
  FormWrapper,
} from '../../components/Form';
import Input from '../../components/Input/Input';

// import { CreateGamePageProps } from './CreateGame.types';

const CreateGame: React.FC = () => {
  const submitButton = <PrimaryButton>Create Game</PrimaryButton>;
  // TODO selects and required
  return (
    <FormContainer>
      <FormWrapper title="Create Game">
        <Form button={submitButton} onSubmit={() => null}>
          <FormFieldWrapper
            name="name"
            label="Name"
            errors={[]}
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

export default CreateGame;

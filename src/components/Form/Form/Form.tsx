import React from 'react';
import { useForm } from 'react-hook-form';

import { FormComponentProps } from './Form.types';

const Form: React.FC<FormComponentProps> = ({ button, onSubmit, children }) => {
  const { register, handleSubmit } = useForm();
  const childrenWithRegister = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: register });
    }
    return child;
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {childrenWithRegister}
      {button}
    </form>
  );
};

export default Form;

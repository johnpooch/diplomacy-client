import React from 'react';
import { useForm } from 'react-hook-form';

import { FormComponentProps } from './Form.types';

const Form: React.FC<FormComponentProps> = ({ onSubmit, children }) => {
  const { register, handleSubmit } = useForm();
  const childrenWithRegister = React.Children.map(children, (child) =>
    React.cloneElement(child, { register })
  );
  return <form onSubmit={handleSubmit(onSubmit)}>{childrenWithRegister}</form>;
};

export default Form;

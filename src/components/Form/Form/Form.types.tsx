import { ReactNode } from 'react';

export interface FormComponentProps {
  button: ReactNode;
  onSubmit: () => void;
}

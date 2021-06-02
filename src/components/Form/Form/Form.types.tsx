import { ReactNode } from 'react';

export interface FormComponentProps {
  button: ReactNode;
  errors: { [key: string]: string[] };
  onSubmit: (data: Record<string, unknown>) => void;
}

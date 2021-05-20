import { ReactNode } from 'react';

export interface FormComponentProps {
  button: ReactNode;
  onSubmit: (data: Record<string, unknown>) => void;
}

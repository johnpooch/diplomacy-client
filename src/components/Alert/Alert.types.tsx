import { Alert } from '../../types';

export interface AlertComponentProps {
  alert: Alert;
  onClose: (id: number) => void;
  variant?: 'standard' | 'filled' | 'outlined';
}

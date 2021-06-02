import { Alert } from '../../types';

export interface AlertListComponentProps {
  alerts: Alert[];
  onClose: (id: number) => void;
}

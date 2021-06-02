import { RouteComponentProps } from 'react-router-dom';

import { Alert } from '../../types';

export interface PageWrapperComponentProps extends RouteComponentProps {
  alerts: Alert[];
  alertsClear: (id: number) => void;
  logout: () => void;
}

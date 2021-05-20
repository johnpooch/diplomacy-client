import { RouteComponentProps } from 'react-router-dom';

export interface NavBarComponentProps extends RouteComponentProps {
  logout: () => void;
}

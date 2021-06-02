import { RouteComponentProps } from 'react-router-dom';

export interface UserDropdownMenuComponentProps extends RouteComponentProps {
  logout: () => void;
}

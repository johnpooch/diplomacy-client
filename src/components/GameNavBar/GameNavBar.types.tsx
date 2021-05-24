import { RouteComponentProps } from 'react-router-dom';

export interface GameNavBarComponentProps extends RouteComponentProps {
  onClickOpenControlPanel: () => void;
}

import { RouteComponentProps } from 'react-router-dom';

export interface FormLinkComponentProps extends RouteComponentProps {
  prompt: string;
  link: string;
  label: string;
}

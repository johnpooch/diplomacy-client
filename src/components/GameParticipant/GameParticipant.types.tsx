import { NationDisplay } from '../../types';

export interface GameParticipantComponentProps {
  isCurrentUser: boolean;
  size?: 'sm' | 'md';
  username: string;
  nation?: NationDisplay;
}

import { NationDisplay } from '../../types';

export interface CircleFlagComponentProps {
  nation?: NationDisplay;
  showTooltip?: boolean;
  size?: 'sm' | 'md';
}

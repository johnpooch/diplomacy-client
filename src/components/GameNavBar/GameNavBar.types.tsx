import { RouteComponentProps } from 'react-router-dom';

import { NationDisplay } from '../../types';
import { CircleFlagComponentProps } from '../CircleFlag/CircleFlag.types';
import { TurnNavComponentProps } from '../TurnNav/TurnNav.types';

export interface GameNavBarComponentProps
  extends RouteComponentProps,
    TurnNavComponentProps,
    CircleFlagComponentProps {
  nation: NationDisplay | null;
  onClickOpenControlPanel: () => void;
}

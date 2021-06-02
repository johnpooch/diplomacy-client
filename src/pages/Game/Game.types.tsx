import { ControlPanelComponentProps } from '../../components/ControlPanel/ControlPanel.types';
import { TurnNavComponentProps } from '../../components/TurnNav/TurnNav.types';

export interface GamePageProps
  extends TurnNavComponentProps,
    ControlPanelComponentProps {
  loading: boolean;
  loadGame: () => void;
}

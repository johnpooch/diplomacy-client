import { NationStateDisplay } from '../../types';

export interface ControlPanelComponentProps {
  cancelOrder: (orderId: number) => void;
  currentTurn: boolean;
  finalizeOrders: () => void;
  nationStates: NationStateDisplay[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

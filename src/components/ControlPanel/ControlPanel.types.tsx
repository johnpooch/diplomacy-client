import { NationOrderHistory, OrderDisplay } from '../../types';

export interface ControlPanelComponentProps {
  currentTurn: boolean;
  nationOrderHistories: NationOrderHistory[];
  numOrdersGiven?: number;
  numOrdersToGive?: number;
  open: boolean;
  orders: {
    loading: boolean;
    order: OrderDisplay;
  }[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

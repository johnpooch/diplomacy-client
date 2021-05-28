import { NationOrderHistory, OrderDisplay } from '../../types';

export interface ControlPanelComponentProps {
  cancelOrder: (orderId: number) => void;
  currentTurn: boolean;
  finalizeOrders: () => void;
  nationOrderHistories: NationOrderHistory[];
  numOrdersGiven?: number;
  numOrdersToGive?: number;
  open: boolean;
  orders: OrderDisplay[];
  ordersFinalized: boolean;
  ordersFinalizedLoading: boolean;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

import { NationDisplay, OrderDisplay, OrderOutcomeDisplay } from '../../types';

export interface OrderHistoryComponentProps {
  nation: NationDisplay;
  numSupplyCenters: number;
  orders: {
    order: OrderDisplay;
    outcome: OrderOutcomeDisplay;
  }[];
  username: string;
}

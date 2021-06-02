import { OrderDisplay, OrderOutcomeDisplay } from '../../types';

export interface OrderComponentProps {
  cancelOrder: (orderId: number) => void;
  order: OrderDisplay;
  outcome: OrderOutcomeDisplay | null;
  isCurrent: boolean;
}

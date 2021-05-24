import { OrderDisplay, OrderOutcomeDisplay } from '../../types';

export interface OrderComponentProps {
  order: OrderDisplay;
  outcome: OrderOutcomeDisplay | null;
  loading: boolean;
  isCurrent: boolean;
}

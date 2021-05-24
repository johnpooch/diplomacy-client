import { OrderDisplay } from '../../types';

export interface OrderListComponentProps {
  numOrdersGiven: number;
  numOrdersToGive: number;
  orders: {
    loading: boolean;
    order: OrderDisplay;
  }[];
}

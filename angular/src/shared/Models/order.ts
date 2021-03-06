import { Customer } from './customer';
import * as moment from 'moment';

export interface Order {
  id: string;
  customer: Customer;
  total: number;
  placed: string;
  completed: string;
}

import { User } from 'features/auth/types/User';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';

export interface Ticket {
  id: string;
  created: string;
  user: User;
  seat: Seat;
  projection: Projection;
}

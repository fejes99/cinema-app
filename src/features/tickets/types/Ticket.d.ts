import { User } from 'features/auth/types/User';

export interface Ticket {
  id: string;
  created: string;
  user: User;
}

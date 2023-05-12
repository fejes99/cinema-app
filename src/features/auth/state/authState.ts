import { Error } from 'common/types/Error';
import { User } from '../types/User';

export interface AuthState {
  users: User[];
  selectedUser: User | null;
  loggedUser: User | null;
  token: string | null;
  loading: boolean;
  error: Error | null;
}

import { Error } from 'common/types/Error';
import { Theater } from '../types/Theater';

export interface TheaterState {
  theaters: Theater[];
  loading: boolean;
  error: Error | null;
}

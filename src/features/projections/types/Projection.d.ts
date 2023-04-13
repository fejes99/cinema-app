import { Movie } from 'features/movies/types/Movie';
import { Ticket } from 'features/tickets/types/Ticket';

export interface Projection {
  id: string;
  // Todo: Change time type
  time: string;
  price: number;
  movie?: Movie;
  // Todo: Should change projectionType type?
  projectionType: string;
  // Todo: Should change theater type?
  theater: string;
  isSold: boolean;
  tickets?: Ticket[];
}

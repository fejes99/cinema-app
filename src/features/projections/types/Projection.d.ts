import { Movie } from 'features/movies/types/Movie';
import { Ticket } from 'features/tickets/types/Ticket';
import { Theater } from 'features/theaters/types/Theater';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';

export interface Projection {
  id: string;
  // Todo: Change time type
  time: string;
  price: number;
  movie?: Movie;
  projectionType: ProjectionType;
  theater: Theater;
  isSold: boolean;
  tickets?: Ticket[];
}

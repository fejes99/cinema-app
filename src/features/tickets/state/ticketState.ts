import { Error } from 'common/types/Error';
import { Ticket } from './../types/Ticket.d';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';

export interface TicketState {
  selectedTicket: Ticket | null;
  userTickets: Ticket[] | null;
  createTicket: {
    projection?: Projection | null | undefined;
    movie?: Movie | null | undefined;
    seats?: Seat[] | null | undefined;
  } | null;
  loading: boolean;
  error: Error | null;
}

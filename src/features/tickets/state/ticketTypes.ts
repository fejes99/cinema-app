import { Error } from 'common/types/Error';
import { Ticket } from '../types/Ticket';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';

export const FETCH_TICKET_REQUEST = 'FETCH_TICKET_REQUEST';
export const FETCH_TICKET_SUCCESS = 'FETCH_TICKET_SUCCESS';
export const FETCH_TICKET_FAIL = 'FETCH_TICKET_FAIL';

export const CREATE_TICKET_INIT = 'CREATE_TICKET_INIT';

export const TICKET_ADD_MOVIE = 'TICKET_ADD_MOVIE';
export const TICKET_ADD_PROJECTION = 'TICKET_ADD_PROJECTION';
export const TICKET_ADD_SEATS = 'TICKET_ADD_SEATS';

interface FetchTicketRequestAction {
  type: typeof FETCH_TICKET_REQUEST;
}

interface FetchTicketSuccessAction {
  type: typeof FETCH_TICKET_SUCCESS;
  selectedTicket: Ticket;
}

interface FetchTicketFailAction {
  type: typeof FETCH_TICKET_FAIL;
  error: Error;
}

interface CreateTicketInitAction {
  type: typeof CREATE_TICKET_INIT;
  movie: Movie;
}

interface TicketAddMovieAction {
  type: typeof TICKET_ADD_MOVIE;
  movie: Movie;
}

interface TicketAddProjectionAction {
  type: typeof TICKET_ADD_PROJECTION;
  projection: Projection;
}

interface TicketAddSeatsAction {
  type: typeof TICKET_ADD_SEATS;
  seats: Seat[];
}

export type TicketActionTypes =
  | FetchTicketRequestAction
  | FetchTicketSuccessAction
  | FetchTicketFailAction
  | CreateTicketInitAction
  | TicketAddMovieAction
  | TicketAddProjectionAction
  | TicketAddSeatsAction;

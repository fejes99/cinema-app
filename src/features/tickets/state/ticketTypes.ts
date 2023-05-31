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

export const CREATE_TICKET_REQUEST = 'CREATE_TICKET_REQUEST';
export const CREATE_TICKET_SUCCESS = 'CREATE_TICKET_SUCCESS';
export const CREATE_TICKET_FAIL = 'CREATE_TICKET_FAIL';

export const DELETE_TICKET_REQUEST = 'DELETE_TICKET_REQUEST';
export const DELETE_TICKET_SUCCESS = 'DELETE_TICKET_SUCCESS';
export const DELETE_TICKET_FAIL = 'DELETE_TICKET_FAIL';

export const FETCH_USER_TICKETS_REQUEST = 'FETCH_USER_TICKETS_REQUEST';
export const FETCH_USER_TICKETS_SUCCESS = 'FETCH_USER_TICKETS_SUCCESS';
export const FETCH_USER_TICKETS_FAIL = 'FETCH_USER_TICKETS_FAIL';

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

interface CreateTicketRequestAction {
  type: typeof CREATE_TICKET_REQUEST;
}

interface CreateTicketSuccessAction {
  type: typeof CREATE_TICKET_SUCCESS;
}

interface CreateTicketFailAction {
  type: typeof CREATE_TICKET_FAIL;
  error: Error;
}

interface DeleteTicketRequestAction {
  type: typeof DELETE_TICKET_REQUEST;
}

interface DeleteTicketSuccessAction {
  type: typeof DELETE_TICKET_SUCCESS;
}

interface DeleteTicketFailAction {
  type: typeof DELETE_TICKET_FAIL;
  error: Error;
}

interface FetchUserTicketsRequestAction {
  type: typeof FETCH_USER_TICKETS_REQUEST;
}

interface FetchUserTicketsSuccessAction {
  type: typeof FETCH_USER_TICKETS_SUCCESS;
  userTickets: Ticket[];
}

interface FetchUserTicketsFailAction {
  type: typeof FETCH_USER_TICKETS_FAIL;
  error: Error;
}

export type TicketActionTypes =
  | FetchTicketRequestAction
  | FetchTicketSuccessAction
  | FetchTicketFailAction
  | CreateTicketInitAction
  | TicketAddMovieAction
  | TicketAddProjectionAction
  | TicketAddSeatsAction
  | CreateTicketRequestAction
  | CreateTicketSuccessAction
  | CreateTicketFailAction
  | DeleteTicketRequestAction
  | DeleteTicketSuccessAction
  | DeleteTicketFailAction
  | FetchUserTicketsRequestAction
  | FetchUserTicketsSuccessAction
  | FetchUserTicketsFailAction;

import { TicketCreateDto } from './../types/TicketCreateDto.d';
import { Error } from 'common/types/Error';
import { Ticket } from '../types/Ticket';
import * as actionTypes from './ticketTypes';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';

const fetchTicketRequest = () => ({
  type: actionTypes.FETCH_TICKET_REQUEST,
});

const fetchTicketSuccess = (ticket: Ticket) => ({
  type: actionTypes.FETCH_TICKET_SUCCESS,
  selectedTicket: ticket,
});

const fetchTicketFail = (error: Error) => ({
  type: actionTypes.FETCH_TICKET_FAIL,
  error: error,
});

export const fetchTicket = (id: string) => (dispatch: AppDispatch) => {
  dispatch(fetchTicketRequest());
  axios
    .get(`/tickets/${id}`)
    .then((response) => dispatch(fetchTicketSuccess(response.data)))
    .catch((error) => dispatch(fetchTicketFail(error)));
};

const createTicketInit = (movie: Movie) => ({
  type: actionTypes.CREATE_TICKET_INIT,
  movie: movie,
});

export const ticketInit = (movie: Movie) => (dispatch: AppDispatch) =>
  dispatch(createTicketInit(movie));

const ticketAddMovie = (movie: Movie) => ({
  type: actionTypes.TICKET_ADD_MOVIE,
  movie: movie,
});

const ticketAddProjection = (projection: Projection) => ({
  type: actionTypes.TICKET_ADD_PROJECTION,
  projection: projection,
});

export const ticketProjection = (projection: Projection) => (dispatch: AppDispatch) => {
  dispatch(ticketAddMovie(projection.movie!));
  dispatch(ticketAddProjection(projection));
};

const ticketAddSeats = (seats: Seat[]) => ({
  type: actionTypes.TICKET_ADD_SEATS,
  seats: seats,
});

export const ticketSeats = (projection: Projection, seats: Seat[]) => (dispatch: AppDispatch) => {
  dispatch(ticketAddMovie(projection.movie!));
  dispatch(ticketAddProjection(projection));
  dispatch(ticketAddSeats(seats));
};

const createTicketRequest = () => ({
  type: actionTypes.CREATE_TICKET_REQUEST,
});

const createTicketSuccess = () => ({
  type: actionTypes.CREATE_TICKET_SUCCESS,
});

const createTicketFail = (error: Error) => ({
  type: actionTypes.CREATE_TICKET_FAIL,
  error: error,
});

export const createTicket = (ticketCreateDto: TicketCreateDto) => (dispatch: AppDispatch) => {
  dispatch(createTicketRequest());
  return axios
    .post('/tickets', ticketCreateDto)
    .then((response) => dispatch(createTicketSuccess()))
    .catch((error) => dispatch(createTicketFail(error)));
};

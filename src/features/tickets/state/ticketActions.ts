import { TicketCreateDto } from './../types/TicketCreateDto.d';
import { Error } from 'common/types/Error';
import { Ticket } from '../types/Ticket';
import * as actionTypes from './ticketTypes';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';
import { toast } from 'react-toastify';

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

const ticketAddProjection = (projection: Projection) => ({
  type: actionTypes.TICKET_ADD_PROJECTION,
  projection: projection,
});

export const ticketProjection = (projection: Projection) => (dispatch: AppDispatch) => {
  dispatch(ticketAddProjection(projection));
};

const ticketAddSeats = (seats: Seat[]) => ({
  type: actionTypes.TICKET_ADD_SEATS,
  seats: seats,
});

export const ticketSeats = (projection: Projection, seats: Seat[]) => (dispatch: AppDispatch) => {
  dispatch(ticketAddSeats(seats));
};

const createTicketRequest = () => ({
  type: actionTypes.CREATE_TICKET_REQUEST,
});

const createTicketSuccess = () => {
  toast.success('Ticket successfully created');
  return {
    type: actionTypes.CREATE_TICKET_SUCCESS,
  };
};

const createTicketFail = (error: Error) => {
  toast.error(error.detail);
  return {
    type: actionTypes.CREATE_TICKET_FAIL,
    error: error,
  };
};

export const createTicket = (ticketCreateDto: TicketCreateDto) => (dispatch: AppDispatch) => {
  dispatch(createTicketRequest());
  axios
    .post('/tickets', ticketCreateDto)
    .then(() => dispatch(createTicketSuccess()))
    .catch((error) => dispatch(createTicketFail(error.response.data)));
};

const deleteTicketRequest = () => ({
  type: actionTypes.DELETE_TICKET_REQUEST,
});

const deleteTicketSuccess = () => {
  toast.success('Ticket successfully deleted');
  return {
    type: actionTypes.DELETE_TICKET_SUCCESS,
  };
};

const deleteTicketFail = (error: Error) => {
  toast.error(error.detail);
  return {
    type: actionTypes.DELETE_TICKET_FAIL,
    error: error,
  };
};

export const removeTicket = (ticketId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteTicketRequest());
  return axios
    .delete(`/tickets/${ticketId}`)
    .then(() => {
      dispatch(deleteTicketSuccess());
    })
    .catch((error) => dispatch(deleteTicketFail(error.response.data)));
};

export const deleteTicket = (ticketId: string, userId: string) => async (dispatch: AppDispatch) => {
  await dispatch(removeTicket(ticketId));
  dispatch(fetchUserTickets(userId));
};

const fetchUserTicketsRequest = () => ({
  type: actionTypes.FETCH_USER_TICKETS_REQUEST,
});

const fetchUserTicketsSuccess = (tickets: Ticket[]) => ({
  type: actionTypes.FETCH_USER_TICKETS_SUCCESS,
  userTickets: tickets,
});

const fetchUserTicketsFail = (error: Error) => ({
  type: actionTypes.FETCH_USER_TICKETS_FAIL,
  error: error,
});

export const fetchUserTickets = (userId: string) => (dispatch: AppDispatch) => {
  dispatch(fetchUserTicketsRequest());
  axios
    .get(`/tickets/user/${userId}`)
    .then((response) => dispatch(fetchUserTicketsSuccess(response.data)))
    .catch((error) => dispatch(fetchUserTicketsFail(error)));
};

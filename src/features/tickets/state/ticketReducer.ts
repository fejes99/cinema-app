import { Reducer } from 'redux';
import { TicketState } from './ticketState';
import * as actionTypes from './ticketTypes';

const initialState: TicketState = {
  selectedTicket: null,
  createTicket: null,
  loading: false,
  error: null,
};

const ticketReducer: Reducer<TicketState, actionTypes.TicketActionTypes> = (
  state = initialState,
  action
): TicketState => {
  switch (action.type) {
    case actionTypes.FETCH_TICKET_REQUEST:
      return { ...state, loading: true, selectedTicket: null, error: null };
    case actionTypes.FETCH_TICKET_SUCCESS:
      return { ...state, loading: false, selectedTicket: action.selectedTicket };
    case actionTypes.FETCH_TICKET_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.CREATE_TICKET_INIT:
      return { ...state, createTicket: { movie: action.movie, projection: null, seats: null } };

    case actionTypes.TICKET_ADD_MOVIE:
      return { ...state, createTicket: { ...state.createTicket, movie: action.movie } };
    case actionTypes.TICKET_ADD_PROJECTION:
      return {
        ...state,
        createTicket: { ...state.createTicket, projection: action.projection, seats: null },
      };
    case actionTypes.TICKET_ADD_SEATS:
      return { ...state, createTicket: { ...state.createTicket, seats: action.seats } };

    case actionTypes.CREATE_TICKET_REQUEST:
      return { ...state, loading: true };
    case actionTypes.CREATE_TICKET_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.CREATE_TICKET_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default ticketReducer;

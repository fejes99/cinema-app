import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  Reducer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AuthActionTypes } from 'features/auth/state/authTypes';
import { AuthState } from 'features/auth/state/authState';
import authReducer from 'features/auth/state/authReducer';
import { MovieActionTypes } from 'features/movies/state/movieTypes';
import { MovieState } from 'features/movies/state/movieState';
import movieReducer from 'features/movies/state/movieReducer';
import { ProjectionState } from 'features/projections/state/projectionState';
import { ProjectionActionTypes } from 'features/projections/state/projectionTypes';
import projectionReducer from 'features/projections/state/projectionReducer';
import { TicketActionTypes } from 'features/tickets/state/ticketTypes';
import { TicketState } from 'features/tickets/state/ticketState';
import ticketReducer from 'features/tickets/state/ticketReducer';
import { ProjectionTypeActionTypes } from 'features/projectionTypes/state/projectionTypeTypes';
import { ProjectionTypeState } from 'features/projectionTypes/state/projectionTypeState';
import projectionTypeReducer from 'features/projectionTypes/state/projectionTypeReducer';
import { TheaterActionTypes } from './../features/theaters/state/theaterTypes';
import { TheaterState } from 'features/theaters/state/theaterState';
import theaterReducer from 'features/theaters/state/theaterReducer';

export interface StoreState {
  auth: AuthState;
  movies: MovieState;
  projections: ProjectionState;
  tickets: TicketState;
  projectionTypes: ProjectionTypeState;
  theaters: TheaterState;
}

export type StoreAction =
  | AuthActionTypes
  | MovieActionTypes
  | ProjectionActionTypes
  | TicketActionTypes
  | ProjectionTypeActionTypes
  | TheaterActionTypes;

export type AppDispatch = typeof store.dispatch;

const rootReducer: Reducer<StoreState, StoreAction> = combineReducers<StoreState>({
  auth: authReducer,
  movies: movieReducer,
  projections: projectionReducer,
  tickets: ticketReducer,
  projectionTypes: projectionTypeReducer,
  theaters: theaterReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<StoreState, any>))
);

export default store;

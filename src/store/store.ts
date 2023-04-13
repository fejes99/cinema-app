import movieReducer from 'features/movies/state/movieReducer';
import projectionReducer from 'features/projections/state/projectionReducer';
import { MovieState } from 'features/movies/state/movieState';
import { MovieActionTypes } from 'features/movies/state/movieTypes';
import { ProjectionState } from 'features/projections/state/projectionState';
import { ProjectionActionTypes } from 'features/projections/state/projectionTypes';
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

export interface StoreState {
  movies: MovieState;
  projections: ProjectionState;
  auth: AuthState;
}

export type StoreAction = MovieActionTypes | ProjectionActionTypes | AuthActionTypes;
export type AppDispatch = typeof store.dispatch;

const rootReducer: Reducer<StoreState, StoreAction> = combineReducers<StoreState>({
  movies: movieReducer,
  projections: projectionReducer,
  auth: authReducer,
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

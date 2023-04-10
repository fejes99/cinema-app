import moviesReducer from 'features/movies/state/movieReducer';
import { MovieState } from 'features/movies/state/movieState';
import { MovieActionTypes } from 'features/movies/state/movieTypes';
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  Reducer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

export interface StoreState {
  movies: MovieState;
}

export type StoreAction = MovieActionTypes;
export type AppDispatch = typeof store.dispatch;

const rootReducer: Reducer<StoreState, StoreAction> = combineReducers<StoreState>({
  movies: moviesReducer,
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

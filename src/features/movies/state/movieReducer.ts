import { Reducer } from 'redux';
import { MovieState } from './movieState';
import * as actionTypes from './movieTypes';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: '',
};

const moviesReducer: Reducer<MovieState, actionTypes.MovieActionTypes> = (
  state = initialState,
  action
): MovieState => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, movies: [], error: null };
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.movies };
    case actionTypes.FETCH_MOVIES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default moviesReducer;

import { Reducer } from 'redux';
import * as actionTypes from './theaterTypes';
import { TheaterState } from './theaterState';

const initialState: TheaterState = {
  theaters: [],
  loading: false,
  error: null,
};

const theaterReducer: Reducer<TheaterState, actionTypes.TheaterActionTypes> = (
  state = initialState,
  action
): TheaterState => {
  switch (action.type) {
    case actionTypes.FETCH_THEATER_REQUEST:
      return { ...state, loading: true, theaters: [], error: null };
    case actionTypes.FETCH_THEATER_SUCCESS:
      return { ...state, loading: false, theaters: action.theaters };
    case actionTypes.FETCH_THEATER_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default theaterReducer;

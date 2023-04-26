import { AppDispatch } from 'store/store';
import { Theater } from '../types/Theater';
import * as actionTypes from './theaterTypes';
import axios from 'axios';

const fetchTheaterRequest = () => ({
  type: actionTypes.FETCH_THEATER_REQUEST,
});

const fetchTheaterSuccess = (theaters: Theater[]) => ({
  type: actionTypes.FETCH_THEATER_SUCCESS,
  theaters: theaters,
});

const fetchTheaterFail = (error: Error) => ({
  type: actionTypes.FETCH_THEATER_FAIL,
  error: error,
});

export const fetchTheaters = () => (dispatch: AppDispatch) => {
  dispatch(fetchTheaterRequest());
  axios
    .get('/theaters')
    .then((response) => dispatch(fetchTheaterSuccess(response.data)))
    .catch((error) => dispatch(fetchTheaterFail(error)));
};

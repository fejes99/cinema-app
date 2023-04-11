import axios from 'axios';
import { AppDispatch } from 'store/store';
import { Movie } from '../types/Movie';
import * as actionTypes from './movieTypes';
import { Error } from 'common/types/Error';

const fetchMoviesRequest = () => ({
  type: actionTypes.FETCH_MOVIES_REQUEST,
});

const fetchMoviesSuccess = (movies: Movie[]) => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  movies: movies,
});

const fetchMoviesFail = (error: Error) => ({
  type: actionTypes.FETCH_MOVIES_FAIL,
  error: error,
});

export const fetchMovies = () => (dispatch: AppDispatch) => {
  dispatch(fetchMoviesRequest());
  axios
    .get('/movies')
    .then((response) => dispatch(fetchMoviesSuccess(response.data)))
    .catch((error) => dispatch(fetchMoviesFail(error)));
};

const fetchMovieRequest = () => ({
  type: actionTypes.FETCH_MOVIE_REQUEST,
});

const fetchMovieSuccess = (selectedMovie: Movie) => ({
  type: actionTypes.FETCH_MOVIE_SUCCESS,
  selectedMovie: selectedMovie,
});

const fetchMovieFail = (error: Error) => ({
  type: actionTypes.FETCH_MOVIE_FAIL,
  error: error,
});

export const fetchMovie = (id: string) => (dispatch: AppDispatch) => {
  dispatch(fetchMovieRequest());
  axios
    .get(`/movies/${id}`)
    .then((response) => {
      console.log('🚀 ~ file: movieActions.ts:48 ~ .then ~ response:', response.data);
      dispatch(fetchMovieSuccess(response.data));
    })
    .catch((error) => dispatch(fetchMovieFail(error)));
};

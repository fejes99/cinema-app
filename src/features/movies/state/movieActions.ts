import { MovieCreateDto } from 'features/movies/types/MovieCreateDto';
import axios from 'axios';
import { AppDispatch } from 'store/store';
import { Movie } from '../types/Movie';
import * as actionTypes from './movieTypes';
import { MovieUpdateDto } from '../types/MovieUpdateDto';
import { toast } from 'react-toastify';
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

export const fetchMovies =
  () =>
  (dispatch: AppDispatch): void => {
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

export const fetchMovie =
  (id: string) =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchMovieRequest());
    axios
      .get(`/movies/${id}`)
      .then((response) => dispatch(fetchMovieSuccess(response.data)))
      .catch((error) => dispatch(fetchMovieFail(error)));
  };

const createMovieRequest = () => ({
  type: actionTypes.CREATE_MOVIE_REQUEST,
});

const createMovieSuccess = (newMovie: Movie) => {
  toast.success('Movie successfully created');
  return {
    type: actionTypes.CREATE_MOVIE_SUCCESS,
    selectedMovie: newMovie,
  };
};

const createMovieFail = (error: Error) => {
  toast.error(error.detail);
  return {
    type: actionTypes.CREATE_MOVIE_FAIL,
    error: error,
  };
};

const addMovie = (movieCreateDto: MovieCreateDto) => (dispatch: AppDispatch) => {
  dispatch(createMovieRequest());
  return axios
    .post('/movies', movieCreateDto)
    .then((response) => dispatch(createMovieSuccess(response.data)))
    .catch((error) => dispatch(createMovieFail(error.response.data)));
};

export const createMovie =
  (movieCreateDto: MovieCreateDto) =>
  async (dispatch: AppDispatch): Promise<void> => {
    await dispatch(addMovie(movieCreateDto));
    dispatch(fetchMovies());
  };

const updateMovieRequest = () => ({
  type: actionTypes.UPDATE_MOVIE_REQUEST,
});

const updateMovieSuccess = (editedMovie: Movie) => {
  toast.success('Movie successfully updated');
  return {
    type: actionTypes.UPDATE_MOVIE_SUCCESS,
    selectedMovie: editedMovie,
  };
};

const updateMovieFail = (error: Error) => {
  toast.error(error.detail);
  return {
    type: actionTypes.UPDATE_MOVIE_FAIL,
    error: error,
  };
};

const editMovie = (movieId: string, movieUpdateDto: MovieUpdateDto) => (dispatch: AppDispatch) => {
  dispatch(updateMovieRequest());
  return axios
    .put(`/movies/${movieId}`, movieUpdateDto)
    .then((response) => dispatch(updateMovieSuccess(response.data)))
    .catch((error) => dispatch(updateMovieFail(error.response.data)));
};

export const updateMovie =
  (movieId: string, movieUpdateDto: MovieUpdateDto) => async (dispatch: AppDispatch) => {
    await dispatch(editMovie(movieId, movieUpdateDto));
    dispatch(fetchMovie(movieId));
  };

const deleteMovieRequest = () => ({
  type: actionTypes.DELETE_MOVIE_REQUEST,
});

const deleteMovieSuccess = () => {
  toast.success('Movie successfully deleted');
  return {
    type: actionTypes.DELETE_MOVIE_SUCCESS,
  };
};

const deleteMovieFail = (error: Error) => {
  toast.success('Something went wrong');
  return {
    type: actionTypes.DELETE_MOVIE_FAIL,
    error: error,
  };
};

const removeMovie = (movieId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteMovieRequest());
  return axios
    .delete(`/movies/${movieId}`)
    .then(() => dispatch(deleteMovieSuccess()))
    .catch((error) => dispatch(deleteMovieFail(error)));
};

export const deleteMovie = (movieId: string) => async (dispatch: AppDispatch) => {
  await dispatch(removeMovie(movieId));
  dispatch(fetchMovies());
};

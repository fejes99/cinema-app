import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { fetchMovies } from '../state/movieActions';

import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';
import { MovieFilterName, MovieFilterValue, MovieFilters } from '../types/MovieFilters';

import { defaultMovieFilters, movieSearchFilter } from '../helpers/movieFilters';

import MovieFilter from '../components/MovieFilter/MovieFilter';
import MovieList from '../components/MovieList/MovieList';
import Loader from 'common/components/UI/Loader/Loader';
import Button from 'common/components/UI/Button/Button';
import { useMovieRedirect } from '../hooks/movieRedirects';
import { User } from 'features/auth/types/User';
import { isAdmin } from 'features/auth/helpers/isAdmin';
import { ticketInit } from 'features/tickets/state/ticketActions';

interface Props {
  user: User | null;
  movies: Movie[];
  loading: boolean;
  error: Error;
  onFetchMovies: () => void;
  onBuyTicket: (movie: Movie) => void;
}

const MovieListContainer: React.FC<Props> = ({
  user,
  movies,
  loading,
  error,
  onFetchMovies,
  onBuyTicket,
}) => {
  const [filters, setFilters] = useState<MovieFilters>(defaultMovieFilters);

  const { redirectToMovieCreate } = useMovieRedirect();

  useEffect(() => onFetchMovies(), [onFetchMovies]);

  useEffect(() => {
    if (movies.length > 0 && loading === false) {
      const minDuration = Math.min(...movies.map((movie) => movie.duration));
      const maxDuration = Math.max(...movies.map((movie) => movie.duration));
      const minYear = Math.min(...movies.map((movie) => movie.year));
      const maxYear = Math.max(...movies.map((movie) => movie.year));

      setFilters((prevFilters) => ({
        ...prevFilters,
        minDuration: minDuration,
        minDurationFixed: minDuration,
        maxDuration: maxDuration,
        maxDurationFixed: maxDuration,
        minYear: minYear,
        minYearFixed: minYear,
        maxYear: maxYear,
        maxYearFixed: maxYear,
      }));
    }
  }, [loading, movies]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  const distributors = [...new Set(movies.map((movie) => movie.distributor))];
  const countries = [...new Set(movies.map((movie) => movie.country))];

  const handleFiltersChange = (movieFilterName: MovieFilterName, value: MovieFilterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [movieFilterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: defaultMovieFilters.query,
      country: defaultMovieFilters.country,
      distributor: defaultMovieFilters.distributor,
      minDuration: prevFilters.minDurationFixed,
      maxDuration: prevFilters.maxDurationFixed,
    }));
  };

  const addButton =
    user && isAdmin(user) ? (
      <Button size='large' type='primary' onClick={redirectToMovieCreate}>
        Add Movie
      </Button>
    ) : null;

  const filteredMovies = movieSearchFilter(movies, filters);

  return (
    <>
      <MovieFilter
        countries={countries}
        distributors={distributors}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      {addButton}
      <MovieList movies={filteredMovies} buyTicket={onBuyTicket} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  movies: state.movies.movies,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovies: () => dispatch(fetchMovies()),
  onBuyTicket: (movie: Movie) => dispatch(ticketInit(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);

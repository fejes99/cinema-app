import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import { AppDispatch, StoreState } from 'store/store';
import { fetchMovies } from '../state/movieActions';

import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';
import { User } from 'features/auth/types/User';
import { MovieFilterName, MovieFilterValue, MovieFilters } from '../types/MovieFilters';

import { isAdmin } from 'features/auth/helpers/isAdmin';
import { ticketInit } from 'features/tickets/state/ticketActions';

import { useMovieRedirect } from '../hooks/movieRedirects';
import { useAuthRedirect } from 'features/auth/hooks/authRedirects';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import { defaultMovieFilters, movieSearchFilter } from '../helpers/movieFilters';

import Loader from 'common/components/UI/Loader/Loader';
import Button from 'common/components/UI/Button/Button';
import MovieList from '../components/MovieList/MovieList';
import MovieFilter from '../components/MovieFilter/MovieFilter';
import { sort } from 'common/helpers/sort';

interface Props {
  user: User | null;
  movies: Movie[];
  loading: boolean;
  error: Error | null;
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

  const { redirectToLogin } = useAuthRedirect();
  const { redirectToMovieCreate } = useMovieRedirect();
  const { redirectToMovieDetails } = useMovieRedirect();
  const { redirectToTicketCreate } = useTicketRedirect();

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
  if (error) return <div>{error.detail}</div>;

  const distributors: string[] = sort([...new Set(movies.map((movie) => movie.distributor))]);
  const countries: string[] = sort([...new Set(movies.map((movie) => movie.country))]);

  const handleFiltersChange = (movieFilterName: MovieFilterName, value: MovieFilterValue): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [movieFilterName]: value,
    }));
  };

  const resetFilters = (): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: defaultMovieFilters.query,
      country: defaultMovieFilters.country,
      distributor: defaultMovieFilters.distributor,
      minDuration: prevFilters.minDurationFixed,
      maxDuration: prevFilters.maxDurationFixed,
    }));
  };

  const handleBuyTicketClick = (movie: Movie): void =>
    !user ? redirectToLogin() : (onBuyTicket(movie), redirectToTicketCreate());

  const handleDetailsClick = (movieId: string): void => redirectToMovieDetails(movieId);

  const addButton: JSX.Element | null =
    user && isAdmin(user) ? (
      <Button size='large' type='primary' onClick={redirectToMovieCreate}>
        Add Movie
        <div className='icon'>
          <AddIcon fontSize='large' />
        </div>
      </Button>
    ) : null;

  const filteredMovies: Movie[] = movieSearchFilter(movies, filters);

  return (
    <>
      <div className='page-header'>Movies</div>
      <MovieFilter
        countries={countries}
        distributors={distributors}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      {addButton}
      <MovieList
        movies={filteredMovies}
        onBuyTicket={handleBuyTicketClick}
        onDetails={handleDetailsClick}
      />
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

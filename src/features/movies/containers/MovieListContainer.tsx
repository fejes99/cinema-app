import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import MovieFilter from '../components/MovieFilter/MovieFilter';
import MovieList from '../components/MovieList/MovieList';
import { fetchMovies } from '../state/movieActions';
import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';
import Loader from 'common/components/UI/Loader/Loader';
import { movieSearchFilter, Filters } from '../helpers/movieSearchFilter';

interface Props {
  movies: Movie[];
  loading: boolean;
  error: Error | null | boolean;
  onFetchMovies: () => void;
}

const MovieListContainer: React.FC<Props> = ({ movies, loading, error, onFetchMovies }) => {
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    onFetchMovies();
  }, [onFetchMovies]);

  const distributors = [...new Set(movies.map((movie) => movie.distributor))];
  const countries = [...new Set(movies.map((movie) => movie.country))];
  const minDuration = Math.min(...movies.map((movie) => movie.duration));
  const maxDuration = Math.max(...movies.map((movie) => movie.duration));
  const minYear = Math.min(...movies.map((movie) => movie.year));
  const maxYear = Math.max(...movies.map((movie) => movie.year));

  if (loading) return <Loader />;

  const handleFiltersChange = (newFilters: Filters) => setFilters(newFilters);
  const filteredMovies = movieSearchFilter(movies, filters);

  return (
    <div>
      <MovieFilter
        countries={countries}
        distributors={distributors}
        minDuration={minDuration}
        maxDuration={maxDuration}
        minYear={minYear}
        maxYear={maxYear}
        onFiltersChange={handleFiltersChange}
      />
      <MovieList loading={loading} movies={filteredMovies} error={error} />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  movies: state.movies.movies,
  loading: state.movies.loading,
  error: state.movies.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovies: () => dispatch(fetchMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);

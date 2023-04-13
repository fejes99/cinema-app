import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import MovieFilter from '../components/MovieFilter/MovieFilter';
import MovieList from '../components/MovieList/MovieList';
import { fetchMovies } from '../state/movieActions';
import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';
import Loader from 'common/components/UI/Loader/Loader';
import { defaultMovieFilters, movieSearchFilter } from '../helpers/movieSearchFilter';
import { FilterName, FilterValue, MovieFilters } from '../types/MovieFilters';

interface Props {
  movies: Movie[];
  loading: boolean;
  error: Error;
  onFetchMovies: () => void;
}

const MovieListContainer: React.FC<Props> = ({ movies, loading, error, onFetchMovies }) => {
  const [filters, setFilters] = useState<MovieFilters>(defaultMovieFilters);

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

  const handleFiltersChange = (filterName: FilterName, value: FilterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
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
      <MovieList movies={filteredMovies} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  movies: state.movies.movies,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovies: () => dispatch(fetchMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);

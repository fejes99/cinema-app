import { Movie } from '../types/Movie';
import { MovieFilters } from '../types/MovieFilters';

export const defaultMovieFilters: MovieFilters = {
  query: '',
  country: '',
  distributor: '',
  minDuration: 0,
  maxDuration: 1000,
  minDurationFixed: 0,
  maxDurationFixed: 1000,
  minYear: 1900,
  minYearFixed: 1900,
  maxYear: 2100,
  maxYearFixed: 2100,
};

export const movieSearchFilter = (movies: Movie[], filters: MovieFilters): Movie[] => {
  return movies.filter((movie) => {
    return (
      (filters.query === '' || movie.name.toLowerCase().includes(filters.query.toLowerCase())) &&
      (filters.minDuration === 0 || movie.duration >= filters.minDuration) &&
      (filters.maxDuration === 1000 || movie.duration <= filters.maxDuration) &&
      (filters.minYear === 1900 || movie.year >= filters.minYear) &&
      (filters.maxYear === 2100 || movie.year <= filters.maxYear) &&
      (filters.country === '' || movie.country === filters.country) &&
      (filters.distributor === '' || movie.distributor === filters.distributor)
    );
  });
};

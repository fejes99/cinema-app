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
      (filters.query === defaultMovieFilters.query ||
        movie.name.toLowerCase().includes(filters.query.toLowerCase())) &&
      (filters.country === defaultMovieFilters.country || movie.country === filters.country) &&
      (filters.distributor === defaultMovieFilters.distributor ||
        movie.distributor === filters.distributor) &&
      (filters.minDuration === defaultMovieFilters.minDurationFixed ||
        movie.duration >= filters.minDuration) &&
      (filters.maxDuration === defaultMovieFilters.maxDurationFixed ||
        movie.duration <= filters.maxDuration) &&
      (filters.minYear === defaultMovieFilters.minYearFixed || movie.year >= filters.minYear) &&
      (filters.maxYear === defaultMovieFilters.maxYearFixed || movie.year <= filters.maxYear)
    );
  });
};

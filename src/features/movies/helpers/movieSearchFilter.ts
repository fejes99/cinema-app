import { Movie } from '../types/Movie';

export interface Filters {
  query?: string;
  minDuration?: number;
  maxDuration?: number;
  minYear?: number;
  maxYear?: number;
  country?: string;
  distributor?: string;
  // genre: string;
}

export const movieSearchFilter = (movies: Movie[], filters: Filters): Movie[] => {
  console.log('🚀 ~ file: movieSearchFilter.ts:15 ~ movieSearchFilter ~ filters:', filters);
  let filteredMovies = [...movies];

  if (filters.query)
    filteredMovies = filteredMovies.filter((movie) =>
      movie.name.toLowerCase().includes(filters.query!.toLowerCase())
    );

  if (filters.minDuration)
    filteredMovies = filteredMovies.filter((movie) => movie.duration >= filters.minDuration!);

  if (filters.maxDuration)
    filteredMovies = filteredMovies.filter((movie) => movie.duration <= filters.maxDuration!);

  if (filters.minYear)
    filteredMovies = filteredMovies.filter((movie) => movie.year >= filters.minYear!);

  if (filters.maxYear)
    filteredMovies = filteredMovies.filter((movie) => movie.year <= filters.maxYear!);

  if (filters.country)
    filteredMovies = filteredMovies.filter((movie) => movie.country === filters.country);

  if (filters.distributor)
    filteredMovies = filteredMovies.filter((movie) => movie.distributor === filters.distributor);

  // if (filters.genre)
  //   filteredMovies = filteredMovies.filter((movie) => movie.genre === filters.genre
  //   );

  return filteredMovies;
};

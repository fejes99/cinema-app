export interface MovieFilters {
  query: string;
  minDuration: number;
  maxDuration: number;
  minYear: number;
  maxYear: number;
  country: string;
  distributor: string;
  // genre: string;
}

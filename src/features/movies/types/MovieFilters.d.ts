export interface MovieFilters {
  query: string;
  country: string;
  distributor: string;
  minDuration: number;
  minDurationFixed: number;
  maxDuration: number;
  maxDurationFixed: number;
  minYear: number;
  minYearFixed: number;
  maxYear: number;
  maxYearFixed: number;
  // genre: string;
}

export enum FilterName {
  Query = 'query',
  Distributor = 'distributor',
  Country = 'country',
  MinDuration = 'minDuration',
  MaxDuration = 'maxDuration',
  MinYear = 'minYear',
  MaxYear = 'maxYear',
  // Gendre = 'gendre',
}

export type FilterValue = string | number;

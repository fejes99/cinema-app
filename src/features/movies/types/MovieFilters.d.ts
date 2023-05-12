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
  [key: string]: string | number;
}

export enum MovieFilterName {
  Query = 'query',
  Distributor = 'distributor',
  Country = 'country',
  MinDuration = 'minDuration',
  MaxDuration = 'maxDuration',
  MinYear = 'minYear',
  MaxYear = 'maxYear',
  // Genre = 'genre',
}

export type MovieFilterValue = string | number;

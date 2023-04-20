export interface ProjectionFilters {
  movie: string;
  theater: string;
  projectionType: string;
  // minDate: Date;
  // maxDate: Date;
  // minTime: number;
  // maxTime: number;
  minPrice: number;
  minPriceFixed: number;
  maxPrice: number;
  maxPriceFixed: number;
}

export enum ProjectionFilterName {
  Movie = 'movie',
  Theater = 'theater',
  ProjectionType = 'projectionType',
  // MinTime = 'minTime',
  // MaxTime = 'maxTime',
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice',
}

export type ProjectionFilterValue = string | number;

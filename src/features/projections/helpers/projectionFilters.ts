import { Projection } from '../types/Projection';
import { ProjectionFilters } from '../types/ProjectionFilters';

export const defaultProjectionFilters: ProjectionFilters = {
  movie: '',
  theater: '',
  projectionType: '',
  minPrice: 0,
  minPriceFixed: 0,
  maxPrice: 1000,
  maxPriceFixed: 1000,
};

export const projectionSearchFilter = (
  projections: Projection[],
  filters: ProjectionFilters
): Projection[] => {
  return projections.filter((projection) => {
    return (
      (filters.movie === defaultProjectionFilters.movie ||
        projection.movie?.name === filters.movie) &&
      (filters.theater === defaultProjectionFilters.theater ||
        projection.theater.name === filters.theater) &&
      (filters.projectionType === defaultProjectionFilters.projectionType ||
        projection.projectionType.name === filters.projectionType) &&
      (filters.minPrice === defaultProjectionFilters.minPriceFixed ||
        projection.price >= filters.minPrice) &&
      (filters.maxPrice === defaultProjectionFilters.maxPriceFixed ||
        projection.price <= filters.maxPrice)
    );
  });
};

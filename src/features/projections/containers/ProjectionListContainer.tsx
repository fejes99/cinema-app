import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppDispatch, StoreState } from 'store/store';

import { fetchProjections } from '../state/projectionActions';
import { Projection } from '../types/Projection';

import Loader from 'common/components/UI/Loader/Loader';
import ProjectionList from '../components/ProjectionList/ProjectionList';
import ProjectionFilter from '../components/ProjectionFilter/ProjectionFilter';
import {
  ProjectionFilterName,
  ProjectionFilterValue,
  ProjectionFilters,
} from '../types/ProjectionFilters';
import { defaultProjectionFilters, projectionSearchFilter } from '../helpers/projectionFilters';
import Button from 'common/components/UI/Button/Button';
import { useProjectionRedirect } from '../helpers/projectionRedirects';

interface Props {
  projections: Projection[];
  loading: boolean;
  error: Error;
  onFetchProjections: () => void;
}

const ProjectionListContainer: React.FC<Props> = ({
  projections,
  loading,
  error,
  onFetchProjections,
}) => {
  const [filters, setFilters] = useState<ProjectionFilters>(defaultProjectionFilters);
  const { redirectToProjectionCreate } = useProjectionRedirect();

  useEffect(() => onFetchProjections(), [onFetchProjections]);

  useEffect(() => {
    if (projections.length > 0 && loading === false) {
      const minPrice = Math.min(...projections.map((projection) => projection.price));
      const maxPrice = Math.max(...projections.map((projection) => projection.price));

      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: minPrice,
        maxPrice: maxPrice,
      }));
    }
  }, [loading, projections]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  const movies = [...new Set(projections.map((projection) => projection.movie!.name))];
  const theaters = [...new Set(projections.map((projection) => projection.theater.name))];
  const projectionTypes = [
    ...new Set(projections.map((projection) => projection.projectionType.name)),
  ];

  const handleFiltersChange = (
    projectionFilterName: ProjectionFilterName,
    value: ProjectionFilterValue
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [projectionFilterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      movie: defaultProjectionFilters.movie,
      theater: defaultProjectionFilters.theater,
      projectionType: defaultProjectionFilters.projectionType,
      minPrice: defaultProjectionFilters.minPrice,
      maxPrice: defaultProjectionFilters.maxPrice,
    }));
  };

  const filteredProjections = projectionSearchFilter(projections, filters);

  return (
    <>
      <ProjectionFilter
        movies={movies}
        theaters={theaters}
        projectionTypes={projectionTypes}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      <Button size='large' type='primary' onClick={redirectToProjectionCreate}>
        Add Projection
      </Button>
      <ProjectionList projections={filteredProjections} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  projections: state.projections.projections,
  loading: state.projections.loading,
  error: state.projections.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjections: () => dispatch(fetchProjections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionListContainer);

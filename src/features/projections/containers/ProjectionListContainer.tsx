import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppDispatch, StoreState } from 'store/store';

import { deleteProjection, fetchProjection, fetchProjections } from '../state/projectionActions';
import { Projection } from '../types/Projection';

import Loader from 'common/components/UI/Loader/Loader';
import ProjectionFilter from '../components/ProjectionFilter/ProjectionFilter';
import {
  ProjectionFilterName,
  ProjectionFilterValue,
  ProjectionFilters,
} from '../types/ProjectionFilters';
import { defaultProjectionFilters, projectionSearchFilter } from '../helpers/projectionFilters';
import Button from 'common/components/UI/Button/Button';
import { useProjectionRedirect } from '../hooks/useProjectionRedirect';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import ProjectionsTable from '../components/ProjectionsTable/ProjectionsTable';

interface Props {
  projections: Projection[];
  loading: boolean;
  error: Error;
  onFetchProjection: (id: string) => void;
  onFetchProjections: () => void;
  onDeleteProjection: (id: string) => Promise<void>;
}

const ProjectionListContainer: React.FC<Props> = ({
  projections,
  loading,
  error,
  onFetchProjection,
  onFetchProjections,
  onDeleteProjection,
}) => {
  const [projectionToDeleteId, setprojectionToDeleteId] = useState<string>('');
  const [filters, setFilters] = useState<ProjectionFilters>(defaultProjectionFilters);
  const {
    redirectToProjectionList,
    redirectToProjectionDetails,
    redirectToProjectionCreate,
    redirectToProjectionUpdate,
  } = useProjectionRedirect();

  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  useEffect(() => onFetchProjections(), [onFetchProjections]);

  useEffect(() => {
    if (projections.length > 0 && loading === false) {
      const minPrice = Math.min(...projections.map((projection) => projection.price));
      const maxPrice = Math.max(...projections.map((projection) => projection.price));

      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minPriceFixed: minPrice,
        maxPriceFixed: maxPrice,
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

  const handleEditClick = (id: string) => {
    onFetchProjection(id);
    redirectToProjectionUpdate(id);
  };

  const handleDeleteClick = (id: string) => {
    setprojectionToDeleteId(id);
    openDeleteModal();
  };

  const deleteModalConfirmation = async () => {
    await onDeleteProjection(projectionToDeleteId);
    closeAllModals();
    redirectToProjectionList();
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
      <ProjectionsTable
        projections={filteredProjections}
        redirect={redirectToProjectionDetails}
        onEdit={(id: string) => handleEditClick(id)}
        onDelete={(id: string) => handleDeleteClick(id)}
      />
      <DeleteModal
        title='projection'
        show={showDeleteModal}
        onDelete={deleteModalConfirmation}
        onClose={closeAllModals}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  projections: state.projections.projections,
  loading: state.projections.loading,
  error: state.projections.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjection: (id: string) => dispatch(fetchProjection(id)),
  onFetchProjections: () => dispatch(fetchProjections()),
  onDeleteProjection: async (id: string) => await dispatch(deleteProjection(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionListContainer);

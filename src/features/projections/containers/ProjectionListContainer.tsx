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
import { useProjectionRedirect } from '../hooks/projectionRedirects';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import ProjectionsTable from '../components/ProjectionsTable/ProjectionsTable';
import { User } from 'features/auth/types/User';
import { isAdmin } from '../../auth/helpers/isAdmin';

interface Props {
  user: User | null;
  projections: Projection[];
  loading: boolean;
  error: Error;
  onFetchProjection: (id: string) => void;
  onFetchProjections: () => void;
  onDeleteProjection: (id: string) => Promise<void>;
}

const ProjectionListContainer: React.FC<Props> = ({
  user,
  projections,
  loading,
  error,
  onFetchProjection,
  onFetchProjections,
  onDeleteProjection,
}) => {
  const [projectionToDeleteId, setProjectionToDeleteId] = useState<string>('');
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
      minPrice: prevFilters.minPriceFixed,
      maxPrice: prevFilters.maxPriceFixed,
    }));
  };

  const handleEditClick = (id: string) => {
    onFetchProjection(id);
    redirectToProjectionUpdate(id);
  };

  const handleDeleteClick = (id: string) => {
    setProjectionToDeleteId(id);
    openDeleteModal();
  };

  const deleteModalConfirmation = async () => {
    await onDeleteProjection(projectionToDeleteId);
    closeAllModals();
    redirectToProjectionList();
  };

  const addButton =
    user && isAdmin(user) ? (
      <Button size='large' type='primary' onClick={redirectToProjectionCreate}>
        Add Projection
      </Button>
    ) : null;

  const filteredProjections = projectionSearchFilter(projections, filters);

  return (
    <>
      <div className='page-header'>Projections</div>
      <ProjectionFilter
        movies={movies}
        theaters={theaters}
        projectionTypes={projectionTypes}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      {addButton}
      <ProjectionsTable
        isAdmin={user! && isAdmin(user)}
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
  user: state.auth.loggedUser,
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

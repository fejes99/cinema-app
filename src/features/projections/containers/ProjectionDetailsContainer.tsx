import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { StoreState, AppDispatch } from 'store/store';
import { deleteProjection, fetchProjection } from '../state/projectionActions';

import { User } from 'features/auth/types/User';
import { Projection } from '../types/Projection';
import { ticketProjection } from 'features/tickets/state/ticketActions';

import useModal from 'common/hooks/useModal';

import { useAuthRedirect } from 'features/auth/hooks/authRedirects';
import { useUserRedirect } from 'features/auth/hooks/userRedirects';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import { useProjectionRedirect } from '../hooks/projectionRedirects';

import { isAdmin } from 'features/auth/helpers/isAdmin';

import Loader from 'common/components/UI/Loader/Loader';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import TicketsTable from '../components/ProjectionDetails/TicketsTable/TicketsTable';
import ProjectionDetails from '../components/ProjectionDetails/ProjectionDetails';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { Error } from 'common/types/Error';

interface Props {
  user: User | null;
  selectedProjection: Projection | null;
  loading: boolean;
  error: Error | null;
  onFetchProjection: (id: string) => void;
  onDeleteProjection: (id: string) => void;
  onTicketProjection: (projection: Projection) => void;
}

const ProjectionDetailsContainer: React.FC<Props> = ({
  user,
  selectedProjection,
  loading,
  error,
  onFetchProjection,
  onDeleteProjection,
  onTicketProjection,
}) => {
  const { id } = useParams();
  const { redirectToProjectionList, redirectToProjectionUpdate } = useProjectionRedirect();
  const { redirectToMovieDetails } = useMovieRedirect();
  const { redirectToTicketDetails, redirectToTicketCreate } = useTicketRedirect();
  const { redirectToUserDetails } = useUserRedirect();
  const { redirectToLogin } = useAuthRedirect();
  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  useEffect(() => {
    if (id) onFetchProjection(id);
  }, [id, onFetchProjection]);

  if (loading) return <Loader />;
  if (selectedProjection === null) return <div>No projection</div>;
  if (error) return <div>{error.detail}</div>;

  const handleEditClick = (): void => redirectToProjectionUpdate(selectedProjection.id);

  const handleDeleteClick = (): void => openDeleteModal();

  const handleBuyTicketClick = (): void =>
    !user ? redirectToLogin() : (onTicketProjection(selectedProjection), redirectToTicketCreate());

  const handleTicketRedirect = (ticketId: string): void => redirectToTicketDetails(ticketId);

  const handleUserRedirect = (userId: string): void => redirectToUserDetails(userId);

  const deleteModalConfirmation = (): void => {
    onDeleteProjection(selectedProjection.id);
    closeAllModals();
    redirectToProjectionList();
  };

  const ticketsTable: JSX.Element | null =
    user && isAdmin(user) && selectedProjection.tickets && selectedProjection.tickets.length > 0 ? (
      <TicketsTable
        tickets={selectedProjection.tickets}
        onTicketClick={(ticketId: string) => handleTicketRedirect(ticketId)}
        onUserClick={(userId: string) => handleUserRedirect(userId)}
      />
    ) : null;

  const adminButtons: JSX.Element | null =
    user && isAdmin(user) ? (
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
    ) : null;

  return (
    <>
      <div className='page-header'>Projection Details</div>
      {adminButtons}
      {selectedProjection && (
        <ProjectionDetails
          projection={selectedProjection}
          movieDetails={redirectToMovieDetails}
          onBuyTicket={handleBuyTicketClick}
        />
      )}
      {ticketsTable}
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
  selectedProjection: state.projections.selectedProjection,
  loading: state.projections.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjection: (id: string) => dispatch(fetchProjection(id)),
  onDeleteProjection: (id: string) => dispatch(deleteProjection(id)),
  onTicketProjection: (projection: Projection) => dispatch(ticketProjection(projection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionDetailsContainer);

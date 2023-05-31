import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState, AppDispatch } from 'store/store';
import { deleteProjection, fetchProjection } from '../state/projectionActions';
import { Projection } from '../types/Projection';
import { useParams } from 'react-router';
import Loader from 'common/components/UI/Loader/Loader';
import ProjectionDetails from '../components/ProjectionDetails/ProjectionDetails';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { useProjectionRedirect } from '../hooks/projectionRedirects';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import { isAdmin } from 'features/auth/helpers/isAdmin';
import TicketsTable from '../components/ProjectionDetails/TicketsTable/TicketsTable';
import { User } from 'features/auth/types/User';
import { useUserRedirect } from 'features/auth/hooks/userRedirects';
import { ticketProjection } from 'features/tickets/state/ticketActions';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';

interface Props {
  user: User | null;
  selectedProjection: Projection | null;
  loading: boolean;
  error: Error;
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
  console.log(
    '🚀 ~ file: ProjectionDetailsContainer.tsx:40 ~ selectedProjection:',
    selectedProjection
  );
  const { id } = useParams();
  const { redirectToProjectionList, redirectToProjectionUpdate } = useProjectionRedirect();
  const { redirectToMovieDetails } = useMovieRedirect();
  const { redirectToTicketDetails, redirectToTicketCreate } = useTicketRedirect();
  const { redirectToUserDetails } = useUserRedirect();
  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  useEffect(() => {
    if (id) onFetchProjection(id);
  }, [id, onFetchProjection]);

  if (loading) return <Loader />;
  if (selectedProjection === null) return <div>No projection</div>;
  if (error) return <div>{error.message}</div>;

  const handleEditClick = () => redirectToProjectionUpdate(selectedProjection.id);

  const handleDeleteClick = () => openDeleteModal();

  const handleBuyTicketClick = () => {
    onTicketProjection(selectedProjection);
    redirectToTicketCreate();
  };

  const handleTicketRedirect = (ticketId: string) => redirectToTicketDetails(ticketId);

  const handleUserRedirect = (userId: string) => redirectToUserDetails(userId);

  const deleteModalConfirmation = () => {
    onDeleteProjection(selectedProjection.id);
    closeAllModals();
    redirectToProjectionList();
  };

  const ticketsTable =
    user && isAdmin(user) && selectedProjection.tickets && selectedProjection.tickets.length > 0 ? (
      <TicketsTable
        tickets={selectedProjection.tickets}
        onTicketClick={(ticketId: string) => handleTicketRedirect(ticketId)}
        onUserClick={(userId: string) => handleUserRedirect(userId)}
      />
    ) : null;

  const adminButtons =
    user && isAdmin(user) ? (
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
    ) : null;

  return (
    <>
      {adminButtons}
      <ProjectionDetails
        projection={selectedProjection}
        movieDetails={redirectToMovieDetails}
        onBuyTicket={handleBuyTicketClick}
      />
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

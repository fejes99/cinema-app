import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppDispatch, StoreState } from 'store/store';

import { User } from '../types/User';
import { Error } from 'common/types/Error';
import { Ticket } from 'features/tickets/types/Ticket';

import { logout } from '../state/authActions';
import { deleteTicket, fetchUserTickets } from 'features/tickets/state/ticketActions';

import { useAuthRedirect } from '../hooks/authRedirects';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';

import Loader from 'common/components/UI/Loader/Loader';
import UserDetails from '../components/UserDetails/UserDetails';
import UserTicketsTable from '../components/UserTicketsTable/UserTicketsTable';
import UserControlButtonGroup from '../components/UserControlButtonGroup/UserControlButtonGroup';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import useModal from 'common/hooks/useModal';

interface Props {
  user: User | null;
  userTickets: Ticket[] | null;
  loading: boolean;
  error: Error | null;
  onFetchUserTickets: (userId: string) => void;
  onTicketDelete: (ticketId: string, userId: string) => void;
  onLogout: () => void;
}

const ProfileContainer: React.FC<Props> = ({
  user,
  userTickets,
  loading,
  error,
  onFetchUserTickets,
  onTicketDelete,
  onLogout,
}) => {
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | undefined>();

  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  const { redirectToProjectionList, redirectToProjectionDetails } = useProjectionRedirect();
  const { redirectToTicketDetails } = useTicketRedirect();
  const { redirectToUserUpdate } = useAuthRedirect();

  useEffect(() => {
    if (user) {
      onFetchUserTickets(user.id);
    }
  }, [onFetchUserTickets, user]);

  if (loading) return <Loader />;
  if (user === null) return <div>No user</div>;
  if (error) return <div>{error.detail}</div>;

  const handleEditProfileClick = (): void => redirectToUserUpdate(user.id);

  const handleTicketDeleteClick = (ticketId: string): void => {
    const ticketToDelete = userTickets!.find((ticket) => ticket.id === ticketId);
    setTicketToDelete(ticketToDelete);
    openDeleteModal();
  };

  const deleteModalConfirmation = (): void => {
    onTicketDelete(ticketToDelete!.id, user.id);
    onFetchUserTickets(user.id);
    closeAllModals();
  };

  const handleLogoutClick = (): void => {
    onLogout();
    redirectToProjectionList();
  };

  return (
    <>
      <UserControlButtonGroup onEdit={handleEditProfileClick} onLogout={handleLogoutClick} />
      <div className='page-header'>Profile</div>
      <UserDetails user={user} />
      {userTickets?.length! > 0 && (
        <UserTicketsTable
          tickets={userTickets!}
          ticketDetails={redirectToTicketDetails}
          projectionDetails={redirectToProjectionDetails}
          onDelete={handleTicketDeleteClick}
        />
      )}
      <DeleteModal
        title={'Ticket'}
        show={showDeleteModal}
        onDelete={deleteModalConfirmation}
        onClose={closeAllModals}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  userTickets: state.tickets.userTickets,
  loading: state.auth.loading || state.tickets.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchUserTickets: (userId: string) => dispatch(fetchUserTickets(userId)),
  onTicketDelete: (ticketId: string, userId: string) => dispatch(deleteTicket(ticketId, userId)),
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

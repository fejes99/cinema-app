import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { logout } from '../state/authActions';
import { User } from '../types/User';
import Loader from 'common/components/UI/Loader/Loader';
import UserDetails from '../components/UserDetails/UserDetails';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';
import UserTicketsTable from '../components/UserTicketsTable/UserTicketsTable';
import { deleteTicket, fetchUserTickets } from 'features/tickets/state/ticketActions';
import { Ticket } from 'features/tickets/types/Ticket';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import UserControlButtonGroup from '../components/UserControlButtonGroup/UserControlButtonGroup';
import { useAuthRedirect } from '../hooks/authRedirects';

interface Props {
  user: User | null;
  userTickets: Ticket[] | null;
  loading: boolean;
  error: Error;
  onFetchUserTickets: (userId: string) => void;
  onTicketDelete: (ticketId: string) => void;
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
  const { redirectToProjectionList, redirectToProjectionDetails } = useProjectionRedirect();
  const { redirectToTicketDetails } = useTicketRedirect();
  const { redirectToUserUpdate } = useAuthRedirect();

  useEffect(() => onFetchUserTickets(user!.id), [onFetchUserTickets, user]);

  if (loading) return <Loader />;
  if (user === null) return <div>No user</div>;
  if (error) return <div>{error.message}</div>;

  const handleEditProfileClick = () => redirectToUserUpdate(user.id);

  const handleTicketDeleteClick = (ticketId: string) => onTicketDelete(ticketId);

  const handleLogoutClick = () => {
    onLogout();
    redirectToProjectionList();
  };

  return (
    <>
      <UserControlButtonGroup onEdit={handleEditProfileClick} onLogout={handleLogoutClick} />
      <div className='page-header'>Profile</div>
      <UserDetails user={user} />
      {userTickets && (
        <UserTicketsTable
          tickets={userTickets}
          ticketDetails={redirectToTicketDetails}
          projectionDetails={redirectToProjectionDetails}
          onDelete={handleTicketDeleteClick}
        />
      )}
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
  onTicketDelete: (ticketId: string) => dispatch(deleteTicket(ticketId)),
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

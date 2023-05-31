import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { logout } from '../state/authActions';
import { User } from '../types/User';
import Loader from 'common/components/UI/Loader/Loader';
import UserDetails from '../components/UserDetails/UserDetails';
import Button from 'common/components/UI/Button/Button';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';
import UserTicketsTable from '../components/UserTicketsTable/UserTicketsTable';
import { fetchUserTickets } from 'features/tickets/state/ticketActions';
import { Ticket } from 'features/tickets/types/Ticket';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';

interface Props {
  user: User | null;
  userTickets: Ticket[] | null;
  loading: boolean;
  error: Error;
  onFetchUserTickets: (userId: string) => void;
  onLogout: () => void;
}

const ProfileContainer: React.FC<Props> = ({
  user,
  userTickets,
  loading,
  error,
  onFetchUserTickets,
  onLogout,
}) => {
  const { redirectToProjectionList, redirectToProjectionDetails } = useProjectionRedirect();
  const { redirectToTicketDetails } = useTicketRedirect();

  useEffect(() => onFetchUserTickets(user!.id), [onFetchUserTickets, user]);

  if (loading) return <Loader />;
  if (user === null) return <div>No user</div>;
  if (error) return <div>{error.message}</div>;

  const handleLogoutClick = () => {
    onLogout();
    redirectToProjectionList();
  };

  return (
    <>
      <UserDetails user={user} />
      <Button type='primary' size='large' onClick={handleLogoutClick}>
        Logout
      </Button>
      {userTickets && (
        <UserTicketsTable
          tickets={userTickets}
          ticketDetails={redirectToTicketDetails}
          projectionDetails={redirectToProjectionDetails}
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
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

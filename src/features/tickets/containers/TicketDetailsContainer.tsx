import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { AppDispatch, StoreState } from 'store/store';
import { fetchTicket } from '../state/ticketActions';

import { Error } from 'common/types/Error';
import { Ticket } from '../types/Ticket';

import Loader from 'common/components/UI/Loader/Loader';
import TicketDetails from '../components/TicketDetails/TicketDetails';

interface Props {
  selectedTicket: Ticket | null;
  loading: boolean;
  error: Error;
  onFetchTicket: (id: string) => void;
}

const TicketDetailsContainer: React.FC<Props> = ({
  selectedTicket,
  loading,
  error,
  onFetchTicket,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) onFetchTicket(id);
  }, [id, onFetchTicket]);

  if (loading) return <Loader />;
  if (selectedTicket === null) return <div>No ticket</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className='page-header'>Ticket Details</div>
      <TicketDetails ticket={selectedTicket} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  selectedTicket: state.tickets.selectedTicket,
  loading: state.tickets.loading,
  error: state.tickets.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchTicket: (id: string) => dispatch(fetchTicket(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailsContainer);

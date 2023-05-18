import { Error } from 'common/types/Error';
import { Ticket } from './../types/Ticket.d';

export interface TicketState {
  selectedTicket: Ticket | null;
  loading: boolean;
  error: Error | null;
}

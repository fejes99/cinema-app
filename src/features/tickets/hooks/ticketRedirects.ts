import { useNavigate } from 'react-router';

export const useTicketRedirect = () => {
  const navigate = useNavigate();

  const redirectToTicketDetails = (ticketId: string): void => navigate(`/tickets/${ticketId}`);

  const redirectToTicketCreate = (): void => navigate('/tickets/new');

  return {
    redirectToTicketDetails,
    redirectToTicketCreate,
  };
};

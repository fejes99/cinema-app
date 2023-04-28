import { useNavigate } from 'react-router';

export const useTicketRedirect = () => {
  const navigate = useNavigate();

  const redirectToTicketDetails = (ticketId: string) => navigate(`/tickets/${ticketId}`);

  const redirectToTicketCreate = () => navigate('/tickets/new');

  return {
    redirectToTicketDetails,
    redirectToTicketCreate,
  };
};

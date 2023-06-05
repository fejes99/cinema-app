import { useNavigate } from 'react-router';

export const useUserRedirect = () => {
  const navigate = useNavigate();

  const redirectToUserDetails = (userId: string): void => navigate(`/users/${userId}`);

  return { redirectToUserDetails };
};

import { useNavigate } from 'react-router';

export const useUserRedirect = () => {
  const navigate = useNavigate();

  const redirectToUserDetails = (userId: string) => navigate(`/users/${userId}`);

  return { redirectToUserDetails };
};

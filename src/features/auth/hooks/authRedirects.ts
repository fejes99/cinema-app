import { useNavigate } from 'react-router';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/login');

  const redirectToProfile = () => navigate('/profile');

  const redirectToUserUpdate = (userId: string) => navigate(`/users/${userId}/edit`);

  return { redirectToLogin, redirectToProfile, redirectToUserUpdate };
};

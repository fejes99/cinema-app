import { useNavigate } from 'react-router';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = (): void => navigate('/login');

  const redirectToProfile = (): void => navigate('/profile');

  const redirectToUserUpdate = (userId: string): void => {
    navigate(`/users/${userId}/edit`);
  };

  return { redirectToLogin, redirectToProfile, redirectToUserUpdate };
};

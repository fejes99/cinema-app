import { useNavigate } from 'react-router';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/login');

  return { redirectToLogin };
};

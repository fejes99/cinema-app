import { useNavigate } from 'react-router';

export const useMovieRedirect = () => {
  const navigate = useNavigate();

  const redirectToMovieDetails = (movieId: string) => navigate(`/movies/${movieId}`);

  const redirectToMovieCreate = () => navigate('/movies/create');

  return { redirectToMovieDetails, redirectToMovieCreate };
};

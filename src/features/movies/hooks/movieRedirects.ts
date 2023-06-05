import { useNavigate } from 'react-router';

export const useMovieRedirect = () => {
  const navigate = useNavigate();

  const redirectToMovieList = (): void => navigate('/movies');

  const redirectToMovieDetails = (movieId: string): void => navigate(`/movies/${movieId}`);

  const redirectToMovieCreate = (): void => navigate('/movies/new');

  const redirectToMovieUpdate = (movieId: string): void => navigate(`/movies/${movieId}/edit`);

  return {
    redirectToMovieList,
    redirectToMovieDetails,
    redirectToMovieCreate,
    redirectToMovieUpdate,
  };
};

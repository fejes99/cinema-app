import { useNavigate } from 'react-router';

export const useMovieRedirect = () => {
  const navigate = useNavigate();

  const redirectToMovieList = () => navigate('/movies');

  const redirectToMovieDetails = (movieId: string) => navigate(`/movies/${movieId}`);

  const redirectToMovieCreate = () => navigate('/movies/new');

  const redirectToMovieUpdate = (movieId: string) => navigate(`/movies/${movieId}/edit`);

  return {
    redirectToMovieList,
    redirectToMovieDetails,
    redirectToMovieCreate,
    redirectToMovieUpdate,
  };
};

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Movie } from '../types/Movie';
import { AppDispatch, StoreState } from 'store/store';
import { deleteMovie, fetchMovie } from '../state/movieActions';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import Loader from 'common/components/UI/Loader/Loader';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { extractYoutubeVideoId } from '../helpers/movieGetVideoIdFromTrailer';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { useMovieRedirect } from '../hooks/movieRedirects';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import { User } from 'features/auth/types/User';
import { isAdmin } from 'features/auth/helpers/isAdmin';

interface Props {
  user: User | null;
  selectedMovie: Movie | null;
  loading: boolean;
  error: Error;
  onFetchMovie: (id: string) => void;
  onDeleteMovie: (id: string) => void;
}

const MovieDetailsContainer: React.FC<Props> = ({
  user,
  selectedMovie,
  loading,
  error,
  onFetchMovie,
  onDeleteMovie,
}) => {
  const { id } = useParams();
  const { redirectToMovieList, redirectToMovieUpdate } = useMovieRedirect();
  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  useEffect(() => {
    if (id) onFetchMovie(id);
  }, [id, onFetchMovie]);

  const handleEditClick = () => redirectToMovieUpdate(selectedMovie!.id);

  const handleDeleteClick = () => openDeleteModal();

  const deleteModalConfirmation = () => {
    onDeleteMovie(selectedMovie!.id);
    closeAllModals();
    redirectToMovieList();
  };

  if (loading) return <Loader />;
  if (selectedMovie === null) return <div>No movie</div>;
  if (error) return <div>{error.message}</div>;

  const adminButtons =
    user && isAdmin(user) ? (
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
    ) : null;

  return (
    <>
      {selectedMovie && (
        <>
          <YoutubeEmbed videoId={extractYoutubeVideoId(selectedMovie.trailerUrl!)} />
          {adminButtons}
          <MovieDetails movie={selectedMovie} />
          <DeleteModal
            title={selectedMovie.name}
            show={showDeleteModal}
            onDelete={deleteModalConfirmation}
            onClose={closeAllModals}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  selectedMovie: state.movies.selectedMovie,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovie: (id: string) => dispatch(fetchMovie(id)),
  onDeleteMovie: (id: string) => dispatch(deleteMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsContainer);

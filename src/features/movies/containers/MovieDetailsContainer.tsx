import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { AppDispatch, StoreState } from 'store/store';
import { deleteMovie, fetchMovie } from '../state/movieActions';
import { ticketInit } from 'features/tickets/state/ticketActions';

import { Movie } from '../types/Movie';
import { User } from 'features/auth/types/User';

import { useAuthRedirect } from 'features/auth/hooks/authRedirects';
import { useMovieRedirect } from '../hooks/movieRedirects';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';
import { isAdmin } from 'features/auth/helpers/isAdmin';

import Loader from 'common/components/UI/Loader/Loader';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { Error } from 'common/types/Error';

interface Props {
  user: User | null;
  selectedMovie: Movie | null;
  loading: boolean;
  error: Error | null;
  onFetchMovie: (id: string) => void;
  onDeleteMovie: (id: string) => void;
  onBuyTicket: (movie: Movie) => void;
}

const MovieDetailsContainer: React.FC<Props> = ({
  user,
  selectedMovie,
  loading,
  error,
  onFetchMovie,
  onDeleteMovie,
  onBuyTicket,
}) => {
  const { id } = useParams();
  const { redirectToMovieList, redirectToMovieUpdate } = useMovieRedirect();
  const { redirectToTicketCreate } = useTicketRedirect();
  const { redirectToLogin } = useAuthRedirect();
  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

  useEffect(() => {
    if (id) onFetchMovie(id);
  }, [id, onFetchMovie]);

  const handleEditClick = (): void => redirectToMovieUpdate(selectedMovie!.id);

  const handleDeleteClick = (): void => openDeleteModal();

  const deleteModalConfirmation = (): void => {
    onDeleteMovie(selectedMovie!.id);
    closeAllModals();
    redirectToMovieList();
  };

  if (loading) return <Loader />;
  if (selectedMovie === null) return <div>No movie</div>;
  if (error) return <div>{error.detail}</div>;

  const handleBuyTicketClick = (movie: Movie): void =>
    !user ? redirectToLogin() : (onBuyTicket(movie), redirectToTicketCreate());

  const adminButtons: JSX.Element | null =
    user && isAdmin(user) ? (
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
    ) : null;

  return (
    <>
      {selectedMovie && (
        <>
          {adminButtons}
          <MovieDetails movie={selectedMovie} onBuyTicket={handleBuyTicketClick} />
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
  onBuyTicket: (movie: Movie) => dispatch(ticketInit(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsContainer);

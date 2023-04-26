import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from 'store/store';
import { createMovie } from '../state/movieActions';
import MovieCreateForm from '../components/MovieCreateForm/MovieCreateForm';
import { MovieCreateDto } from '../types/MovieCreateDto';
import { useMovieRedirect } from '../helpers/movieRedirects';

interface Props {
  onCreateMovie: (movieCreateDto: MovieCreateDto) => void;
}

const MovieCreateContainer: React.FC<Props> = ({ onCreateMovie }) => {
  const { redirectToMovieList } = useMovieRedirect();

  const handleMovieCreate = (movieCreateDto: MovieCreateDto) => {
    onCreateMovie(movieCreateDto);
    redirectToMovieList();
  };

  return (
    <>
      <MovieCreateForm create={handleMovieCreate} />
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCreateMovie: (movieCreateDto: MovieCreateDto) => dispatch(createMovie(movieCreateDto)),
});

export default connect(null, mapDispatchToProps)(MovieCreateContainer);

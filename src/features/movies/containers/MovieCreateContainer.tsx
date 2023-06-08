import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch } from 'store/store';
import { createMovie } from '../state/movieActions';

import { MovieCreateDto } from '../types/MovieCreateDto';
import { useMovieRedirect } from '../hooks/movieRedirects';

import MovieCreateForm from '../components/MovieCreateForm/MovieCreateForm';

interface Props {
  onCreateMovie: (movieCreateDto: MovieCreateDto) => void;
}

const MovieCreateContainer: React.FC<Props> = ({ onCreateMovie }) => {
  const { redirectToMovieList } = useMovieRedirect();

  const handleMovieCreate = (movieCreateDto: MovieCreateDto): void => {
    onCreateMovie(movieCreateDto);
    redirectToMovieList();
  };

  return (
    <>
      <div className='page-header'>Create Movie</div>
      <MovieCreateForm countries={[]} create={handleMovieCreate} />
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCreateMovie: (movieCreateDto: MovieCreateDto) => dispatch(createMovie(movieCreateDto)),
});

export default connect(null, mapDispatchToProps)(MovieCreateContainer);

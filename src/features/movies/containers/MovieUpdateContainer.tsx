import React from 'react';
import MovieUpdateForm from '../components/MovieUpdateForm/MovieUpdateForm';
import { MovieUpdateDto } from '../types/MovieUpdateDto';
import { Movie } from '../types/Movie';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';

interface Props {
  movie: Movie;
  // update:(id: string, movieUpdateDto: MovieUpdateDto) => void;
}

const MovieUpdateContainer: React.FC<Props> = ({ movie }) => {
  return <MovieUpdateForm movie={movie} update={() => {}} />;
};

const mapStateToProps = (state: StoreState) => ({
  movie: state.movies.selectedMovie!,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MovieUpdateContainer);

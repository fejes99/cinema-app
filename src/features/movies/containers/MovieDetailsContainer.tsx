import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Movie } from '../types/Movie';
import { AppDispatch, StoreState } from 'store/store';
import { fetchMovie } from '../state/movieActions';

interface Props {
  selectedMovie: Movie | null;
  loading: boolean;
  error: Error | null | boolean;
  onFetchMovie: (id: string) => void;
}

const MovieDetailsContainer: React.FC<Props> = ({
  selectedMovie,
  loading,
  error,
  onFetchMovie,
}) => {
  useEffect(() => {
    onFetchMovie('2637debe-222e-43c7-a0f3-65be9f459525');
  }, [onFetchMovie]);

  return <div>MovieDetailsContainer</div>;
};

const mapStateToProps = (state: StoreState) => ({
  selectedMovie: state.movies.selectedMovie,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovie: (id: string) => dispatch(fetchMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsContainer);

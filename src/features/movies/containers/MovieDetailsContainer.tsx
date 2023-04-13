import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Movie } from '../types/Movie';
import { AppDispatch, StoreState } from 'store/store';
import { fetchMovie } from '../state/movieActions';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import Loader from 'common/components/UI/Loader/Loader';
import { useParams } from 'react-router';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { extractYoutubeVideoId } from '../helpers/movieGetVideoIdFromTrailer';

interface Props {
  selectedMovie: Movie | null;
  loading: boolean;
  error: Error;
  onFetchMovie: (id: string) => void;
}

const MovieDetailsContainer: React.FC<Props> = ({
  selectedMovie,
  loading,
  error,
  onFetchMovie,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) onFetchMovie(id);
  }, [id, onFetchMovie]);

  if (loading) return <Loader />;
  if (selectedMovie === null) return <div>No movie</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <YoutubeEmbed videoId={extractYoutubeVideoId(selectedMovie.trailerUrl!)} />
      <MovieDetails movie={selectedMovie} />
    </>
  );
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

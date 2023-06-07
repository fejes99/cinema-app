import React from 'react';
import { Routes, Route } from 'react-router';

import MovieListContainer from '../containers/MovieListContainer';
import MovieCreateContainer from '../containers/MovieCreateContainer';
import MovieUpdateContainer from '../containers/MovieUpdateContainer';
import MovieDetailsContainer from '../containers/MovieDetailsContainer';
import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute';
import { User } from 'features/auth/types/User';

interface Props {
  user: User | null;
}

const MoviePage: React.FC<Props> = ({ user }) => (
  <Routes>
    <Route path='/' element={<MovieListContainer />} />
    <Route path=':id' element={<MovieDetailsContainer />} />
    <Route
      path=':id/edit'
      element={
        <PrivateRoute isAuthenticated={Boolean(user)}>
          <MovieUpdateContainer />
        </PrivateRoute>
      }
    />
    <Route
      path='/new'
      element={
        <PrivateRoute isAuthenticated={Boolean(user)}>
          <MovieCreateContainer />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default MoviePage;

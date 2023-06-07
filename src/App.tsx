import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router';
import './App.scss';
import Header from 'common/components/UI/Header/Header';
import MoviePage from 'features/movies/pages/MoviePage';
import LoginPage from 'features/auth/pages/LoginPage';
import ProfilePage from 'features/auth/pages/ProfilePage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import ProjectionPage from 'features/projections/pages/ProjectionPage';
import UserPage from 'features/auth/pages/UserPage';
import TicketPage from 'features/tickets/pages/TicketPage';
import { AppDispatch, StoreState } from 'store/store';
import { authCheck } from 'features/auth/state/authActions';
import { User } from 'features/auth/types/User';
import { isAdmin } from 'features/auth/helpers/isAdmin';
import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  token: string | null;
  user: User | null;
  onTryAutoLogin: () => void;
}

const App: React.FC<Props> = ({ token, user, onTryAutoLogin }) => {
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    onTryAutoLogin();
  }, [token, onTryAutoLogin]);

  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path='/movies/*' element={<MoviePage user={user} />} />
          <Route path='/projections/*' element={<ProjectionPage user={user} />} />
          <Route
            path='/tickets/*'
            element={
              <PrivateRoute isAuthenticated={Boolean(user)}>
                <TicketPage />
              </PrivateRoute>
            }
          />
          {user && isAdmin(user) ? (
            <Route
              path='/users/*'
              element={
                <PrivateRoute isAuthenticated={Boolean(user)}>
                  <UserPage />
                </PrivateRoute>
              }
            />
          ) : null}
          <Route
            path='/profile'
            element={
              <PrivateRoute isAuthenticated={Boolean(user)}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<Navigate to={'/projections'} replace />} />
          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onTryAutoLogin: () => dispatch(authCheck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

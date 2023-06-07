import React from 'react';
import { Navigate } from 'react-router';

interface Props {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default PrivateRoute;

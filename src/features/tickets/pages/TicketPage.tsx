import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import { User } from 'features/auth/types/User';

import TicketCreateContainer from '../containers/TicketCreateContainer';
import TicketDetailsContainer from '../containers/TicketDetailsContainer';

interface Props {
  user: User | null;
}

const TicketPage: React.FC<Props> = ({ user }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) navigate('/login');
  // }, []);

  return (
    <Routes>
      <Route path=':id' element={<TicketDetailsContainer />} />
      <Route path='/new' element={<TicketCreateContainer />} />
    </Routes>
  );
};

export default TicketPage;

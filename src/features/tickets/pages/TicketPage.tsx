import React from 'react';
import { Route, Routes } from 'react-router';

import TicketCreateContainer from '../containers/TicketCreateContainer';
import TicketDetailsContainer from '../containers/TicketDetailsContainer';

const TicketPage: React.FC = () => (
  <Routes>
    <Route path=':id' element={<TicketDetailsContainer />} />
    <Route path='/new' element={<TicketCreateContainer />} />
  </Routes>
);

export default TicketPage;

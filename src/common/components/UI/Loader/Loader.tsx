import React from 'react';
import { BeatLoader } from 'react-spinners';
import './Loader.scss';

const Loader: React.FC = () => {
  return (
    <div className='loader'>
      <BeatLoader color='#353a40' />
    </div>
  );
};

export default Loader;
